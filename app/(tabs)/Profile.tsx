import { View, Text, StyleSheet, Image } from "react-native";
import React, { useContext } from "react";
import Colors from "@/services/Colors";
import { userContext } from "@/context/UserContext";

export default function Profile() {
  const { user } = useContext(userContext);
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: user?.profileImage,
        }}
        style={styles.profileImage}
      />
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <Text style={styles.headerText}>{user?.email}</Text>
        <Text style={styles.subText}>{user?.username}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.white,
    height: "100%",
    display: "flex",
    alignItems: "center",
  },

  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 99,
  },

  headerText: {
    fontFamily: "outfitBold",
    fontSize: 18,
    color: Colors.gold,
  },
  subText: {
    fontFamily: "outfitBold",
    fontSize: 14,
    color: Colors.gray,
  },
});
