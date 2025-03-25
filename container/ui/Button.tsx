import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Colors from "@/services/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type ButtonProps = {
  onPress?: () => void;
  children: React.ReactNode;
  iconName: any;
  isLoading: boolean;
};

export default function Button({
  children,
  onPress,
  iconName = "",
  isLoading,
}: ButtonProps) {
  return (
    <TouchableOpacity disabled={isLoading} style={styles.button} onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator color={"white"} />
      ) : (
        <MaterialCommunityIcons
          name={iconName}
          size={24}
          color={Colors.white}
        />
      )}
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  buttonText: {
    textAlign: "center",
    fontFamily: "outfitBold",
    fontSize: 18,
    color: Colors.white,
  },
});
