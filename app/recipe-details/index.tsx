import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/services/Colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import RecipeHeader from "@/components/recipe/RecipeHeader";
import RecipeDetails from "@/components/recipe/RecipeDetails";
import Ingredients from "@/components/recipe/Ingredients";
import Steps from "@/components/recipe/Steps";
import Button from "@/components/ui/Button";

export default function index() {
  const { recipe } = useLocalSearchParams();
  const router = useRouter();

  const recipeData = JSON.parse(recipe as string);
  console.log(recipeData);

  return (
    <FlatList
      data={[]}
      renderItem={() => null}
      ListHeaderComponent={
        <View
          style={{
            padding: 10,
            backgroundColor: Colors.white,
            height: "100%",
          }}
        >
          <RecipeHeader recipeData={recipeData} />
          <RecipeDetails recipeData={recipeData} />
          <Ingredients ingredients={recipeData.ingredients} />
          <Steps steps={recipeData?.steps} />

          <View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "outfitBold",
                color: Colors.gray,
                marginBottom: 10,
              }}
            >
              Looking for Something else? Generate one 🤤
            </Text>
            <Button
              children="Generate More"
              onPress={() => router.push("/(tabs)/Home")}
            />
          </View>
        </View>
      }
    />
  );
}
