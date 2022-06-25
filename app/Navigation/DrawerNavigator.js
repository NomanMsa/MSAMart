import React from 'react';
import {createDrawerNavigator,DrawerContentScrollView} from '@react-navigation/drawer';
import { Text,TouchableOpacity, StyleSheet } from 'react-native';

const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => (
    <Drawer.Navigator drawerStyle={{
        backgroundColor: '#8e91f3',
        width: 240,
        borderTopRightRadius: 40,
        borderBottomRightRadius: 40,
      }}
      drawerContent={drawerContent}
      >
    </Drawer.Navigator>
)

const drawerContent = ({state,navigation,descriptors,progress}) => {
    return (
        <DrawerContentScrollView style={{
            paddingLeft: 30,
            paddingVertical: 20
        }}>
            <Item navigation={navigation} name="Profile" />
            <Item navigation={navigation} name="Create Poll" />
            <Item navigation={navigation} name="Create MeetUps" />
            <Item navigation={navigation} name="Location" />
            {/* <Item navigation={navigation} name="Guest User"/> */}
        </DrawerContentScrollView>
    )
}

const Item = ({name,navigation}) => {
    return (
        <TouchableOpacity onPress={()=>{
            navigation.closeDrawer();
        }} style={styles.Item}>
<Text style={styles.name}>{name}</Text>
         </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    Item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        paddingBottom: 30,
        borderBottomWidth: 0.5,
        borderBottomColor: 'white'
    },
    name: {
        color: 'white',
        fontSize: 18,
    },
    right: {
        marginRight: 30,
        fontSize: 22
    }
})