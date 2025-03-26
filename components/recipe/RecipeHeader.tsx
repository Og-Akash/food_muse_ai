import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "@/services/Colors";

export default function RecipeHeader({ recipeData }: any) {
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
      <Text style={{ fontSize: 18, fontFamily: "OutfitBold", marginTop: 15 }}>
        Description
      </Text>
      <Text style={{ fontSize: 14, fontFamily: "outfit", color: Colors.gray }}>
        {recipeData?.description}
      </Text>
    </View>
  );
}
