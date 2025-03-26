import { View, Text, ActivityIndicator, Image } from "react-native";
import React, { useEffect } from "react";
import { SignIn, useUser, useAuth } from "@clerk/clerk-react";
import { useRouter } from "expo-router";
import Colors from "@/services/Colors";

export default function Login() {
  const { user } = useUser();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn && user) {
      router.replace("/(tabs)/Home"); // Ensure "Home" is in your navigator
    }
  }, [user, isSignedIn]);

  if (isSignedIn) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View
      style={{
        flex: 1,
        marginTop:50,
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/images/logo.png")}
        style={{
          width: 200,
          height: 200,
        }}
      />

      <Text
        style={{
          fontFamily: "outfitBold",
          fontSize: 25,
          color: Colors.gray,
          marginBottom: 20,
        }}
      >
        Join The Community of Food Muse
      </Text>
      <SignIn />
    </View>
  );
}
