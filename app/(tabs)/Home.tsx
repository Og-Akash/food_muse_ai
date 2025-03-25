import { StyleSheet, ScrollView } from "react-native";
import React from "react";
import Colors from "@/services/Colors";
import IntroHeader from "@/container/home/IntroHeader";
import RecipeGenerator from "@/container/home/RecipeGenerator";
import Category from "@/container/home/Category";

export default function Home() {
  return (
    <ScrollView style={styles.container}>
      {/* User Info */}
      <IntroHeader />
      {/* Recipe Generator Box */}
      <RecipeGenerator />
      {/* Category */}
      <Category />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: Colors.white,
    padding: 25,
  },
});
