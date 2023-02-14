import React, { useState } from 'react';
import { SpeedDial } from '@rneui/themed';
import { View, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { Icon } from '@rneui/themed';
const SpeedDialnew = ({ navigation }) => {
    const [open, setOpen] = useState(false);
    return (
        <View style={styles.container}>


            <SpeedDial
                color='#FF8C00'
                placement='right'
                overlayColor='#FFE4B5'
                isOpen={open}
                icon={{ name: 'toc', color: 'black' }}
                openIcon={{ name: 'close', color: '#fff' }}
                onOpen={() => setOpen(!open)}
                onClose={() => setOpen(!open)}
            >
                <SpeedDial.Action
                    labelPressable={true}
                    color='#FF8C00'
                    icon={{ name: 'person', color: 'black' }}
                    title="Profile"
                    onPress={() => navigation.push('Profile')}
                />
                <SpeedDial.Action
                    color='#FF8C00'
                    title="Log Out"
                    onPress={() => signOut(auth).then(navigation.push('home'))}
                    icon={{ name: 'logout', color: 'black' }}
                />




            </SpeedDial>

        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 55,
        height: '100%',
        width: '100%',


    }
})
export default SpeedDialnew

