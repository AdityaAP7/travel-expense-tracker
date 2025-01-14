import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard, ToastAndroid, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from './screenWrapper'
import { colors } from '../theme'
import { useNavigation } from '@react-navigation/native'
// import Snackbar from 'react-native-snackbar';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { setUserLoading } from '../redux/slices/user';
import Loading from './loading'

export default function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const {userLoading} = useSelector(state => state.user);

    const navigation = useNavigation();

    const dispatch = useDispatch();

    const handleSubmit = async () => {
        if (email && password) {
            // Good to go
            try {
                dispatch(setUserLoading(true));
                await createUserWithEmailAndPassword(auth, email, password)
                dispatch(setUserLoading(false));
            } catch (err) {
                dispatch(setUserLoading(false));
                ToastAndroid.show(err, ToastAndroid.SHORT);
            }
            
            
        } else {
            // Error Message
            ToastAndroid.show('Email & Password are required.', ToastAndroid.SHORT);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() =>  Keyboard.dismiss()}>
        <ScrollView>
        <ScreenWrapper className="flex-1 h-full">
            <View className="flex-row justify-between items-center p-4">
                <Text className={`${colors.heading} text-xl font-bold text-center`}>Sign Up</Text>
                <TouchableOpacity className="p-2 px-3 bg-white border-gray-200 rounded-full" onPress={() => navigation.navigate('Welcome')}>
                    <Text className={colors.heading}>Back</Text>
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-center my-3 mt-1">
                {/* <ImageBackground source={require("../assets/images/signup.png")} className="h-72 w-72" /> */}
            </View>
            <View className="space-y-2 mx-4">
                <Text className={`${colors.heading} text-lg font-bold`}>Email</Text>
                <TextInput value={email} onChangeText={value => setEmail(value)}  className="p-4 bg-white rounded-full mb-3"/>
                <Text className={`${colors.heading} text-lg font-bold`}>Password</Text>
                <TextInput value={password} secureTextEntry onChangeText={value => setPassword(value)} className="p-4 bg-white rounded-full mb-3"/>
            </View>
            <View className="mx-4">
                {
                    userLoading ? (
                        <Loading/>
                    ) : (
                        <TouchableOpacity onPress={handleSubmit} style={{backgroundColor: colors.button}} className="my-6 rounded-full p-3 shadow-sm">
                            <Text className="text-center text-white text-lg font-bold">Sign Up</Text>
                        </TouchableOpacity>
                    )
                }
                
            </View>
        </ScreenWrapper>
        </ScrollView>
        </TouchableWithoutFeedback>
    )
}