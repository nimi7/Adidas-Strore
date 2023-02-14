import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-paper';
import { Button } from '@rneui/themed';
import { auth, db } from '../../../firebase'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import {
    createUserWithEmailAndPassword,
    signOut
} from 'firebase/auth'



const ProductCollection = collection(db, 'Users');




const Register = ({ navigation }) => {
    const [UserName, SetUserName] = useState('');
    const [email, Setemail] = useState('');
    const [password, Setpassword] = useState('');
    const [Error, SetError] = useState('');

    const Register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password).then(async (result) => {
                const ref = doc(db, 'Users', result.user.uid);
                const docRef = await setDoc(ref, { uid: result.user.uid, name: UserName, favorite: [] })
            }).then(() => navigation.push('home'));

        } catch (err) {
            console.log(err.message)
            SetError(err.message)
        }
    }
    return (
        <View style={styles.container} >
            <Text style={styles.Login}>Register</Text>
            <TextInput
                style={{ width: 300, textAlign: 'left', }}
                activeOutlineColor='#ff4747'
                textColor='gray'
                mode="outlined"
                label="User Name"
                placeholder="User Name..."
                value={UserName}
                left={<TextInput.Icon />}
                onChangeText={(text) => SetUserName(text)}
            />
            <TextInput
                style={{ width: 300, textAlign: 'left' }}
                activeOutlineColor='#ff4747'
                textColor='gray'
                mode="outlined"
                label="Email"
                placeholder="Email"
                value={email}
                left={<TextInput.Icon icon="email" />}
                onChangeText={(text) => Setemail(text)}
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
                onChangeText={(text) => Setpassword(text)}
            />
            <Button
                title="Register"
                icon={{
                    name: 'user',
                    type: 'font-awesome',
                    size: 15,
                    color: 'white',
                }}
                onPress={Register}
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
                already Have an account? <Text onPress={() => navigation.push('Login')} style={styles.Register}> Login Here</Text>
            </Text>
        </View>
    )
}

export default Register

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