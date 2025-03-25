import { View, Text, Image, Switch, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { userContext } from "@/context/UserContext";
import Colors from "@/services/Colors";
import { useClerk, useUser } from "@clerk/clerk-expo";

export default function IntroHeader() {
  const {user} = useUser()
  const {signOut} = useClerk()
  const [isEnabled, setIsEnabled] = useState(false);
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: user?.imageUrl }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 99,
          }}
        />
        <Text
          style={{
            marginLeft: 10,
            fontSize: 18,
            fontFamily: "outfitBold",
            color: Colors.gray,
          }}
        >
          Hello, {user?.fullName}
        </Text>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: "outfitBold",
            color: Colors.gray,
          }}
        >
          {isEnabled ? "Non Veg" : "Veg"}
        </Text>
        <Switch
          value={isEnabled}
          onValueChange={() => setIsEnabled(!isEnabled)}
        />
      </View>
    </View>
  );
}
