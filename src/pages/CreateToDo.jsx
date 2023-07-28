import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import ToDoForm from '../components/ToDoForm/ToDoForm';

export default function CreateToDo() {
    return (
        <View style={styles.main}>
            <StatusBar hidden />
            <ToDoForm />
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'rgba(30,30,30,255)',
      color: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });