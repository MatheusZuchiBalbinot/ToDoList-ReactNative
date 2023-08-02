import { StyleSheet, Text, TextInput, View, Pressable, Alert } from 'react-native';
import { Divider } from "@react-native-material/core";
import React, {useState} from 'react'

import DateTimePicker from '@react-native-community/datetimepicker';

import { FontAwesome5 } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 

import { useContext } from 'react';
import {ToDoContext} from '../../context/ToDoContext';

export default function CreatingToDo() {

    const {data, setData} = useContext(ToDoContext)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const [initialDate, setInitialDate] = useState(new Date());
    const [initialMode, setInitialMode] = useState('date');
    const [initialShow, setInitialShow] = useState(false);
    const [initialText, setInitialText] = useState('');

    const [formatedDate, setFormatedDate] = useState('');

    const [day, setDay] = useState();
    const [month, setMonth] = useState();
    const [year, setYear] = useState();

    const [hours, setHours] = useState();
    const [minutes, setMinutes] = useState();

    const InitialOnChange = (event, initialSelectedDate) => {
        const initialCurrentDate = initialSelectedDate || initialDate;
        setInitialShow(false);
        setInitialDate(initialCurrentDate);

        let tempDate = new Date(initialCurrentDate);
        let formatedDate = formatDate(tempDate); // Utiliza a função para formatar a data
        let formatedTime = tempDate.getHours() + 'h' + tempDate.getMinutes();
        setDay(tempDate.getDate());
        setMonth(tempDate.getMonth() + 1);
        setYear(tempDate.getFullYear());
        setHours(tempDate.getHours());
        setMinutes(tempDate.getMinutes());
        setFormatedDate(formatedDate);
        setInitialText(formatedDate + ' às ' + formatedTime);

    }

    const initialShowMode = (currentMode) => {
        setInitialShow(true);
        setInitialMode(currentMode)
    }

    const isTimePast = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; 
        const currentDay = currentDate.getDate();
        const currentHours = currentDate.getHours();
        const currentMinutes = currentDate.getMinutes();
    
        if (year < currentYear) {
            return true;
        } else if (year === currentYear && month < currentMonth) {
            return true;
        } else if (year === currentYear && month === currentMonth && day < currentDay) {
            return true;
        } else if (
            year === currentYear &&
            month === currentMonth &&
            day === currentDay &&
            hours < currentHours
        ) {
            return true;
        } else if (
            year === currentYear &&
            month === currentMonth &&
            day === currentDay &&
            hours === currentHours &&
            minutes < currentMinutes
        ) {
            return true;
        }
            return false;
    };

    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      }

    const handleSubmit = () => {

        if (isTimePast(year, month, day, hours, minutes)) {
            Alert.alert('Aviso', 'Não é possível cadastrar uma tarefa para o passado!! Por favor, coloque uma data válida.');
        } else {
            if (title !== '' && description !== '' && initialText !== '') {
                setData([...data, { title, description, day, month, year, hours, minutes, dateandtime: initialText, isFavourite: false, formatedDate }]);
                setTitle('');
                setDescription('');
                setInitialText('');
                Alert.alert('Sucesso', 'Tarefa cadastrada com sucesso.');
            } else {
                Alert.alert('Campos Vazios', 'Por favor, preencha todos os campos');
            }
          }
    }

    return (
        <View style={styles.content}> 
            <View style={styles.ToDoForm}>
                <Text style={styles.mainTitle}>Crie uma Tarefa</Text>
                <Divider style={styles.dividerStyle} leadingInset={42} />
                <View style={styles.inputsView}>
                    <View style={styles.viewInput}>
                        <FontAwesome5 style={styles.iconStyle} name="tasks" size={24} color="black" />
                        <View style={styles.viewInputDirection}>
                            <Text style={styles.inputTitle}>Título:</Text>
                            <TextInput
                                style={styles.ToDoInput}
                                placeholderTextColor='gray'
                                color = 'black'
                                placeholder='Ex: Capinar' 
                                onChangeText={(title) => setTitle(title)}
                                value={title}
                            />
                        </View>
                    </View>
                    <View style={styles.viewInput}>
                        <AntDesign name="infocirlceo" style={styles.iconStyle} size={24} color="black" />
                        <View style={styles.viewInputDirection}>
                            <Text style={styles.inputTitle}>Descrição:</Text>
                            <TextInput
                                style={styles.ToDoInput}
                                placeholderTextColor='gray'
                                color = 'black'
                                placeholder='Ex: Capinar 1/4 do lote' 
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
        textAlign: 'center',
        justifyContent: 'center',
        color: 'black',
    },
    content: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
    },
    ToDoForm: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    ViewInput: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        paddingBottom: 15,
    },
    showTextDateTime: {
        marginBottom: 20,
        fontSize: 16,
        textAlign: 'center',
    },
    ToDoInput: {
        color: 'black',
        padding: 1,
        width: 220,
    },
    inputTitle: {
        fontSize: 14,
        color: 'black',
    },
    DateTimeView: {
        flexDirection: 'row', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    DateTimeButton: {
        alignItems: 'center',
        paddingVertical: 12,
        width: 50,
        borderRadius: 4,
        elevation: 5,
        backgroundColor: 'white',
        marginBottom: 10,
    },
    DateTimeText: {
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
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
        display: 'flex',
        marginBottom: 10,
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