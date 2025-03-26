import { StyleSheet, ScrollView, FlatList } from "react-native";
import React from "react";
import Colors from "@/services/Colors";
import IntroHeader from "@/components/home/IntroHeader";
import RecipeGenerator from "@/components/home/RecipeGenerator";
import Category from "@/components/home/Category";
import LatestRecipes from "@/components/home/LatestRecipes";

export default function Home() {
  return (
    <FlatList
      data={[]}
      renderItem={() => null}
      ListHeaderComponent={
        <ScrollView style={styles.container}>
          {/* User Info */}
          <IntroHeader />
          {/* Recipe Generator Box */}
          <RecipeGenerator />
          {/* Category */}
          <Category />
          {/* Latest Recipes Slider */}
          <LatestRecipes />
        </ScrollView>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: Colors.white,
    padding: 25,
  },
});
