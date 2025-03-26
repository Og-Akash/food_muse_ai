import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/services/Colors";
import { useRouter } from "expo-router";

export default function RecipeCard({ recipe }: any) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/recipe-details",
          params: {
            recipe: JSON.stringify(recipe),
          },
        })
      }
      style={{
        margin: 5,
      }}
    >
      <Image
        source={
          recipe?.imageUrl
            ? {
                uri: recipe?.imageUrl.replace(
                  "ai-guru-lab-images/",
                  "ai-guru-lab-images%2f"
                ),
              }
            : require("../assets/images/placeholder.jpeg")
        }
        style={{
          borderRadius: 20,
          objectFit: "cover",
          width: "100%",
          height: 200,
        }}
      />
      <LinearGradient
        style={{
          position: "absolute",
          bottom: 0,
          padding: 10,
          width: "100%",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
        colors={[
          "transparent",
          "rgba(0,0,0,0.8)",
          "rgba(0,0,0,0.8)",
          "rgba(0,0,0,0.8)",
        ]}
      >
        <View>
          <Text
            style={{
              color: Colors.white,
              fontSize: 16,
              fontFamily: "outfit",
            }}
          >
            {recipe.recipeName}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
