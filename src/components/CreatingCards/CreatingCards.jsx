import { useContext } from 'react';
import {ToDoContext} from '../../context/ToDoContext'

import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { StyleSheet, View, Text, TouchableHighlight, Alert } from 'react-native';

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
        Alert.alert('Sucesso', 'Tarefa excluida com sucesso.');
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
                <TouchableHighlight underlayColor="gray" onPress={() => changeFavourite(element, index)}>
                    <View>
                    <AntDesign 
                        name="staro" 
                        size={24} 
                        color="black" 
                    />
                    </View>
                </TouchableHighlight>
                </>
            )
        } else {
            return (
                <>
                <TouchableHighlight underlayColor="gray" onPress={() => changeFavourite(element, index)}>
                    <View>
                     <AntDesign 
                        name="star" 
                        size={24} 
                        color="black" 
                     />
                    </View>
                </TouchableHighlight>
                </>
            )
        }
    }

    const generateCards = (index, dateandtime, title, description, item) => {
        return (
            <View key={index} style={styles.mainCardView}>
                <View style={{flexDirection: 'row'}}> 
                    <View style={styles.textView}>
                        <Text style={styles.simpleText}>
                            N°: {index}
                        </Text>    
                        <Text style={styles.dateandtimeText}>
                            {dateandtime}
                        </Text>
                    </View>
                    <View style={styles.iconsView}>
                        {checkIfFavourite(item, index)}
                        <TouchableHighlight underlayColor="gray" onPress={() => deleteFavourite(item)}>
                            <View>
                                <MaterialCommunityIcons 
                                    name="delete-outline" 
                                    size={24} 
                                    color="black" 
                                />
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.descriptionView}>
                    <Text style={styles.titleText}>
                        {title}    
                    </Text> 
                    <Text style={styles.descriptionText}>
                        {description}    
                    </Text>
                </View>
            </View>
        )
    }

    const renderNormalCards = (title, description, dateandtime, item, index) => {
        data.sort(comparaitingDateAndHours);
        return generateCards(index, dateandtime, title, description, item)
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
                const {0: title, 1: description, 7: dateandtime} = Object.values(item)
        
                return generateCards(index + 1, dateandtime, title, description, item)
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

    const checkifNormalAvailable = () => {
        if(data.length > 0) {
            return (
                <>
                    <Text style={styles.cardsPriorityText}> Tarefas sem prioridade: </Text>
                    {Object.keys(groupedData).map((date, mainIndex) => (
                        <View key={mainIndex}>
                            <Text style={styles.viewDateText}>
                                {date}
                            </Text>
                            <Divider 
                                style={styles.dividerStyle} 
                                leadingInset={28} 
                            />
                            <View> 
                                {groupedData[date].map((item, index) => (
                                    <View key={index}> 
                                        {renderNormalCards(item.title, item.description, item.dateandtime, item, index + 1)}
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))}
                </>
            )
        }
    }

    return (
        <View style={{width: '95%'}}>
            <View>
                {checkIfFavouritesAvailable()}
            </View>
            <View>
                {checkifNormalAvailable()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainCardView: {
        display: 'flex',
        flexDirection: 'column',
        margin: 10,
        backgroundColor: "white",
        width: '100%',
        borderRadius: 20,
        elevation: 5,
    },
    descriptionView: {
        display: 'flex',
        marginHorizontal: 10,
        marginBottom: 10,
    },
    textView: {
        flexDirection: 'row', 
        width: '50%', 
        height: 50, 
        gap: 35, 
        alignItems: 'center',
        padding: 10,
        color: 'black'
    },
    dividerStyle: {
        width: '90%', 
        backgroundColor: 'black',
    },
    viewDateText: {
        color: 'black', 
        padding: 15, 
        textAlign: 'center',
    },
    iconsView: {
        width: 150,
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 15,
    }, 
    simpleText: {
        color: 'black',
        fontSize: 14,
    },
    descriptionText: {
        fontWeight: '300',
        fontSize: 14,
        color: 'gray',
    },
    titleText: {
        color: 'white',
        fontSize: 18,
    },
    cardsPriorityText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        paddingVertical: 10,
        paddingBottom: 15,
    },
    titleText: {
        fontSize: 18,
        color: 'black',
    }, 
    dateandtimeText: {
        textAlign: 'center',
        color: 'black'
    }
})