import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Fontisto from "react-native-vector-icons/Fontisto";
import Error from "react-native-vector-icons/MaterialIcons";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { faL } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Register() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [nameVerify, setNameVerify] = useState(false);
  const [email, setEmail] = useState("");
  const [emailVerify, setEmailVerify] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState(false);

  function handleSubmit() {
    const userData = {
      name: name,
      email: email,
      password: password,
    };
    if (nameVerify && emailVerify && passwordVerify) {
      axios
        .post("http://10.4.205.62:5001/auth/register", userData)
        .then((res) => {
          console.log(res.data);
          if (res.data.status === "ok") {
            Alert.alert(
              "Welcome to SmartPlanner!",
              "Your account has been successfully created. Start planning your day with SmartPlanner!",
              [
                {
                  text: "Start Planning",
                  onPress: () => navigation.navigate("Login"),
                },
                {
                  text: "Close",
                  onPress: () => console.log("Registration alert closed"),
                  style: "cancel",
                },
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert("Registration Failed", res.data.message);
          }
        })
        .catch((error) => {
          console.error("Registration error:", error);
          Alert.alert(
            "Registration Failed",
            "An error occurred while registering. Please try again later."
          );
        });
    } else {
      Alert.alert(
        "Invalid Information",
        "Please check your information again."
      );
    }
  }

  function handleName(text) {
    setName(text);
    setNameVerify(/^[a-zA-Z\s]{3,}$/.test(text));
  }

  function handleEmail(text) {
    setEmail(text);
    setEmailVerify(/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(text));
  }

  function handlePassword(text) {
    setPassword(text);
    setPasswordVerify(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(text));
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    >
      <ImageBackground
        className="flex-1"
        source={require("../assets/loginBG-3.png")}
      >
        <View className=" h-full justify-between">
          <View className="flex flex-1 flex-col px-10 py-20 items-start gap-5">
            <Text className=" text-white text-3xl font-bold pb-10">
              Create an account to take control of your day{" "}
            </Text>
            <View className="flex flex-col gap-2 items-start w-full pr-10">
              <Text className=" text-white">Name</Text>
              <TextInput
                onChangeText={(text) => handleName(text)}
                className={`border font-semibold text-white border-white focus:border-[#DDFF94] focus:outline-none focus:ring-2 focus:ring-[#DDFF94] w-full rounded-md px-5 py-3 ${
                  name.length > 0 && !nameVerify ? "border-red-500" : ""
                }`}
              />
              {name.length > 0 && !nameVerify && (
                <Text style={{ color: "red", marginLeft: 20 }}>
                  Name should be more than 2 characters
                </Text>
              )}
            </View>
            <View className="flex flex-col gap-2 items-start w-full pr-10">
              <Text className=" text-white">Email</Text>
              <TextInput
                onChangeText={(text) => handleEmail(text)}
                className={`border font-semibold text-white border-white focus:border-[#DDFF94] focus:outline-none focus:ring-2 focus:ring-[#DDFF94] w-full rounded-md px-5 py-3 ${
                  email.length > 0 && !emailVerify ? "border-red-500" : ""
                }`}
              />
              {email.length > 0 && !emailVerify && (
                <Text style={{ color: "red", marginLeft: 20 }}>
                  Enter Proper Email Address
                </Text>
              )}
            </View>
            <View className="flex flex-col gap-2 items-start w-full pr-10">
              <Text className=" text-white">Password</Text>
              <TextInput
                onChangeText={(text) => handlePassword(text)}
                className={`border font-semibold text-white border-white focus:border-[#DDFF94] focus:outline-none focus:ring-2 focus:ring-[#DDFF94] w-full rounded-md px-5 py-3 ${
                  password.length > 0 && !passwordVerify ? "border-red-500" : ""
                }`}
                secureTextEntry
              />
              {password.length > 0 && !passwordVerify && (
                <Text style={{ color: "red", marginLeft: 20 }}>
                  Password must contain at least 6 characters, including at
                  least one uppercase letter, one lowercase letter, and one
                  number
                </Text>
              )}
            </View>
          </View>
          <View className="flex flex-col gap-2 mx-10 mb-10">
            <View className="flex-row gap-2 items-end">
              <Text className="text-white">Already a member?</Text>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate("Login")}
              >
                <Text className="text-[#DDFF94]">Log in</Text>
              </TouchableWithoutFeedback>
            </View>
            <TouchableOpacity
              onPress={handleSubmit}
              className={`bg-[#DDFF94] px-5 py-5 flex items-center justify-center rounded-full ${
                !(nameVerify && emailVerify && passwordVerify) && "opacity-50"
              }`}
              disabled={!(nameVerify && emailVerify && passwordVerify)}
            >
              <Text className="text-black">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

export default Register;
