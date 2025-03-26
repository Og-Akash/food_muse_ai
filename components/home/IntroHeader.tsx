import { View, Text, Image } from "react-native";
import React, { useContext } from "react";
import { userContext } from "@/context/UserContext";
import Colors from "@/services/Colors";
import { useClerk, useUser } from "@clerk/clerk-expo";

export default function IntroHeader() {
  const { user } = useUser();
  const { user: stateUser } = useContext(userContext);
  const { signOut } = useClerk();
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

        <Text style={{
          marginLeft:10,
          fontFamily: "outfitBold",
          fontSize: 20,
          color: Colors.gray, 
        }}>{user?.fullName}</Text>
      </View>

      <View
        style={{
          marginHorizontal: 10,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          backgroundColor: Colors.lightGray,
          padding: 10,
          borderRadius: 15,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "outfitBold",
            color: Colors.gray,
          }}
        >
          {stateUser?.credit}
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
  );
}
