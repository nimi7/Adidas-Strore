import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { auth } from '../../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { TextInput } from 'react-native-paper';
import { Button, ButtonGroup, withTheme } from '@rneui/themed';



export default function Login({ navigation }) {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const Login = async () => {                                                  
        try {
            const user = await signInWithEmailAndPassword(auth, email, password).then(() => navigation.push('home'))
            console.log('Login Secsses', user)

        } catch (err) {
            console.log('err', err)
            console.log(err.message)
        }
    }

    return (
        <View style={styles.container} >
            <Text style={styles.Login}>Login</Text>
            <TextInput
                style={{ width: 300, textAlign: 'left' }}
                activeOutlineColor='#ff4747'
                textColor='gray'
                mode="outlined"
                label="Email"
                placeholder="Email"
                value={email}
                left={<TextInput.Icon icon="email" />}
                onChangeText={(text) => setemail(text)}
            />

            <TextInput
                style={{ width: 300, textAlign: 'left' }}

                activeOutlineColor='#ff4747'
                textColor='gray'
                mode="outlined"
                label="Password"
                placeholder="Password"
                secureTextEntry
                value={password}
                left={<TextInput.Icon icon="eye" />}
                onChangeText={(text) => setpassword(text)}
            />
            <Button
                title="Log In"
                icon={{
                    name: 'user',
                    type: 'font-awesome',
                    size: 15,
                    color: 'white',
                }}
                onPress={Login}
                iconLeft
                iconContainerStyle={{ marginLeft: 10 }}
                titleStyle={{ fontWeight: '700' }}
                buttonStyle={{
                    backgroundColor: '#ff4747',
                    borderColor: 'transparent',
                    borderWidth: 0,
                    borderRadius: 30,
                }}
                containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 10,
                }}
            />
            <Text>
                Not Have an account? <Text onPress={() => navigation.push('Register')} style={styles.Register}> Register Here</Text>
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'right',
        padding: 70,
        backgroundColor: '#fff'


    },
    Login: {
        fontSize: 24,
        textAlign: 'center',
        color: 'black'
    },
    Register: {
        color: '#ff4747'
    }


})