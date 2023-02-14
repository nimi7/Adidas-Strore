import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { Searchbar } from 'react-native-paper';

import { Avatar } from '@rneui/themed';
const Search = ({ navigation, User }) => {

    const [search, setSearch] = useState("");
    const OnSearch = () => {
        if (!search) {
            return alert('Invalid Search')
        }
        else {
            navigation.push('SearchResult', { search: search, User: User })

        }
    }


    return (
        <KeyboardAvoidingView>
            <View style={styles.searchbar}>

                <View style={styles.input} >


                    <Avatar
                        size={32}
                        rounded
                        icon={{ name: "search", type: "font-awesome" }}
                        containerStyle={{ backgroundColor: "#ff4747", height: 22, marginLeft: 1 }}
                    />

                    <TextInput
                        style={{ width: '80%', borderColor: 'black' }}
                        keyboardAppearance='light'
                        placeholder='Serach...'
                        onChangeText={(text) => setSearch(text)}
                        onBlur={OnSearch}
                        returnKeyType='search'
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Search

const styles = StyleSheet.create({


    searchbar: {
        width: '90%',
        height: '8%',
        alignContent: 'flex-end',
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginTop: 70

    },
    input: {

        justifyContent: 'space-evenly',
        flexDirection: 'row',
        width: '80%',
        height: 35,
        borderWidth: 1,
        borderColor: '#ff4747',
        backgroundColor: '#fff',
        borderRadius: 20,
        textAlign: 'center',
        alignItems: 'center',
        marginRight: 22,
    }

})