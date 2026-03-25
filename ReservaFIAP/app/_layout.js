import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Entypo from '@expo/vector-icons/Entypo';

export default function Layout() {
    return(
        <Tabs screenOptions={{ tabBarActiveTintColor: '#ff096f', tabBarStyle: {backgroundColor: '#202020', borderTopWidth: 0, elevation: 0, } }}>
            <Tabs.Screen 
                name='index'
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />
                }}
            />

            <Tabs.Screen 
                name='reservar'
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Ionicons name="bug" size={24} color={color} />
                }}
            />

            <Tabs.Screen 
                name='profile'
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Entypo name="user" size={24} color={color}/>
                }}
            />

        </Tabs>
    )
}