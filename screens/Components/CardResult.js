import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Card, Button } from '@rneui/themed';
import { Divider } from 'react-native-paper';
const CardResult = ({ product, navigation, margin, User }) => {
    return (
        <View style={[styles.card, { marginTop: margin }]}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('SingleProduct', { product: product, User: User })
                }}
            >
                <View >
                    <Image
                        style={{
                            resizeMode: 'stretch',
                            width: '100%',
                            height: '88%'
                        }}
                        source={{ uri: product.images.split('~')[0] }}
                    />
                </View>

                <View style={styles.description}>
                    <Divider />
                    <Text style={styles.selling_price}> {product.selling_price} $ </Text>
                    <Text style={styles.brand}> {product.brand} </Text>
                    <Text style={styles.average_rating}> rating: {product.average_rating} </Text>

                </View>
            </TouchableOpacity>
        </View>
    )
}

export default CardResult

const styles = StyleSheet.create({
    card: {
        margin: 1,
        width: '49%',
        height: 350,
        borderRadius: 10
    },
    description: {
        position: 'absolute',
        bottom: 15,
        width: '100%',

    },
    selling_price: {
        color: '#f4511e',
        fontSize: 20,
        fontStyle: 'italic',
        textShadowRadius: 120,
        textShadowOffset: { width: 20, height: 20 }
    },
    brand: {
        fontSize: 10,
        fontStyle: 'italic',
        textShadowRadius: 4
    },
    average_rating: {
        fontSize: 10,
        fontStyle: 'italic',
    }

})