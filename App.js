import CreateToDo from './src/pages/CreateToDo';
import Home from './src/pages/Home'
import React from 'react';

import { useState } from 'react';
import { ToDoContext } from './src/context/ToDoContext';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

export default function App() {

	const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Tarefas" 
        component={Home} 
        options={{
			headerStyle: {
				backgroundColor: 'white',
			},
			headerTintColor: 'black',
			tabBarStyle: {
				backgroundColor: 'white'
			},
			tabBarLabel: 'Home',
			tabBarIcon: ({ color, size }) => (
				<Ionicons name="home" color={color} size={size} />
			),
        }}
      />
      <Tab.Screen 
        name="Criar Tarefa" 
        component={CreateToDo}
        options={{
			headerStyle: {
				backgroundColor: 'white',
			},
			headerTintColor: 'black',
			tabBarStyle: {
				backgroundColor: 'white'
			},
			tabBarLabel: 'Add Task',
			tabBarIcon: ({ color }) => (
				<Ionicons name="add" color={color} size={32} />
			),
        }}
      />
    </Tab.Navigator>
  );
} 

	const [data, setData] = useState([]) 
	const [favouriteData, setFavouriteData] = useState([])

	return (
		<ToDoContext.Provider value={{data, setData, favouriteData, setFavouriteData}}>
			<NavigationContainer>
				<MyTabs/>
			</NavigationContainer>
		</ToDoContext.Provider>
	);
}