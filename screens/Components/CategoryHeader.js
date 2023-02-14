import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'

const CategoryHeader = ({ header, discount }) => {
    return (
        <View style={styles.header}>
            <ImageBackground
                resizeMode="cover"

                source={{ uri: 'https://t3.ftcdn.net/jpg/02/48/13/84/360_F_248138476_vRdrN0FuKMMOPViRojcK41IqCiFn4J1q.jpg' }}
                style={{ width: '110%', marginRight: 25, position: 'absolute', height: 43, resizeMode: "cover" }}>
            </ImageBackground>


            <View style={styles.head}>


                <Text style={styles.header}>{header}</Text>
                <Text style={styles.free}>free shipping < Text style={styles.discount} >{discount}% </Text>  discount </Text>
            </View>
        </View >
    )
}

export default CategoryHeader

const styles = StyleSheet.create({
    header: {
        width: "100%",
        fontSize: 14,
        fontFamily: 'Cochin',


    },
    head:{
        marginRight:14,
    },
    backgroun: {
        width: "100%",
    },
    free: {
        fontSize: 10,
        fontFamily: 'Cochin',
    },
    discount: {
        color: '#f4511e',
        fontSize: 15,
    },
    image: {

    }
})