import React, { useState } from 'react';
import styles from './style';
import img from "../assets/mainlogo.jpg"
import { useNavigation } from '@react-navigation/native';
import { Image, Text, TextInput, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';


function Login() {
  const navigation = useNavigation()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = ()=> {
    console.log(email, password);
    const userData = {
      email: email,
      password,
    };
    axios.post('http://10.0.2.2:5001/login-user', userData)
      .then((res) =>{ console.log(res.data);
      if(res.data.status == "ok"){
        Alert.alert("logged in successful");
        navigation.navigate('Tab');
      }
    })
    .catch(error => {
      console.error("Error during login request:", error);
      Alert.alert("Login failed", "An error occurred during login. Please try again later.");
    });
  }


  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps={'always'}>
      <View style={{ backgroundColor: 'white' }}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={img} />
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.text_header}>Login!!!</Text>
          <View style={styles.action}>
            {<FontAwesome name="user-o" color="#420475" style={styles.smallIcon} />}
            <TextInput placeholder='Email' style={styles.textInput} onChangeText={(e)=>setEmail(e)} />
          </View>
          <View style={styles.action}>
            {<FontAwesome name="lock" color="#420475" style={styles.smallIcon} />}
            <TextInput placeholder='Password' style={styles.textInput} onChangeText={(e)=>setPassword(e)} />
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              marginTop: 8,
              marginRight: 10,
            }}>
            <Text style={{ color: '#420475', fontWeight: '700' }}>
              Forget Password
            </Text>
          </View>
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.inBut} onPress={handleSubmit}>
            <View>
              <Text style={styles.textSign}>Log in</Text>
            </View>
          </TouchableOpacity>
          <View style={{ padding: 15 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#919191' }}>
              ---or Continue as---
            </Text>
          </View>
          <View style={styles.bottomButton}>
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <TouchableOpacity style={styles.inBut2}>
                <FontAwesome name="user-circle-o" color="white" style={styles.smallIcon2} />
              </TouchableOpacity>
              <Text style={styles.bottomText}>Guest</Text>
            </View>
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <TouchableOpacity style={styles.inBut2} onPress={(e) => navigation.navigate('Register')}>
                <FontAwesome name="user-plus" color="white" style={[styles.smallIcon2, { fontSize: 30 }]} />
              </TouchableOpacity>
              <Text style={styles.bottomText}>Sign Up</Text>
            </View>
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <TouchableOpacity style={styles.inBut2} onPress={() => alert("Coming Soon")}>
                <FontAwesome name="google" color="white" style={[styles.smallIcon2, { fontSize: 30 }]} />
              </TouchableOpacity>
              <Text style={styles.bottomText}>Google</Text>
            </View>
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <TouchableOpacity style={styles.inBut2} onPress={() => alert("Coming Soon")}>
                <FontAwesome name="facebook-f" color="white" style={[styles.smallIcon2, { fontSize: 30 }]} />
              </TouchableOpacity>
              <Text style={styles.bottomText}>Facebook</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};


export default Login;
