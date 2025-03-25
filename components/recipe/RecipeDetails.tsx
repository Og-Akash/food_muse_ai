import { View, Text, StyleSheet } from "react-native";
import React from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/services/Colors";

export default function RecipeDetails({ recipeData }: any) {
  return (
    <View style={styles.detailsContainer}>
      <View style={styles.detailsBox}>
        <FontAwesome5 name="leaf" size={24} color={Colors.primary} />
        <View>
          <Text style={styles.detailText}>Calories</Text>
          <Text style={{ fontSize: 16,}}>{recipeData?.calories}</Text>
        </View>
      </View>
      <View style={styles.detailsBox}>
        <Feather name="clock" size={24} color={Colors.primary} />

        <View>
          <Text style={styles.detailText}>CookTime</Text>
          <Text style={{ fontSize: 16,}}>{recipeData?.cookTime}</Text>
        </View>
      </View>
      <View style={styles.detailsBox}>
        <Ionicons name="people" size={24} color={Colors.primary} />
        <View>
          <Text style={styles.detailText}>ServeTo</Text>
          <Text style={{ fontSize: 16,}}>{recipeData?.serveTo}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  detailsBox: {
    display: "flex",
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
    backgroundColor: Colors.primaryForegrund,
    padding: 15,
    borderRadius: 15,
  },
  detailText: {
    fontSize: 18,
    color: Colors.primary,
    fontFamily: "outfitBold",
  },
});
