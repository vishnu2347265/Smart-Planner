import { View, Text } from 'react-native'
import React from 'react'

export default function RegRef() {
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        console.log("Pressed")
        const userData = {
            name: name,
            email,
            mobile,
            password,
        }
        axios.post("http://0.0.0.0:5001/register", userData).then((res) => {
            console.log("working");
            console.log(res.data);
            navigation.navigate('Login');
        }).catch((e) => console.log(`error is ${e}`));
    }

    return (
        <View className='flex-1 items-center justify-start'>
            <View>
                <Image
                    style={{ width: wp('100%'), height: wp('80%') }}
                    source={require('../assets/logIn.png')} />
            </View>
            <View className='flex gap-2'>
                <TextInput placeholder='Name'
                    onChangeText={(text) => setName(text)}
                    className="border border-green-900 py-5 pr-20 pl-2 rounded-md text-left"
                    style={{ minWidth: wp('80%'), maxWidth: wp('80%') }} />
                    
                <TextInput placeholder='Email'
                    keyboardType="email-address"
                    onChangeText={(e) => setEmail(e)}
                    className="border border-green-900 py-5 pr-20 pl-2 rounded-md text-left"
                    style={{ minWidth: wp('80%'), maxWidth: wp('80%') }} />
                <TextInput placeholder='Phone'
                    keyboardType="number-pad"
                    onChangeText={(e) => setPhone(e)}
                    className="border border-green-900 py-5 pr-20 pl-2 rounded-md text-left"
                    style={{ minWidth: wp('80%'), maxWidth: wp('80%') }} />
                <TextInput placeholder='password'
                    secureTextEntry={!showPassword}
                    onChangeText={(e) => setPassword(e)}
                    className="border border-green-900 py-5 pr-20 pl-2 rounded-md text-left"
                    style={{ minWidth: wp('80%'), maxWidth: wp('80%') }} />
                <TextInput placeholder='Confirm  Password'
                    secureTextEntry={!showPassword}
                    className="border border-green-900 py-5 pr-20 pl-2 rounded-md text-left"
                    style={{ minWidth: wp('80%'), maxWidth: wp('80%') }} />
            </View>

            <View className='flex-1 absolute'
                style={{ bottom: wp('20%'), width: wp("80%") }}
            >
                <View className='flex-row px-2 py-2'>
                    <Text>Already a member?</Text>
                    <Pressable
                        onPress={() => navigation.navigate('Login')}
                    ><Text className='text-green-900 cursor-pointer'> Login</Text></Pressable>
                </View>
                <TouchableOpacity className="rounded-full py-5 px-20 bg-green-900"
                    style={{ width: wp("80%") }}
                    onPress={() =>
                        handleRegister()
                    }
                >
                    <Text className="text-white text-center font-extrabold text-lg">Register</Text>
                </TouchableOpacity>
            </View>

        </View>
  )
}

