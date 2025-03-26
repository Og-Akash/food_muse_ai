import { View, Text, Image, Switch, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { userContext } from "@/context/UserContext";
import Colors from "@/services/Colors";
import { useClerk, useUser } from "@clerk/clerk-expo";

export default function IntroHeader() {
  const { user } = useContext(userContext);
  const { signOut } = useClerk();
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
          source={{ uri: user?.profileImage }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 99,
          }}
        />
        <View
        style={{
          marginHorizontal: 10,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          backgroundColor: Colors.lightGray,
          padding: 10,
          borderRadius: 15
        }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: "outfitBold",
              color: Colors.gray,
            }}
          >
            {user?.credit}
          </Text>
          <Image
            source={require("../../assets/images/credit.png")}
            style={{
              width: 30,
              height: 30,
            }}
          />
        </View>
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
