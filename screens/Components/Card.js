import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-paper'
import React, { useState } from 'react'
import { AirbnbRating, Icon } from '@rneui/themed';


const Card = ({ product, navigation ,User }) => {

    const [like, Setlike] = useState(false)


    return (

        <View style={styles.card}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('SingleProduct', { product: product, User: User })
                }}
            >
                    
                <Image style={styles.image} source={{ uri: product.images.split('~')[0] }} />

                <Text style={styles.price}>${product.selling_price}</Text>
                <Text style={styles.brand}>{product.brand}</Text>
                <Text style={styles.country}>
                    {product.country}
                </Text>
                <Text style={styles.rating}>
                    {product.average_rating}
                    <AirbnbRating
                        starContainerStyle={5}
                        size={5}
                        reviewSize={0}
                        count={product.average_rating} />

                </Text>

            </TouchableOpacity>
        </View>

    )
}

export default Card

const styles = StyleSheet.create({
    card: {
        width: '32%',
        height: 200,
        margin: 2,
        padding: 5,
        borderColor: 'black',
        justifyContent: 'flex-end'
    },
    image: {
        height: '51%',
        width: '100%',
        borderRadius: 10
    },
    rating: {

        fontSize: 10,
        color: 'red',

    },
    price: {
        color: '#ff4747',
        fontFamily: 'sans-serif',
    },

    brand: {
        fontFamily: 'sans-serif-medium',
    },
    country: {
        fontSize: 11,
    },
    favorite: {
        position: 'absolute',
        bottom: 10,

    }
})