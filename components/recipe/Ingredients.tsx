import { View, Text, FlatList } from "react-native";
import React from "react";
import Colors from "@/services/Colors";

export default function Ingredients({ ingredients }: any) {
  return (
    <View
      style={{
        marginTop: 15,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18, fontFamily: "OutfitBold", marginTop: 15 }}>
          Ingredients
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "outfit",
          }}
        >
          {ingredients.length} items
        </Text>
      </View>

      <FlatList
      showsVerticalScrollIndicator={false}
        data={ingredients}
        renderItem={({ item, index }) => (
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  backgroundColor: Colors.primaryForegrund,
                  borderRadius: 99,
                  padding: 3,
                }}
              >
                {item?.icon}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "outfitBold",
                }}
              >
                {item?.ingredient.split(" ").shift()}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "outfit",
                color:Colors.gray
              }}
            >
              {item?.quantity}
            </Text>
          </View>
        )}
      ></FlatList>
    </View>
  );
}
