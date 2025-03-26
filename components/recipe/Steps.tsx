import { View, Text, FlatList } from "react-native";
import React from "react";
import Colors from "@/services/Colors";

export default function Steps({ steps }: any) {
  return (
    <View
      style={{
        marginTop: 15,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontFamily: "OutfitBold",
          marginTop: 15,
          marginBottom: 10,
        }}
      >
        Steps
      </Text>

      <FlatList
        data={steps}
        renderItem={({ item, index }) => (
          <View
            style={{
              borderRadius: 15,
              borderColor: Colors.gray,
              borderWidth: 2,
              padding: 5,
              marginBottom: 10,
              minHeight: 50,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Outfit",
                color: Colors.gray,
                padding: 10,
                backgroundColor: Colors.lightGray,
                borderRadius: 10,
              }}
            >{`${index + 1}. `}</Text>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Outfit",
                color: Colors.gray,
                flex: 1,
              }}
            >
              {item.instruction ? item.instruction : item}
            </Text>
          </View>
        )}
      ></FlatList>
    </View>
  );
}
