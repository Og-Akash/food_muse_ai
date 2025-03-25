import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/services/Colors";
import { getCategoryList } from "@/services/apiService";

export default function Category() {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getAllCategory();
  }, []); 


  async function getAllCategory() {
    const result = await getCategoryList();
    setCategoryList(result?.data?.data);
  }

  return (
    <View>
      <Text style={styles.heading}>Category</Text>
      <FlatList
        numColumns={4}
        data={categoryList}
        renderItem={({ item, index }: any) => (
          <View key={index} style={styles.categoryList}>
            <Image
              source={{ uri: item?.categoryImage?.url }}
              style={{
                width: 50,
                height: 50,
              }}
            />
            <Text style={styles.categoryName}>{item.name}</Text>
          </View>
        )}
      ></FlatList>
    </View>
  );
}
const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontFamily: "outfitBold",
    color: Colors.primary,
    marginTop: 10,
  },
  categoryList: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  categoryName: {
    fontSize: 16,
    fontFamily: "outfitBold",
  },
});
