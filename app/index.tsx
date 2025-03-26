import { View, Text, Image, StyleSheet } from "react-native";
import { Marquee } from "@animatereactnative/marquee";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Colors from "@/services/Colors";
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { createNewUser, getUserByEmail } from "@/services/apiService";
import { userContext } from "@/context/UserContext";
import { useUser } from "@clerk/clerk-expo";
export default function Index() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const { setUser, user: stateUser } = useContext(userContext);

  useEffect(() => {
    async function init() {
      if (isSignedIn) {
        const currentUserEmail = user.emailAddresses[0].emailAddress;
        const result = await getUserByEmail(currentUserEmail);
        // console.log("user by email: " + JSON.stringify(result.data.data[0]));

        if (result.data.data.length === 0) {
          //? insert new Record
          const userData = {
            username: user.fullName,
            email: currentUserEmail,
            profileImage: user.imageUrl,
          };
          const res = await createNewUser(userData);
          // console.log("created new user: " + res.data.data);
          setUser(res.data.data[0]);
          // router.replace("/(tabs)/Home");
        } else {
          setUser(result.data.data[0]);
          // router.replace("/(tabs)/Home");
        }
      }
    }

    init();
  }, [isSignedIn, user]);

  const imageList = [
    require("../assets/images/1.jpg"),
    require("../assets/images/2.jpg"),
    require("../assets/images/c1.jpg"),
    require("../assets/images/c3.jpg"),
    require("../assets/images/6.jpg"),
    require("../assets/images/c2.jpg"),
    require("../assets/images/5.jpg"),
  ];

  return (
    <GestureHandlerRootView>
      <View>
        <Marquee
          spacing={10}
          speed={0.4}
          style={{
            transform: [
              {
                rotate: "-5deg",
              },
            ],
            marginTop: 10,
          }}
        >
          <View style={styles.imageContainer}>
            {imageList.map((image, index) => (
              <Image key={index} source={image} style={styles.image} />
            ))}
          </View>
        </Marquee>
        <Marquee
          spacing={10}
          speed={0.7}
          style={{
            transform: [
              {
                rotate: "-5deg",
              },
            ],
            marginTop: 10,
          }}
        >
          <View style={styles.imageContainer}>
            {imageList.map((image, index) => (
              <Image key={index} source={image} style={styles.image} />
            ))}
          </View>
        </Marquee>
        <Marquee
          spacing={10}
          speed={0.6}
          style={{
            transform: [
              {
                rotate: "-5deg",
              },
            ],
            marginTop: 10,
          }}
        >
          <View style={styles.imageContainer}>
            {imageList.map((image, index) => (
              <Image key={index} source={image} style={styles.image} />
            ))}
          </View>
        </Marquee>
        <Marquee
          spacing={0.5}
          speed={0.7}
          style={{
            transform: [
              {
                rotate: "-5deg",
              },
            ],
            marginTop: 10,
          }}
        >
          <View style={styles.imageContainer}>
            {imageList.map((image, index) => (
              <Image key={index} source={image} style={styles.image} />
            ))}
          </View>
        </Marquee>
      </View>
      <View
        style={{
          backgroundColor: Colors.white,
          height: "100%",
          padding: 20,
        }}
      >
        <Text style={styles.title}>
          Food Muse AI | 🍛🔎 Find, Create & Enjoy Delicious Recipes!
        </Text>
        <Text style={styles.subTitle}>
          Discover new recipes, share your creations, and connect with fellow
          cooks.
        </Text>

        <Text style={styles.title}></Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push(user ? "/Home" : "/(auth)/Login")}
        >
          <Text
            style={{
              color: Colors.white,
              fontSize: 18,
              fontFamily: "outfitBold",
              textAlign: "center",
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 160,
    height: 160,
    borderRadius: 25,
  },
  imageContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    fontFamily: "outfitBold",
  },
  subTitle: {
    fontFamily: "outfit",
    fontSize: 16,
    color: Colors.gray,
    textAlign: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
});
