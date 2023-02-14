import { StyleSheet, Text, View, FileList, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from '@react-navigation/native';
import Card from './Components/Card';
import { useDispatch } from 'react-redux';
import CategoryesCards from './Components/CategoryesCards';
import CategoryHeader from './Components/CategoryHeader';



const ProductCollection = collection(db, 'Adidas');


const Products = ({ navigation, User }) => {

    const [Data, SetData] = useState([]);
    const [Shoes, SetShoes] = useState([]);
    const [Clothing, SetClothing] = useState([]);

    const [Accessories, SetAccessories] = useState([]);

    // const [Data, SetData] = useState([{
    //     "id": '4',
    //     "url": "https://www.adidas.com/us/five-ten-kestrel-lace-mountain-bike-shoes/BC0770.html",
    //     "name": "Five Ten Kestrel Lace Mountain Bike Shoes",
    //     "sku": "BC0770",
    //     "selling_price": 150,
    //     "original_price": "",
    //     "currency": "USD",
    //     "availability": "InStock",
    //     "color": "Grey",
    //     "category": "Shoes",
    //     "source": "adidas United States",
    //     "source_website": "https://www.adidas.com",
    //     "breadcrumbs": "Women/Shoes",
    //     "description": "Lace up and get after it. The Five Ten Kestrel Lace Mountain Bike Shoes offer efficient pedal power with low-profile style. The wide platform is compatible with all clipless pedals and offers high-friction grip on and off the bike. You'll find the find comfort and versatility for extended trail rides and afterwork hot laps alike.",
    //     "brand": "adidas",
    //     "images": "https://assets.adidas.com/images/w_600,f_auto,q_auto/2b04943c525e4909a7a5a9fa0116153d_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_01_standard.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/64ef0f437ce249fe980da9fa01164284_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_02_standard_hover.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/12746d2167c348b2a583a9fa01169669_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_03_standard.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/91b253099ece4b6c8b5fa9fa0116a5a1_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_04_standard.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/a2b39ff910204553af50a9fa0116b3a0_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_05_standard.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/9294030e3be54f83854aa9fa01162719_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_06_standard.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/f2cc280368794b2c9a9ca9fa0116c094_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_41_detail.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/39426096737d4102b7ada9fa0116cceb_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_42_detail.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/9f384bc43cf84ce9845ca9fa0116d8b3_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_43_detail.jpg",
    //     "country": "USA",
    //     "language": "en",
    //     "average_rating": 4.8,
    //     "reviews_count": 4,
    //     "crawled_at": "2021-10-23 17:50:17.423830"
    // }, {
    //     "id": '3',
    //     "url": "https://www.adidas.com/us/five-ten-kestrel-lace-mountain-bike-shoes/BC0770.html",
    //     "name": "Five Ten Kestrel Lace Mountain Bike Shoes",
    //     "sku": "BC0770",
    //     "selling_price": 150,
    //     "original_price": "",
    //     "currency": "USD",
    //     "availability": "InStock",
    //     "color": "Grey",
    //     "category": "Shoes",
    //     "source": "adidas United States",
    //     "source_website": "https://www.adidas.com",
    //     "breadcrumbs": "Women/Shoes",
    //     "description": "Lace up and get after it. The Five Ten Kestrel Lace Mountain Bike Shoes offer efficient pedal power with low-profile style. The wide platform is compatible with all clipless pedals and offers high-friction grip on and off the bike. You'll find the find comfort and versatility for extended trail rides and afterwork hot laps alike.",
    //     "brand": "adidas",
    //     "images": "https://assets.adidas.com/images/w_600,f_auto,q_auto/2b04943c525e4909a7a5a9fa0116153d_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_01_standard.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/64ef0f437ce249fe980da9fa01164284_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_02_standard_hover.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/12746d2167c348b2a583a9fa01169669_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_03_standard.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/91b253099ece4b6c8b5fa9fa0116a5a1_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_04_standard.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/a2b39ff910204553af50a9fa0116b3a0_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_05_standard.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/9294030e3be54f83854aa9fa01162719_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_06_standard.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/f2cc280368794b2c9a9ca9fa0116c094_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_41_detail.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/39426096737d4102b7ada9fa0116cceb_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_42_detail.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/9f384bc43cf84ce9845ca9fa0116d8b3_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_43_detail.jpg",
    //     "country": "USA",
    //     "language": "en",
    //     "average_rating": 4.8,
    //     "reviews_count": 4,
    //     "crawled_at": "2021-10-23 17:50:17.423830"
    // }, {
    //     "id": '2',
    //     "url": "https://www.adidas.com/us/five-ten-kestrel-lace-mountain-bike-shoes/BC0770.html",
    //     "name": "Five Ten Kestrel Lace Mountain Bike Shoes",
    //     "sku": "BC0770",
    //     "selling_price": 150,
    //     "original_price": "",
    //     "currency": "USD",
    //     "availability": "InStock",
    //     "color": "Grey",
    //     "category": "Shoes",
    //     "source": "adidas United States",
    //     "source_website": "https://www.adidas.com",
    //     "breadcrumbs": "Women/Shoes",
    //     "description": "Lace up and get after it. The Five Ten Kestrel Lace Mountain Bike Shoes offer efficient pedal power with low-profile style. The wide platform is compatible with all clipless pedals and offers high-friction grip on and off the bike. You'll find the find comfort and versatility for extended trail rides and afterwork hot laps alike.",
    //     "brand": "adidas",
    //     "images": "https://assets.adidas.com/images/w_600,f_auto,q_auto/2b04943c525e4909a7a5a9fa0116153d_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_01_standard.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/64ef0f437ce249fe980da9fa01164284_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_02_standard_hover.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/12746d2167c348b2a583a9fa01169669_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_03_standard.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/91b253099ece4b6c8b5fa9fa0116a5a1_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_04_standard.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/a2b39ff910204553af50a9fa0116b3a0_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_05_standard.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/9294030e3be54f83854aa9fa01162719_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_06_standard.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/f2cc280368794b2c9a9ca9fa0116c094_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_41_detail.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/39426096737d4102b7ada9fa0116cceb_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_42_detail.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/9f384bc43cf84ce9845ca9fa0116d8b3_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_43_detail.jpg",
    //     "country": "USA",
    //     "language": "en",
    //     "average_rating": 4.8,
    //     "reviews_count": 4,
    //     "crawled_at": "2021-10-23 17:50:17.423830"
    // }, {
    //     "id": '1',
    //     "url": "https://www.adidas.com/us/five-ten-kestrel-lace-mountain-bike-shoes/BC0770.html",
    //     "name": "Five Ten Kestrel Lace Mountain Bike Shoes",
    //     "sku": "BC0770",
    //     "selling_price": 150,
    //     "original_price": "",
    //     "currency": "USD",
    //     "availability": "InStock",
    //     "color": "Grey",
    //     "category": "Shoes",
    //     "source": "adidas United States",
    //     "source_website": "https://www.adidas.com",
    //     "breadcrumbs": "Women/Shoes",
    //     "description": "Lace up and get after it. The Five Ten Kestrel Lace Mountain Bike Shoes offer efficient pedal power with low-profile style. The wide platform is compatible with all clipless pedals and offers high-friction grip on and off the bike. You'll find the find comfort and versatility for extended trail rides and afterwork hot laps alike.",
    //     "brand": "adidas",
    //     "images": "https://assets.adidas.com/images/w_600,f_auto,q_auto/2b04943c525e4909a7a5a9fa0116153d_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_01_standard.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/64ef0f437ce249fe980da9fa01164284_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_02_standard_hover.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/12746d2167c348b2a583a9fa01169669_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_03_standard.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/91b253099ece4b6c8b5fa9fa0116a5a1_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_04_standard.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/a2b39ff910204553af50a9fa0116b3a0_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_05_standard.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/9294030e3be54f83854aa9fa01162719_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_06_standard.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/f2cc280368794b2c9a9ca9fa0116c094_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_41_detail.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/39426096737d4102b7ada9fa0116cceb_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_42_detail.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/9f384bc43cf84ce9845ca9fa0116d8b3_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_43_detail.jpg",
    //     "country": "USA",
    //     "language": "en",
    //     "average_rating": 4.8,
    //     "reviews_count": 4,
    //     "crawled_at": "2021-10-23 17:50:17.423830"
    // }, {
    //     "id": '5',
    //     "url": "https://www.adidas.com/us/five-ten-kestrel-lace-mountain-bike-shoes/BC0770.html",
    //     "name": "Five Ten Kestrel Lace Mountain Bike Shoes",
    //     "sku": "BC0770",
    //     "selling_price": 150,
    //     "original_price": "",
    //     "currency": "USD",
    //     "availability": "InStock",
    //     "color": "Grey",
    //     "category": "Accessories",
    //     "source": "adidas United States",
    //     "source_website": "https://www.adidas.com",
    //     "breadcrumbs": "Women/Shoes",
    //     "description": "Lace up and get after it. The Five Ten Kestrel Lace Mountain Bike Shoes offer efficient pedal power with low-profile style. The wide platform is compatible with all clipless pedals and offers high-friction grip on and off the bike. You'll find the find comfort and versatility for extended trail rides and afterwork hot laps alike.",
    //     "brand": "adidas",
    //     "images": "https://assets.adidas.com/images/w_600,f_auto,q_auto/2b04943c525e4909a7a5a9fa0116153d_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_01_standard.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/64ef0f437ce249fe980da9fa01164284_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_02_standard_hover.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/12746d2167c348b2a583a9fa01169669_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_03_standard.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/91b253099ece4b6c8b5fa9fa0116a5a1_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_04_standard.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/a2b39ff910204553af50a9fa0116b3a0_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_05_standard.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/9294030e3be54f83854aa9fa01162719_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_06_standard.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/f2cc280368794b2c9a9ca9fa0116c094_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_41_detail.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/39426096737d4102b7ada9fa0116cceb_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_42_detail.jpg~https://assets.adidas.com/images/w_600,f_auto,q_auto/9f384bc43cf84ce9845ca9fa0116d8b3_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_43_detail.jpg",
    //     "country": "USA",
    //     "language": "en",
    //     "average_rating": 4.8,
    //     "reviews_count": 4,
    //     "crawled_at": "2021-10-23 17:50:17.423830"
    // }
    // ]);


    //['Shoes', 'Clothing', 'Accessories']
    useEffect(() => {
        const GetProducts = async () => {
            const q = await query(ProductCollection, limit(20))
            const shoes = await query(ProductCollection, where('category', '==', 'Shoes'), limit(3))
            const shoesData = await getDocs(shoes)
            const clothing = await query(ProductCollection, where('category', '==', 'Clothing'), limit(3))
            const clothingData = await getDocs(clothing)
            const accessories = await query(ProductCollection, where('category', '==', 'Accessories'), limit(3))
            const accessoriesData = await getDocs(accessories)

            SetShoes(shoesData.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            SetClothing(clothingData.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            SetAccessories(accessoriesData.docs.map((doc) => ({ ...doc.data(), id: doc.id })))


            const data = await getDocs(q)
            SetData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        GetProducts();
    }, [])

    console.log('Shoes', Shoes)

    return (




        <ScrollView    >
            <View style={styles.container}>
                <CategoryHeader header='Clothing' discount='10' />
                {

                    Clothing.map((product, key) => {
                        return <CategoryesCards User={User} navigation={navigation} search='Clothing' key={key} product={product} />
                    })
                }
                <CategoryHeader header='Shoes' discount='30' />
                {
                    Shoes.map((product, key) => {
                        return <CategoryesCards User={User} navigation={navigation} search='Shoes'  key={key} product={product} />
                    })
                }
                <CategoryHeader header='Accessories' discount='27' />
                {
                    Accessories.map((product, key) => {
                        return <CategoryesCards User={User} navigation={navigation} search='Accessories' key={key} product={product} />
                    })
                }

                {
                    Data.map((product) => {

                        return (

                            <Card User={User} navigation={navigation} key={product.id} product={product} />

                        )

                    })
                }
            </View>
        </ScrollView>


    )
}

export default Products

const styles = StyleSheet.create({
    container: {

        height: '100%',
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 2,

    },
    cards: {
        backgroundColor: 'orange',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 15,
    },
    box: {

    }
})