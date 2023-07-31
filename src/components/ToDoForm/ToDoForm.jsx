import { StyleSheet, Text, TextInput, View, Pressable, Alert } from 'react-native';
import { Divider } from "@react-native-material/core";
import React, {useState} from 'react'

import DateTimePicker from '@react-native-community/datetimepicker';

import { LinearGradient } from 'expo-linear-gradient';

import { FontAwesome5 } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 

import { useContext } from 'react';
import {ToDoContext} from '../../context/ToDoContext'

export default function CreatingToDo() {

    const {data, setData} = useContext(ToDoContext)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const [initialDate, setInitialDate] = useState(new Date());
    const [initialMode, setInitialMode] = useState('date');
    const [initialShow, setInitialShow] = useState(false);
    const [initialText, setInitialText] = useState('');

    const InitialOnChange = (event, initialSelectedDate) => {
        const initialCurrentDate = initialSelectedDate || initialDate;
        setInitialShow(false);
        setInitialDate(initialCurrentDate)

        let tempDate = new Date(initialCurrentDate);
        let formatedDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + (tempDate.getFullYear());
        let formatedTime = tempDate.getHours() + 'h' + tempDate.getMinutes();
        setInitialText(formatedDate + ' as ' + formatedTime)

    }

    const initialShowMode = (currentMode) => {
        setInitialShow(true);
        setInitialMode(currentMode)
    }

    const handleSubmit = () => {
        if(title != '' && description != '' && initialText != '') {
            setData([...data, {title, description, initialText, isFavourite: false}])
            setTitle('')
            setDescription('')
            setInitialText('')
        }
        else {
            Alert.alert('Campos Vazios','Por favor, preencha todos os campos')
        }
    }

    return (
        <View style={styles.content}> 
            <View style={styles.ToDoForm}>
                <Text style={styles.mainTitle}>Crie uma Tarefa</Text>
                <Divider style={styles.dividerStyle} leadingInset={42} />
                <View style={styles.inputsView}>
                    <View style={styles.viewInput}>
                        <FontAwesome5 style={styles.iconStyle} name="tasks" size={24} color="white" />
                        <View style={styles.viewInputDirection}>
                            <Text style={styles.inputTitle}>Título:</Text>
                            <TextInput
                                style={styles.ToDoInput}
                                placeholderTextColor='gray'
                                color = 'white'
                                placeholder='Ex: Capinar o Lote de Vovó' 
                                onChangeText={(title) => setTitle(title)}
                                value={title}
                            />
                        </View>
                    </View>
                    <View style={styles.viewInput}>
                        <AntDesign name="infocirlceo" style={styles.iconStyle} size={24} color="white" />
                        <View style={styles.viewInputDirection}>
                            <Text style={styles.inputTitle}>Descrição:</Text>
                            <TextInput
                                style={styles.ToDoInput}
                                placeholderTextColor='gray'
                                color = 'white'
                                placeholder='Ex: Capinar 1/4 do lote de Vovó' 
                                onChangeText={(description) => setDescription(description)}
                                value={description}
                                
                            />
                        </View>
                    </View>
                </View>
                <View>
                    <View style={styles.ViewInput}>
                        <View style={styles.DateTimeView}>
                            <Pressable style={styles.DateTimeButton} onPress={() => initialShowMode('date')}>
                                <Text style={styles.DateTimeText}>
                                    <MaterialIcons 
                                        name="date-range" 
                                        size={24} 
                                        color="black" 
                                    />
                                </Text>
                            </Pressable>  
                            <Pressable style={styles.DateTimeButton} onPress={() => initialShowMode('time')}>
                                <Text style={styles.DateTimeText}>
                                    <Ionicons 
                                        name="time-outline" 
                                        size={24} 
                                        color="black" 
                                    />
                                </Text>
                            </Pressable>         
                        </View>
                    </View>
                    {initialText && (
                        <Text style={styles.showTextDateTime}>{initialText}</Text>
                    )}
                </View>
                <View style={{display: 'flex', alignItems: 'center'}}>
                    <Pressable style={styles.sendButton} onPress={handleSubmit}>
                        <Text style={styles.sendText}>Criar</Text>
                    </Pressable>  
                </View>
            </View>
            {initialShow && (
                <DateTimePicker 
                    testID='dateTimePicker' 
                    value={initialDate} 
                    mode={initialMode} 
                    is24Hour={true} 
                    display='default'
                    onChange={InitialOnChange}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    mainTitle: {
        margin: 5,
        fontSize: 24,
        width: '100%',
        textAlign: 'center',
        justifyContent: 'center',
        color: 'white',
    },
    content: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
    },
    ToDoForm: {
        padding: 15,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 10,
        backgroundColor: '#03223f',
    },
    ViewInput: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        paddingBottom: 15,
    },
    showTextDateTime: {
        marginBottom: 20,
        fontSize: 16,
        color: '#5FFAC9',
        textAlign: 'center',
    },
    ToDoInput: {
        color: 'black',
        padding: 1,
        width: 220,
    },
    inputTitle: {
        fontSize: 14,
        color: 'goldenrod',        
    },
    DateTimeView: {
        flexDirection: 'row', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    DateTimeButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        width: 50,
        borderRadius: 4,
        elevation: 10,
        backgroundColor: 'white',
        },
    DateTimeText: {
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
    },
    sendButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        width: 250,
        borderRadius: 4,
        elevation: 10,
        backgroundColor: 'white',
        borderColor: 'black',
        display: 'flex'
    },
    sendText: {
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
    },
    dividerStyle: {
        width: '75%', 
        backgroundColor: 'white'
    },
    iconStyle: {
        padding: 10, 
        paddingTop: 12
    },
    viewInput: {
        flexDirection: 'row', 
        borderColor: 'gray', 
        borderRadius: 10
    },
    inputsView: {
        width: '100%', 
        paddingVertical: 10, 
        rowGap: 10
    },
    viewInputDirection: {
        flexDirection: 'column', 
    }
})