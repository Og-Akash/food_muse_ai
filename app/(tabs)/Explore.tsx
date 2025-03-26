import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/services/Colors";
import { getAllRecipeList } from "@/services/apiService";
import RecipeCard from "@/components/RecipeCard";
import LoadingDialog from "@/components/LoadingDialog";

export default function Explore() {
  const [recipeList, setRecipeList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllRecipe();
  }, []);

  async function getAllRecipe() {
    try {
      setLoading(true);
      const result = await getAllRecipeList();
      setRecipeList(result.data.data);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Explore All the Recipes</Text>

    {loading && <LoadingDialog visible={loading}/>}

      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={recipeList}
        renderItem={({ item, index }) => (
          <View key={index} style={{ flex: 1 }}>
            <RecipeCard recipe={item} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.white,
    height: "100%",
  },

  headerText: {
    fontFamily: "outfitBold",
    fontSize: 25,
    color: Colors.gray,
    marginBottom: 10
  },
});
