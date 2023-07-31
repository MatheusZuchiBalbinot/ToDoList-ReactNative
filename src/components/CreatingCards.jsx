import { useContext } from 'react';
import {ToDoContext} from '../context/ToDoContext'

import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

export default function CreatingCards() {

    const {data, setData, favouriteData, setFavouriteData} = useContext(ToDoContext)

    const changeFavourite = (elementIndex, element) => {

        const updatedData = [...data];
        const updatedFavouriteData = [...favouriteData];

        if(updatedData != [] || updatedFavouriteData != []) {
            if(element.isFavourite == true) {
                element.isFavourite = !element.isFavourite
                updatedData.push(element);
                const indexInData = updatedFavouriteData.indexOf(element)
                updatedFavouriteData.splice(indexInData, 1)
            }
            else {
                element.isFavourite = !element.isFavourite
                updatedFavouriteData.push(element);
                const indexInData = updatedData.indexOf(element)
                updatedData.splice(indexInData, 1)
            }
            setData(updatedData);
            setFavouriteData(updatedFavouriteData);
        }
    }

    const deleteFavourite = (elementIndex) => {

        const updatedData = [...data];   
        updatedData.splice(elementIndex, 1);
        setData(updatedData);
    }

    const checkIfFavourite = (element, index) => {
        if(element.isFavourite == false) {
            return (
                <>
                <TouchableHighlight onPress={() => changeFavourite(index, element)}>
                    <View>
                    <MaterialIcons 
                        name="favorite-outline" 
                        size={24} 
                        color="white" 
                    />
                    </View>
                </TouchableHighlight>
                </>
            )
        } else {
            return (
                <>
                <TouchableHighlight onPress={() => changeFavourite(index, element)}>
                    <View>
                        <MaterialIcons 
                            name="favorite" 
                            size={24} 
                            color="white" 
                        />
                    </View>
                </TouchableHighlight>
                </>
            )
        }
    }

    const renderNormalCards = () => {
        return (
            data.map((item, index) => {

                const {0: title, 1: description, 2: dateandtime, 3: isFavourite} = Object.values(item)
        
                return (
                    <View key={index} style={styles.mainCardView}>
                        <View style={{flexDirection: 'row'}}> 
                            <View style={styles.textView}>
                                <Text style={styles.simpleText}>
                                    N°: {index}
                                </Text>    
                                <Text style={{color: 'white', textAlign: 'center'}}>
                                    {dateandtime}
                                </Text>
                            </View>
                            <View style={styles.iconsView}>
                                {checkIfFavourite(item, index)}
                                <AntDesign name="edit" size={24} color="white" />
                                <TouchableHighlight onPress={() => deleteFavourite(index)}>
                                    <View>
                                        <MaterialCommunityIcons 
                                            name="delete-outline" 
                                            size={24} 
                                            color="white" 
                                        />
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                        <View style={styles.descriptionView}>
                            <Text style={styles.simpleText}>
                                Tarefa: {title}    
                            </Text> 
                            <Text style={styles.simpleText}>
                                Descrição: {description}    
                            </Text>
                        </View>
                    </View>
                )
            })
        )
    }

    const renderFavouriteCards = () => {
        return (
            favouriteData.map((item, index) => {

                const {0: title, 1: description, 2: dateandtime, 3: isFavourite} = Object.values(item)
        
                return (
                    <View key={index} style={styles.mainCardView}>
                        <View style={{flexDirection: 'row'}}> 
                            <View style={styles.textView}>
                                <Text style={styles.simpleText}>
                                    N°: {index}
                                </Text>    
                                <Text style={{color: 'white', textAlign: 'center'}}>
                                    {dateandtime}
                                </Text>
                            </View>
                            <View style={styles.iconsView}>
                                {checkIfFavourite(item, index)}
                                <AntDesign name="edit" size={24} color="white" />
                                <TouchableHighlight onPress={() => deleteFavourite(index)}>
                                    <View>
                                        <MaterialCommunityIcons 
                                            name="delete-outline" 
                                            size={24} 
                                            color="white" 
                                        />
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                        <View style={styles.descriptionView}>
                            <Text style={styles.simpleText}>
                                Tarefa: {title}    
                            </Text> 
                            <Text style={styles.simpleText}>
                                Descrição: {description}    
                            </Text>
                        </View>
                    </View>
                )
            })
        )
    }

    const checkIfFavouritesAvailable = () => {
        if(favouriteData.length != 0) {
            return (
                <View> 
                    <Text style={styles.cardsPriorityText}> Cards em destaque: </Text>
                    {renderFavouriteCards()}
                </View>
            )
        }
    }

    return (
        <View style={{width: '95%'}}>
            <View>
                {checkIfFavouritesAvailable()}
            </View>

            <View>
                <Text style={styles.cardsPriorityText}> Cards sem prioridade: </Text>
                {renderNormalCards()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainCardView: {
        display: 'flex',
        flexDirection: 'column',
        padding: 5,
        margin: 10,
        backgroundColor: "#2c2f1d",
        width: '100%',
        borderRadius: 20,
    },
    descriptionView: {
        display: 'flex',
        margin: 10,
        rowGap: 10,
    },
    textView: {
        flexDirection: 'row', 
        width: '56%', 
        height: 50, 
        gap: 20, 
        alignItems: 'center',
        padding: 10,
    },
    iconsView: {
        width: 150,
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 20,
        paddingEnd: 10,
    }, 
    simpleText: {
        color: 'white',
        fontSize: 14,
    },
    cardsPriorityText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    }
})