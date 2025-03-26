import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/services/Colors";

export default function RecipeCardVertical({ recipe }: any) {
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
        marginTop: 10,
        marginHorizontal:5 
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
          width: 200,
          height: 140,
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
