import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/services/Colors";
import {
  getSavedRecipesByQuery,
  getUserRecipes,
  userSavedRecipe,
} from "@/services/apiService";
import LoadingDialog from "@/components/LoadingDialog";
import RecipeCard from "@/components/RecipeCard";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function CookBook() {
  const { user } = useUser();
  const [recipeList, setRecipeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isTabActive, setIsTabActive] = useState(0);
  const [savedList, setSavedList] = useState<string[] | []>([]);
  const router = useRouter();

  async function getAllRecipe() {
    try {
      setLoading(true);
      const result = await getUserRecipes(
        user?.emailAddresses?.[0].emailAddress as string
      );
      setRecipeList(result.data.data);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function getUserSavedRecipes() {
    try {
      setLoading(true);
      const result = await userSavedRecipe(
        user?.emailAddresses?.[0].emailAddress as string
      );
      console.log("saved recipes of user: ", result.data.data);
      const savedRecipes = result.data.data;
      let queryFilter = "";
      let recipeDocIdList: string[] = [];
      savedRecipes.forEach((recipe: any) => {
        recipeDocIdList.push(recipe.recipeDocId);
        queryFilter += `filters[documentId][$in]=${recipe.recipeDocId}&`;
      });
      setSavedList(recipeDocIdList);
      console.log(queryFilter);

      const queryResult = await getSavedRecipesByQuery(queryFilter);
      console.log(
        "saved recipes of user: ",
        queryResult.data.data.map((item:any) => item.documentId)
      );
      setRecipeList(queryResult.data.data);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user && isTabActive === 0) {
      getAllRecipe();
    } else if (user && isTabActive === 1) {
      getUserSavedRecipes();
    } else {
      router.push("/Home");
    }
  }, [isTabActive]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>CookBook 📖</Text>
      {loading && <LoadingDialog visible={loading} />}

      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setIsTabActive(0)}
          style={[styles.tab, { opacity: isTabActive === 0 ? 1 : 0.4 }]}
        >
          <FontAwesome5 name="hand-sparkles" size={24} color="black" />
          <Text style={styles.tabText}>My Recipes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsTabActive(1)}
          style={[styles.tab, { opacity: isTabActive === 1 ? 1 : 0.4 }]}
        >
          <FontAwesome name="bookmark" size={24} color="black" />
          <Text style={styles.tabText}>Saved Recipes</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={recipeList}
        renderItem={({ item, index }) => (
          <View key={index} style={{ flex: 1 }}>
            <RecipeCard savedList={savedList} recipe={item} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.white,
    height: "100%",
  },

  headerText: {
    marginBottom: 10,
    fontFamily: "outfitBold",
    fontSize: 30,
    color: Colors.gray,
  },
  tabContainer: {
    display: "flex",
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
  },
  tab: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
  tabText: {
    fontSize: 20,
    color: Colors.gray,
    fontFamily: "outfitBold",
  },
});
