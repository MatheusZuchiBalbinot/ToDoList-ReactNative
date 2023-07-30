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
        name="Home" 
        component={Home} 
        options={{
			headerStyle: {
				backgroundColor: 'rgba(30,30,30,255)',
			},
			headerTintColor: 'white',
			tabBarStyle: {
				backgroundColor: 'rgba(30,30,30,255)'
			},
			tabBarLabel: 'Home',
			tabBarIcon: ({ color, size }) => (
				<Ionicons name="home" color={color} size={size} />
			),
        }}
      />
      <Tab.Screen 
        name=" Criar To Do" 
        component={CreateToDo}
        options={{
			headerStyle: {
				backgroundColor: 'rgba(30,30,30,255)',
			},
			headerTintColor: 'white',
			tabBarStyle: {
				backgroundColor: 'rgba(30,30,30,255)'
			},
			tabBarLabel: 'Add To Do',
			tabBarIcon: ({ color }) => (
				<Ionicons name="add" color={color} size={32} />
			),
        }}
      />
    </Tab.Navigator>
  );
} 

	const [data, setData] = useState([]) 

	return (
		<ToDoContext.Provider value={{data, setData}}>
			<NavigationContainer>
				<MyTabs/>
			</NavigationContainer>
		</ToDoContext.Provider>
	);
}