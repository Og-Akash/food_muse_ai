import { View, Text, Modal, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import Colors from "@/services/Colors";

export default function LoadingDialog({
  visible = false,
  text = "Loading...",
}) {
  return (
    <Modal transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.loaderBackground}>
          <ActivityIndicator size={"large"} color={Colors.white} />
          <Text style={styles.loadingText}>{text}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000070",
  },
  loadingText: {
    marginTop: 10,
    color: Colors.white,
    fontSize: 16,
    fontFamily: "outfit",
  },
  loaderBackground : {
    width:120,
    height:120,
    borderRadius: 15,
    padding:20,
    display:"flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary
  }
});
