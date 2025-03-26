import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import Colors from "@/services/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { removeFromSavedRecipe, saveRecipe } from "@/services/apiService";
import { useUser } from "@clerk/clerk-expo";
import { SavedContext } from "@/app/recipe-details";

export default function RecipeHeader({ recipeData }: any) {
  const { user } = useUser();
  const { savedList } = useContext(SavedContext);
  const [saved, setSaved] = useState(
    savedList.includes(recipeData?.documentId)
  );
  const toogleSavedRecipe = async (recipe: any) => {
    const data = {
      recipeDocId: recipe.documentId,
      email: user?.emailAddresses[0].emailAddress,
    };
    try {
      if (saved) {
        const result = await removeFromSavedRecipe(data);
        console.log("saved: ", result.data.data);
        setSaved(false);
      } else {
        const result = await saveRecipe(data);
        console.log("saved: ", result.data.data);
        setSaved(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Image
        source={
          recipeData?.imageUrl
            ? {
                uri: recipeData?.imageUrl.replace(
                  "ai-guru-lab-images/",
                  "ai-guru-lab-images%2f"
                ),
              }
            : require("../../assets/images/placeholder.jpeg")
        }
        style={{
          width: "100%",
          height: 200,
          borderRadius: 20,
          objectFit: "cover",
        }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            marginTop: 8,
            fontFamily: "outfitBold",
            color: Colors.primary,
          }}
        >
          {recipeData?.recipeName}
        </Text>
        <TouchableOpacity onPress={() => toogleSavedRecipe(recipeData)}>
          {saved ? (
            <Ionicons name="bookmark" size={24} color={Colors.primary} />
          ) : (
            <Ionicons
              name="bookmark-outline"
              size={24}
              color={Colors.primary}
            />
          )}
        </TouchableOpacity>
      </View>
      <Text style={{ fontSize: 18, fontFamily: "OutfitBold", marginTop: 15 }}>
        Description
      </Text>
      <Text style={{ fontSize: 14, fontFamily: "outfit", color: Colors.gray }}>
        {recipeData?.description}
      </Text>
    </View>
  );
}
