import { userContext } from "@/context/UserContext";
import { createNewUser, getUserByEmail } from "@/services/apiService";
import { useUser } from "@clerk/clerk-expo";
import { Redirect, useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const { setUser, user: stateUser } = useContext(userContext);

  useEffect(() => {
    async function init() {
      if (isSignedIn) {
        const currentUserEmail = user.emailAddresses[0].emailAddress;
        const result = await getUserByEmail(currentUserEmail);
        console.log("user by email: " + JSON.stringify(result.data.data[0]));

        if (result.data.data.length === 0) {
          //? insert new Record
          const userData = {
            username: user.fullName,
            email: currentUserEmail,
            profileImage: user.imageUrl,
          };
          const res = await createNewUser(userData);
          console.log("created new user: " + res.data.data);
          setUser(res.data.data[0]);
          router.replace("/(tabs)/Home");
        } else {
          setUser(result.data.data[0]);
          router.replace("/(tabs)/Home");
        }
      }else{
        router.replace("/Landing");
      }
    }

    init();
  }, [isSignedIn, user]);


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{JSON.stringify(stateUser?.username)}</Text>
    </View>
  );
}
