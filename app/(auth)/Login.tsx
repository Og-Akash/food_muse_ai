import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { SignIn, useUser, useAuth } from "@clerk/clerk-react";
import { useRouter } from "expo-router";

export default function Login() {
  const { user } = useUser();
  const { isSignedIn } = useAuth();
  const router = useRouter()

  useEffect(() => {
    if (isSignedIn && user) {
        router.replace("/(tabs)/Home"); // Ensure "Home" is in your navigator
      }
  }, [user, isSignedIn]);

  if(isSignedIn) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SignIn />
    </View>
  );
}
