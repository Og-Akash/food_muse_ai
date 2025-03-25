import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/services/Colors";
import { getCategoryList } from "@/services/apiService";
import { useRouter } from "expo-router";
import SceletonLoader from "../SceletonLoader";

export default function Category() {
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getAllCategory();
  }, []);

  async function getAllCategory() {
    try {
      setIsLoading(true);
      const result = await getCategoryList();
      setCategoryList(result?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View>
      <Text style={styles.heading}>Category</Text>
      {isLoading && <SceletonLoader />}
      <FlatList
        numColumns={4}
        data={categoryList}
        renderItem={({ item, index }: any) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/category",
                params: {
                  categoryName: item.name,
                },
              })
            }
            key={index}
            style={styles.categoryList}
          >
            <Image
              source={{ uri: item?.categoryImage?.url }}
              style={{
                width: 50,
                height: 50,
              }}
            />
            <Text style={styles.categoryName}>{item.name}</Text>
          </TouchableOpacity>
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
    marginTop: 20,
  },
  categoryName: {
    fontSize: 16,
    fontFamily: "outfitBold",
  },
});
