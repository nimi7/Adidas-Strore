import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { auth } from '../../../firebase'
import { signOut } from 'firebase/auth'



const LogOut = () => {

    const LogOut = async () => {
        try {
            await signOut(auth)
        } catch (err) {
            console.log(err.message)
        }
    }
    return (
        <View>
            <Button
                onPress={LogOut}
                title='Log Out'
            />
        </View>
    )
}

export default LogOut

const styles = StyleSheet.create({})