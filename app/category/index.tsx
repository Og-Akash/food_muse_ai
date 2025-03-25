import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "@/services/Colors";
import { getRecipeByCategory } from "@/services/apiService";
import RecipeCard from "@/components/RecipeCard";
import LoadingDialog from "@/components/LoadingDialog";

export default function index() {
  const { categoryName } = useLocalSearchParams();
  const [recipeList, setRecipeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getRecipeListByCategory();
  }, []);

  async function getRecipeListByCategory() {
    try {
      setIsLoading(true);
      const result = await getRecipeByCategory(categoryName as string);
      console.log(result.data.data);
      setRecipeList(result.data.data);
    } catch (error: any) {
      console.log(error?.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View
      style={{
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: Colors.white,
        height: "100%",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontFamily: "outfitBold",
          marginBottom: 10,
        }}
      >
        Browse Recipes of{" "}
        <Text
          style={{
            color: Colors.gold,
          }}
        >
          {categoryName} 🥘
        </Text>
      </Text>

      {isLoading && <LoadingDialog visible={isLoading} />}

      <FlatList
        numColumns={2}
        data={recipeList}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              flex: 1,
            }}
            key={index}
            onPress={() =>
              router.push({
                pathname: "/recipe-details",
                params: {
                  recipe: JSON.stringify(item),
                },
              })
            }
          >
            <RecipeCard recipe={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
