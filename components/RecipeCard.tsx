import { View, Text, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/services/Colors";

export default function RecipeCard({ recipe }: any) {
  return (
    <View
      style={{
        margin: 5,
      }}
    >
      <Image
        source={{ uri: recipe.imageUrl }}
        style={{
          borderRadius: 20,
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
    </View>
  );
}
