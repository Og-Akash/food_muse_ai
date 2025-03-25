import { View, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/services/Colors";

export default function SkeletonLoader() {
  const loaderItems = Array(8).fill(0); // 4 columns × 2 rows = 8 items

  return (
    <View style={styles.container}>
      {loaderItems.map((_, index) => (
        <View key={index} style={styles.skeletonItem}>
          <LinearGradient
            colors={["#f4f4f4", "#FFF", "#f4f4f4"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.skeleton}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap", // Allows wrapping into multiple rows
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  skeletonItem: {
    width: "22%", // 4 items per row with spacing
    aspectRatio: 1, // Keeps it square
    borderRadius: 8,
    marginBottom: 12,
    overflow: "hidden",
  },
  skeleton: {
    width: "100%",
    height: "100%",
  },
});
