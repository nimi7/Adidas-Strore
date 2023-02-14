import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { BottomNavigation, Text } from 'react-native-paper';





const RecentsRoute = () => <Text>Recents</Text>;

const NotificationsRoute = () => <Text>Notifications</Text>;


const BootomNav = ({ navigation, User }) => {
    const Categories = () => console.log('Categories func');
    const FavoritsItems = () => console.log('FavoritsItems func');

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'FavoritsItems', title: 'Favorites', focusedIcon: 'heart', unfocusedIcon: 'heart-outline', color: '#DCDCDC' },
        { key: 'Categories', title: 'Categories', focusedIcon: 'rowing' },

    ]);

    const renderScene = BottomNavigation.SceneMap({
        FavoritsItems: FavoritsItems,
        Categories: Categories,
    });
    return (
        <View style={styles.container}>

            <BottomNavigation
                activeColor='black'
                inactiveColor='#FF8C00'
                safeAreaInsets={{ bottom: -17, left: 2 }}
                barStyle={{ backgroundColor: '#DCDCDC' }}
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
                onTabPress={(item) => {
                    console.log(item.route.key)
                    navigation.navigate(item.route.key , {User :User})
                }}
            />

        </View>
    )
}

export default BootomNav

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',



    }
})