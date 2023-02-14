import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from './Components/Slider/Slider';
import { AirbnbRating, Icon } from '@rneui/themed';
import { Divider } from 'react-native-paper';
import { db } from '../firebase';
import { doc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

const SingleProduct = ({ route, product, User }) => {

    const [Images, SetImages] = React.useState((route.params.product.images).split('~'))

    const { id, average_rating, name, sku, selling_price, currency, availability, color,
        category, source, breadcrumbs, description, brand, images, country, language, reviews_count,
        crawled_at } = route.params.product;
        
    const [like, Setlike] = React.useState(route.params.User.favorites.includes(id))
    const AddToFevorite = async () => {
        console.log('liked clicked')
        try {
            console.log('route.params.User.uid', route.params.User.uid)
            const DocRef = await doc(db, 'Users', route.params.User.id);
            switch (like) {
                case true:
                    Setlike(like => !like)
                    return await updateDoc(DocRef, {
                        favorites: arrayRemove(id)
                    })
                case false:
                    Setlike(like => !like)
                    return await updateDoc(DocRef, {
                        favorites: arrayUnion(id)
                    })

            }

        } catch (err) {
            console.log(err)
        }


    }
    console.log('User.ui', route.params.User.favorites.includes(id))
    return (
        <View style={styles.container} >

            <Slider Images={Images} />
            <Text style={styles.Name} >{name}</Text>
            <Text style={styles.selling_price} >{selling_price}$</Text>
            <Text style={styles.description} >{description}</Text>
            <Text style={styles.source} >{country}</Text>
            <TouchableOpacity
                onPress={AddToFevorite}
                style={styles.favorite} >
                <Icon
                    style={{
                        width: 25,
                        height: 30
                    }}
                    name='heart'
                    type='font-awesome'
                    color={like ? '#f50' : '#000000'}
                />
            </TouchableOpacity >
            <View style={styles.review}>
                <Text> | {brand} | {availability}</Text>
                <AirbnbRating

                    starContainerStyle={8}
                    size={12}
                    reviewSize={0}
                    count={average_rating} />
                <Text>Review:</Text>
            </View>

            <Divider />
        </View >


    )
}

export default SingleProduct

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10
    },
    Name: {
        fontFamily: 'Cochin',
        fontSize: 12,
        fontWeight: "bold",
        color: 'Grey'
    },
    selling_price: {

        fontSize: 15,
        fontWeight: "bold",
        color: '#7F8481'
    },
    description: {
        fontFamily: 'Roboto'
    },
    source: {
        textAlign: 'left',
        fontWeight: "bold",
    },
    favorite: {
        position: 'absolute',
        top: 320,
        left: 15
    },
    review: {
        height: 25,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        fontFamily: 'Cochin',
        marginBottom: 10
    }

})