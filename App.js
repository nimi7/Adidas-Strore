import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import Login from './screens/Components/User/Login';
import Register from './screens/Components/User/Register';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { Store } from './Store/Store';
import SingleProduct from './screens/SingleProduct';
import Search from './screens/Components/Search';
import SearchResult from './screens/Components/SearchResult';
import FavoritsItems from './screens/FavoritsItems';
import Categories from './screens/Categories';
const Stack = createNativeStackNavigator();


export default function App() {

  return (
    <Provider store={Store}>


      <SafeAreaProvider>



        <NavigationContainer>

          <Stack.Navigator>

            <Stack.Screen options={{ headerShown: false }} name="home" component={HomeScreen} />
            <Stack.Screen options={{ headerShown: false }} name='Login' component={Login} />
            <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
            <Stack.Screen options={{ headerShown: false }} name="SingleProduct" component={SingleProduct} />
            <Stack.Screen options={{
              headerTintColor: '#fff',
              headerTitleAlign:'center',
              headerStyle: {
                backgroundColor: '#f4511e',
              },
            }} name="SearchResult" component={SearchResult} />
            <Stack.Screen options={{ headerShown: false }} name="FavoritsItems" component={FavoritsItems} />
            <Stack.Screen options={{ headerShown: false }} name="Categories" component={Categories} />
          </Stack.Navigator>

        </NavigationContainer>

      </SafeAreaProvider>
    </Provider>
  );
}

