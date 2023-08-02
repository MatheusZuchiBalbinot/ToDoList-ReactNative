import { useContext } from 'react';
import {ToDoContext} from '../../context/ToDoContext'

import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

import { Divider } from "@react-native-material/core";


export default function CreatingCards() {

    const {data, setData, favouriteData, setFavouriteData} = useContext(ToDoContext)

    const changeFavourite = (element) => {

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

    const deleteFavourite = (element) => {

        const updatedData = [...data];
        const updatedFavouriteData = [...favouriteData];

        if(element.isFavourite == true) {
            const elementIndex = updatedFavouriteData.indexOf(element)
            updatedFavouriteData.splice(elementIndex, 1)

        } else {
            const elementIndex = updatedData.indexOf(element)
            updatedData.splice(elementIndex, 1)
        }
        setData(updatedData);
        setFavouriteData(updatedFavouriteData)
    }

    const comparaitingDateAndHours = (a, b) => {
        if (a.year !== b.year) {
            return a.year - b.year;
        }
        if (a.mounth !== b.mounth) {
            return a.mounth - b.mounth;
        }
        if (a.day !== b.day) {
            return a.day - b.day;
        }
        if (a.hours !== b.hours) {
            return a.hours - b.hours;
        }
        return a.minutes - b.minutes;
    }

    const checkIfFavourite = (element, index) => {
        if(element.isFavourite == false) {
            return (
                <>
                <TouchableHighlight onPress={() => changeFavourite(element, index)}>
                    <View>
                    <AntDesign 
                        name="staro" 
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
                <TouchableHighlight onPress={() => changeFavourite(element, index)}>
                    <View>
                     <AntDesign 
                        name="star" 
                        size={24} 
                        color="white" 
                     />
                    </View>
                </TouchableHighlight>
                </>
            )
        }
    }

    const renderNormalCards = (dateandtime, description, isFavourite, title, index, item) => {
        data.sort(comparaitingDateAndHours);
        
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
                        <TouchableHighlight onPress={() => deleteFavourite(item)}>
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
    }

    const groupNormalDataByDate = () => {
        data.sort(comparaitingDateAndHours);
        const groupedData = {};

        data.forEach((item) => {
            const { formatedDate } = item;

            if (!groupedData[formatedDate]) {
            groupedData[formatedDate] = [];
            }

            groupedData[formatedDate].push(item);
        });

        return groupedData;
    };

    const groupedData = groupNormalDataByDate();

    const renderFavouriteCards = () => {
        favouriteData.sort(comparaitingDateAndHours);
        return (
            favouriteData.map((item, index) => {

                const {0: title, 1: description, 2: day, 3: mounth, 4: year, 5: hours, 6: minutes, 7: dateandtime, 8: isFavourite} = Object.values(item)
        
                return (
                    <View key={index} style={styles.mainCardView}>
                        <View style={{flexDirection: 'row'}}> 
                            <View style={styles.textView}>
                                <Text style={styles.simpleText}>
                                    N°: {index + 1}
                                </Text>    
                                <Text style={{color: 'white', textAlign: 'center'}}>
                                    {dateandtime}
                                </Text>
                            </View>
                            <View style={styles.iconsView}>
                                {checkIfFavourite(item, index)}
                                <AntDesign name="edit" size={24} color="white" />
                                <TouchableHighlight onPress={() => deleteFavourite(item)}>
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
                                {title}    
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
                    <Text style={styles.cardsPriorityText}> Tarefas em Destaque: </Text>
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
                <Text style={styles.cardsPriorityText}> Tarefas Normais: </Text>
                {Object.keys(groupedData).map((date, mainIndex) => (
                    <View key={mainIndex}>
                        <Text style={{color: 'white', padding: 15, textAlign: 'center'}}>{date}</Text>
                        <Divider style={styles.dividerStyle} leadingInset={28} />
                        
                        <View> 
                            {groupedData[date].map((item, index) => (
                                <View key={index}> 
                                    {renderNormalCards(item.dateandtime, item.description, item.isFavourite, item.title, index + 1, item)}
                                </View>
                            ))}
                        </View>
                    </View>
                ))}
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
    dividerStyle: {
        width: '90%', 
        backgroundColor: 'white'
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
        color: 'gray',
        fontSize: 14,
    },
    titleText: {
        color: 'white',
        fontSize: 18,
    },
    cardsPriorityText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    }
})