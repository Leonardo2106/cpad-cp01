import { Tabs, useRouter, useSegments } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

const SESSION_KEY = '@reservafiap:session';
const AUTH_ROUTES = new Set(['sign', 'cadastro', 'login']);

export default function Layout() {
    const router = useRouter();
    const segments = useSegments();
    const [isReady, setIsReady] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const verificarSessao = async () => {
            try {
                const session = await AsyncStorage.getItem(SESSION_KEY);
                const authenticated = session === 'active';
                const currentRoute = segments[0] ?? 'index';
                const inAuthGroup = AUTH_ROUTES.has(currentRoute);

                setIsAuthenticated(authenticated);

                if (!authenticated && !inAuthGroup) {
                    router.replace('/sign');
                } else if (authenticated && inAuthGroup) {
                    router.replace('/');
                }
            } catch (error) {
                console.error('Erro ao verificar sessão', error);
            } finally {
                setIsReady(true);
            }
        };

        verificarSessao();
    }, [segments]);

    // Evita um flash da tela inicial antes da verificação terminar
    if (!isReady) {
        return (
            <View style={{ flex: 1, backgroundColor: '#202020', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#ff096f" />
            </View>
        );
    }

    const hideTabBar = !isAuthenticated || AUTH_ROUTES.has(segments[0] ?? 'index');

    return(
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#ff096f',
                tabBarStyle: hideTabBar
                    ? { display: 'none' }
                    : { backgroundColor: '#202020', borderTopWidth: 0, elevation: 0 },
            }}
        >
            <Tabs.Screen 
                name='index'    
                options={{
                    headerShown: false,
                    href: isAuthenticated ? '/' : null,
                    tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />
                }}
            />

            <Tabs.Screen 
                name='reservar'
                options={{
                    headerShown: false,
                    href: isAuthenticated ? '/reservar' : null,
                    tabBarIcon: ({ color }) => <Ionicons name="bug" size={24} color={color} />
                }}
            />

            <Tabs.Screen 
                name='profile'
                options={{
                    headerShown: false,
                    href: isAuthenticated ? '/profile' : null,
                    tabBarIcon: ({ color }) => <Entypo name="user" size={24} color={color}/>
                }}
            />

            <Tabs.Screen 
                name='cadastro'
                options={{
                    headerShown: false,
                    href: isAuthenticated ? null : '/cadastro',
                }}
            />

            <Tabs.Screen 
                name='sign'
                options={{
                    headerShown: false,
                    href: isAuthenticated ? null : '/sign',
                }}
            />

            <Tabs.Screen 
                name='login'
                options={{
                    headerShown: false,
                    href: isAuthenticated ? null : '/login',
                }}
            />
        </Tabs>
    );
}
