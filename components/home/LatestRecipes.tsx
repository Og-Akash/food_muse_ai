import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/services/Colors";
import { getAllRecipesByLimit } from "@/services/apiService";
import RecipeCardVertical from "../RecipeCardVertical";

export default function LatestRecipes() {
  const [recipeList, setRecipeList] = useState([]);

  useEffect(() => {
    getAllRecipes();
  }, []);

  async function getAllRecipes() {
    const result = await getAllRecipesByLimit(10);
    setRecipeList(result.data.data);
  }

  return (
    <View
      style={{
        marginTop: 10,
      }}
    >
      <Text style={styles.heading}>LatestRecipes</Text>
      <FlatList
        horizontal={true}
        data={recipeList}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={{ flex: 1 }}>
            <RecipeCardVertical recipe={item} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontFamily: "outfitBold",
    color: Colors.primary,
    marginTop: 10,
  },
});
