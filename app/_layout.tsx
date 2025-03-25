import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { tokenCache } from "@/cache";
import { useState } from "react";
import { userContext } from "@/context/UserContext";
import Feather from '@expo/vector-icons/Feather';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    outfit: require("../assets/fonts/Outfit-Regular.ttf"),
    outfitBold: require("../assets/fonts/Outfit-Bold.ttf"),
  });

  const [user, setUser] = useState([]);

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <userContext.Provider value={{ user, setUser }}>
          <Stack>
            <Stack.Screen
              name="Landing"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(auth)/Login"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="category/index"
              options={{
               headerTransparent: true,
               headerTitle: ""
              }}
            />
            <Stack.Screen
              name="recipe-details/index"
              options={{
               headerTitle: "Detail",
               headerRight: () => <Feather name="share" size={24} color="black" />
              }}
            />
          </Stack>
        </userContext.Provider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
