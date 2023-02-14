import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-paper'
import Products from './Products'
import { Link } from '@react-navigation/native'
import SpeedDialnew from './Components/SpeedDialnew'
import BootomNav from './Components/BootomNav'
import Search from './Components/Search'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { db } from '../firebase'
import { doc, getDoc, collection, query, getDocs } from 'firebase/firestore'
import { Icon } from '@rneui/themed';
import { Avatar } from '@rneui/themed';




const ProductCollection = collection(db, 'Users');


const HomeScreen = ({ navigation }) => {
  const [User, SetUser] = useState(null);
  console.log('User', User)
  useEffect(() => {

    const PleaseWork = async () => {
      try {
        onAuthStateChanged(auth, async (current) => {

          console.log(current.uid)
          const userRef = await getDoc(doc(ProductCollection, current.uid))
          SetUser(userRef.data())
        })

      } catch (err) {
        console.log(err)
      }

    }
    PleaseWork();
  }, [])



  return (
    <View style={styles.container}  >


      <Search navigation={navigation} User={User} />

      <View style={styles.login}>

        {User ? <Avatar
          size={35}
          rounded
          title={User?.name[0]}
          containerStyle={{ backgroundColor: "blue" }}
        /> : <Text  ><Button onPress={() => navigation.push('Login')} icon="account">
          Log in
        </Button> </Text>}


      </View>

      <Products User={User} navigation={navigation} />

      {User ? <SpeedDialnew navigation={navigation} User={User} /> : <></>}
      {User ? <BootomNav navigation={navigation} User={User} /> : <></>}
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {

    height: '100%',
    width: "100%",


  },
  login: {
    position: 'absolute',
    top: 47,
    left: 25
  }

})