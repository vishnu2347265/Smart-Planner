import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Graph from "../components/graph";

const ProfileScreen = () => {
  // Dummy user data for testing
  const user = {
    name: "Alwin Tomy",
    email: "alwintomy11@gmail.com",
    // avatar: require('../assets/avatar.png'), // Assuming you have an avatar image
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at libero arcu.",
  };

  return (
    // <View style={styles.container}>
    //   <Image source={user.avatar} style={styles.avatar} />
    //   <Text style={styles.name}>{user.name}</Text>
    //   <Text style={styles.email}>{user.email}</Text>
    //   <Text style={styles.bio}>{user.bio}</Text>
    // </View>
    <View className=" flex flex-col gap-5 bg-black h-full py-10 items-center justify-start">
      <View
        className=" flex flex-row  p-5 shadow bg-white rounded-lg"
        style={{ width: wp("100%") }}
      >
        <Image
          className="rounded-lg"
          source={require("../assets/loginBG.png")}
          style={{ width: hp("10%"), height: hp("10%") }}
        />
        <View>
          <Text className="font-semi text-lg px-2 ">Alwin</Text>
          <Text className="font-semi text-sm px-2 ">alwin@gmail.com</Text>
          <Text className="font-semi text-sm px-2 ">+91 8765456787</Text>
        </View>
      </View>
      <View
        className="px-20 shadow rounded-lg"
        // style={{ width: wp("90%")}}
      >
      <Graph/>
      <Graph/>
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//   },
//   avatar: {
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     marginBottom: 20,
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   email: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   bio: {
//     fontSize: 16,
//     textAlign: 'center',
//   },
// });

export default ProfileScreen;
