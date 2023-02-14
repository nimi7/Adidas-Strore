import { StyleSheet, Text, View, ScrollView, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, limit, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../firebase'
import Search from './Search'
import { Divider } from '@rneui/themed';
import { ScreenStackHeaderSearchBarView } from 'react-native-screens'
import Card from './Card'
import CardResult from './CardResult'
const RefSearch = collection(db, 'Adidas')


const SearchResult = ({ route, navigation }) => {
    const { search, User } = route.params
    const [searching, Setsearching] = useState(search);
    const [result, Setresult] = useState([]);

    useEffect(() => {
        const GetSearchResult = async () => {
            try {
                const q = await query(RefSearch, where("category", '==', search), limit(10));
                const data = await getDocs(q)
                Setresult(data.docs.map((doc) => ({ ...doc.data(), id: doc.uid })))
            } catch (err) {
                console.log(err)
            }
        }
        GetSearchResult();
    }, [searching])


    const SortData = () => {
        Setresult((result) => {
            return [...result.sort((a, b) => a.selling_price - b.selling_price)]
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchbar} >
                <Search navigation={navigation} />
            </View>
            {/* <View style={styles.buttons}>
                <Button  color="#ff4747" style={{width:40}} onPress={SortData} title='sort' />
                <Button color="#ff4747" onPress={SortData} title='sort' />
            </View> */}

            <ScrollView>
                <View style={styles.CardsResult}>
                    {
                        result ? result.map((props, index) => {
                            if (index % 2 == 0) {
                                return <CardResult User={User} margin={0} product={props} navigation={navigation} />
                            } else {
                                return <CardResult User={User} margin={15} product={props} navigation={navigation} />
                            }

                        }) : <View><Text>Not Found</Text></View>
                    }
                </View>
            </ScrollView>



        </View>
    )
}

export default SearchResult

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 550,
        width: '100%',
        flexWrap: 'wrap',
        padding: 1


    },
    searchbar: {
        textAlign: 'center',
        marginTop: -35,
        justifyContent: 'flex-start',
        marginRight: 35

    },
    CardsResult: {
        padding: 7,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        height: 'auto',

    },
    buttons:{
        flexDirection:'row',
        justifyContent:'space-around'
    }
})