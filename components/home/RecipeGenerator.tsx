import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import Colors from "@/services/Colors";
import Button from "../ui/Button";
import { aiModel, generateRecipeImage } from "@/services/aiService";
import { RECIPE_PROMPTS } from "@/services/systemPrompt";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import LoadingDialog from "../LoadingDialog";
import { saveRecipeToDb, updateUser } from "@/services/apiService";
import { useUser } from "@clerk/clerk-expo";
import { userContext } from "@/context/UserContext";
import { useRouter } from "expo-router";

export default function RecipeGenerator() {
  const [userInput, setUserInput] = useState("");
  const [recipeOptions, setRecipeOptions] = useState<any>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoaderOpen, setIsLoaderOpen] = useState(false);
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const { user, setUser } = useContext(userContext);
  const router = useRouter();

  const generateRecipe = async () => {
    if (!userInput) {
      Alert.alert("Please enter details properly!");
      return;
    }
    try {
      setIsGenerating(true);
      const res = await aiModel(
        userInput + RECIPE_PROMPTS.GENERATE_RECIPE_OPTION_PROMPT
      );
      console.log(res.choices[0].message.content);
      const content = res.choices[0].message;
      if (content) {
        setRecipeOptions(JSON.parse(res?.choices[0]?.message?.content as any));
        actionSheetRef?.current?.show();
        setUserInput("");
      }
    } catch (error) {
      console.log("failed to generate", error);
    } finally {
      setUserInput("");
      setIsGenerating(false);
    }
  };

  const generateCompleRecipe = async (recipeOption: any) => {
    actionSheetRef?.current?.hide();
    try {
      setIsLoaderOpen(true);
      const prompt = `RecipeName: ${recipeOption.recipe_name} Description: ${recipeOption.description} ${RECIPE_PROMPTS.GENERNATE_COMPLE_RECIPE_PROMPT}`;
      const res = await aiModel(prompt);
      const content = JSON.parse(res?.choices[0]?.message?.content?.[0] as any);
      if (content) {
        const email = user?.email;
        const updatedUser = {
          credit: user?.credit - 1,
          email: user?.email,
          preference: null,
          profileImage: user?.profileImage,
          username: user?.username,
        };

        await saveRecipeToDb(content, email);
        const updatedUserData = await updateUser(user?.documentId, updatedUser);
        console.log("updatedUserData: ", updatedUserData);
        setUser(updatedUserData);
        router.push({
          pathname: "/recipe-details",
          params: {
            recipe: JSON.stringify(content)
          },
        });
        // await generateImage(content?.imagePrompt)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoaderOpen(false);
    }
  };

  async function generateImage(prompt: string) {
    const result = await generateRecipeImage(prompt);
    console.log(result.data.image);

    return result.data.image;
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/pan.gif")}
        style={styles.gif}
      />
      <Text style={styles.title}>
        Get Ready to Generate, Best Quality Meals!
      </Text>
      <Text style={styles.subTitle}>Cook Anything You Like, 🤤</Text>
      <TextInput
        multiline
        numberOfLines={5}
        style={styles.textInput}
        placeholder="what you like cook today!"
        onChangeText={(value) => setUserInput(value)}
      />
      <View style={{ marginTop: 20, width: "100%" }}>
        <Button
          onPress={() => generateRecipe()}
          isLoading={isGenerating}
          iconName="cookie-clock"
        >
          Generate Recipe
        </Button>
      </View>

      <LoadingDialog visible={isLoaderOpen} text="Generating..." />

      {/* Showing the Action sheet  */}
      <ActionSheet ref={actionSheetRef}>
        <View style={styles.actionSheetContainer}>
          <Text style={styles.title}>Select A Recipe</Text>
          {recipeOptions.length > 0 &&
            recipeOptions?.map((item: any, idx: any): any => {
              return (
                <TouchableOpacity
                  key={idx}
                  style={styles.recipeOptionContaner}
                  onPress={() => generateCompleRecipe(item)}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: "outfitBold",
                      color: Colors.gold,
                    }}
                  >
                    {item.recipe_name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "outfit",
                      color: Colors.gray,
                    }}
                  >
                    {item.description}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </ActionSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 15,
    backgroundColor: Colors.primaryForegrund,
    borderRadius: 30,
    display: "flex",
    alignItems: "center",
  },
  gif: {
    width: 80,
    height: 80,
  },
  title: {
    fontFamily: "outfitBold",
    fontSize: 23,
    color: Colors.primary,
    textAlign: "center",
  },
  subTitle: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: "outfit",
    textAlign: "center",
    color: Colors.gray,
  },
  textInput: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    width: "100%",
    height: 120,
    textAlignVertical: "top",
    fontSize: 16,
  },
  actionSheetContainer: {
    padding: 20,
  },
  recipeOptionContaner: {
    padding: 20,
    borderWidth: 0.2,
    borderRadius: 15,
    marginTop: 10,
  },
});
