import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getDoc } from 'firebase/firestore'

const FavoritsItems = ({ User, route, navigation }) => {
    console.log('user', route.params.User)
    return (
        <View>
            <Text>FavoritsItemsss</Text>
        </View>
    )
}

export default FavoritsItems

const styles = StyleSheet.create({})