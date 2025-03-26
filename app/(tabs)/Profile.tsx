import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Colors from "@/services/Colors";
import { SignedOut, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-react";

const options = [
  {
    icon: require("../../assets/images/i1.png"),
    name: "Create New Recipe",
    path: "/(tabs)/Home",
  },
  {
    icon: require("../../assets/images/i2.png"),
    name: "Explore Recipes",
    path: "/(tabs)/Explore",
  },
  {
    icon: require("../../assets/images/i3.png"),
    name: "Your Generated Recipes",
    path: "/(tabs)/CookBook",
  },
  {
    icon: require("../../assets/images/i5.png"),
    name: "Logout",
  },
];

export default function Profile() {
  const { user } = useUser();
  const router = useRouter();
  const { signOut } = useAuth();

  const moveToScreen = (option: any) => {
    if (option.name === "Logout") {
      // Sign out the user and navigate to the login screen
      signOut();
      router.push("/(auth)/Login");
    } else {
      router.push(option.path);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.profileBox}>
        <Image
          source={{
            uri: user?.imageUrl,
          }}
          style={styles.profileImage}
        />
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text style={styles.headerText}>{user?.fullName}</Text>
          <Text style={styles.subText}>
            {user?.emailAddresses[0].emailAddress}
          </Text>
        </View>
      </View>

      <FlatList
        data={options}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => moveToScreen(item)}
            style={{
              marginTop: 25,
              padding: 10,
              display: "flex",
              gap: 8,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image source={item.icon} style={{ width: 50, height: 50 }} />
            <Text style={{ fontSize: 20, fontFamily: "outfitBold" }}>
              {item.name}
            </Text>
          </TouchableOpacity>
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

  profileBox: {
    display: "flex",
    alignItems: "center",
  },

  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 99,
  },

  title: {
    fontFamily: "outfitBold",
    fontSize: 25,
    color: Colors.gray,
  },

  headerText: {
    fontFamily: "outfitBold",
    fontSize: 25,
  },
  subText: {
    fontFamily: "outfitBold",
    fontSize: 14,
    color: Colors.gray,
  },
});
