import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';

import { useContext } from 'react';
import {ToDoContext} from '../context/ToDoContext'

import CreatingCards from '../components/CreatingCards';

import { ScrollView } from "react-native";

export default function Home() {

    const {data, setData, favouriteData, setFavouriteData} = useContext(ToDoContext)

    const positioningCards = () => {
        if(data != '' || favouriteData != '') {
            return (
                <ScrollView style={{backgroundColor: 'rgba(30,30,30,255)'}}>
                    <View style={styles.main}>
                        <Text style={styles.title}>
                            Tarefas:
                        </Text>
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
        backgroundColor: 'rgba(30,30,30,255)',
        color: 'white',
        alignItems: 'center',
        paddingVertical: 20,
    },
    mainWhitoutData: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(30,30,30,255)',
        color: 'white',
        alignItems: 'center',
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20,
        justifyContent: 'center'
    }
  });
  