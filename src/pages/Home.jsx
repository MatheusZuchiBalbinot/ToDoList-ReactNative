import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';

export default function Home() {
    return (
        <View style={styles.main}>
            <StatusBar hidden />
            <Text style={{color: 'white'}}> 
                Showing To Do Cards
            </Text>
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
  