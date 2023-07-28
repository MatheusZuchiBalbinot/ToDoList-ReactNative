import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import React, {useState} from 'react'

import DateTimePicker from '@react-native-community/datetimepicker';

import { LinearGradient } from 'expo-linear-gradient';

import { FontAwesome5 } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 

import { useContext } from 'react';
import {ToDoContext} from '../../context/ToDoContext'

export default function CreatingToDo() {

    const {data, setData} = useContext(ToDoContext)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const [initialDate, setInitialDate] = useState(new Date());
    const [initialMode, setInitialMode] = useState('date');
    const [initialShow, setInitialShow] = useState(false);
    const [initialText, setInitialText] = useState();

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
            setData([...data, {title, description, date: initialText}])
            console.log(data) 
            // It's working
            setTitle('')
            setDescription('')
            setInitialText('')
        }
       console.log('algo está vazio')
    }

    return (
        <View style={styles.content}> 
            <LinearGradient
                style={{borderRadius: 10}}
                colors={['#000000', '#090909', '#111111', '#171717', '#1c1c1c']}>
                    <View style={styles.ToDoForm}>
                        <Text style={styles.mainTitle}>Crie uma Tarefa</Text>
                        <View style={{width: '100%'}}>
                            <Text style={styles.inputTitle}>Tarefa:</Text>
                            <View style={{flexDirection: 'row'}}>
                                <FontAwesome5 style={{padding: 7}} name="tasks" size={24} color="white" />
                                
                                <TextInput
                                    style={styles.ToDoInput}
                                    placeholderTextColor='white'
                                    color = 'white'
                                    placeholder='Digite uma Tarefa: ' 
                                    onChangeText={(title) => setTitle(title)}
                                    value={title}
                                />
                            </View>
                            <Text style={styles.inputTitle}>Descrição:</Text>
                            <View style={{flexDirection: 'row'}}>
                                <AntDesign name="infocirlceo" style={{padding: 7}} size={24} color="white" />
                                <TextInput
                                    style={styles.ToDoInput}
                                    placeholderTextColor='white'
                                    color = 'white'
                                    placeholder='Digite uma descrição: ' 
                                    onChangeText={(description) => setDescription(description)}
                                    value={description}
                                    
                                />
                            </View>
                        </View>
                        <View>
                            <Text style={styles.inputTitle}> Data e Hora:</Text>
                            <View style={styles.ViewInput}>
                                <View style={styles.DateTimeView}>
                                    <Pressable style={styles.DateTimeButton} onPress={() => initialShowMode('date')}>
                                        <Text style={styles.DateTimeText}>Data</Text>
                                    </Pressable>  
                                    <Pressable style={styles.DateTimeButton} onPress={() => initialShowMode('time')}>
                                        <Text style={styles.DateTimeText}>Horário</Text>
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
            </LinearGradient>
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
        fontSize: 20,
        textAlign: 'center',
        justifyContent: 'center',
        color: 'white'
    },
    content: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
    },
    ToDoForm: {
        padding: 15,
        borderColor: 'white',
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 10,
    },
    ViewInput: {
        padding: 8,
        paddingVertical: 20,
    },
    showTextDateTime: {
        marginBottom: 20,
        fontSize: 16,
        color: '#5FFAC9',
        textAlign: 'center',
    },
    ToDoInput: {
        padding: 5,
        color: 'black',
        maxHeight: 80,
        width: 220,
        marginHorizontal: 10,
    },
    inputTitle: {
        fontSize: 14,
        marginTop: 15,
        color: 'white',        
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
        width: 80,
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
    }
})