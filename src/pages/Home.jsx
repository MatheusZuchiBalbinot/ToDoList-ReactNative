import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';

import { useContext } from 'react';
import {ToDoContext} from '../context/ToDoContext'

import CreatingCards from '../components/CreatingCards/CreatingCards';

import { ScrollView } from "react-native";

export default function Home() {

    const {data, setData, favouriteData, setFavouriteData} = useContext(ToDoContext)

    const positioningCards = () => {
        if(data != '' || favouriteData != '') {
            return (
                <ScrollView style={{backgroundColor: '#FFFFFA'}}>
                    <View style={styles.main}>
                        <StatusBar hidden />
                        <View style={{width: '95%'}}> 
                            <CreatingCards />
                        </View>
                    </View>
                </ScrollView>
            )
        }
        else {
            return (
                <View style={styles.mainWhitoutData}>
                    <Text style={styles.title}>
                        Nenhuma tarefa foi cadastrada...
                    </Text>
                    <StatusBar hidden />
                </View>
            )
        }
    }

    return positioningCards()
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFFFFA',
        color: 'white',
        alignItems: 'center',
        paddingVertical: 20,
    },
    mainWhitoutData: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFFFFA',
        color: 'black',
        alignItems: 'center',
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
        marginBottom: 20,
        justifyContent: 'center'
    }
  });
  