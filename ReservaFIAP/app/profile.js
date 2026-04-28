import { useState, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = '@reservafiap:user';
const SESSION_KEY = '@reservafiap:session';

export default function Profile() {
    const router = useRouter();
    
    const [userData, setUserData] = useState({
        nome: 'Carregando...',
        rm: '...',
        iniciais: '--'
    });

    const carregarDados = useCallback(async () => {
        try {
            const userJson = await AsyncStorage.getItem(USER_KEY);
            if (userJson) {
                const usuario = JSON.parse(userJson);
                
                const partesNome = usuario.nome.trim().split(' ').filter(Boolean);
                let iniciaisCalc = '--';
                if (partesNome.length > 1) {
                    iniciaisCalc = (partesNome[0][0] + partesNome[partesNome.length - 1][0]).toUpperCase();
                } else if (partesNome.length === 1) {
                    iniciaisCalc = partesNome[0].substring(0, 2).toUpperCase();
                }

                setUserData({
                    nome: usuario.nome,
                    rm: usuario.rm,
                    iniciais: iniciaisCalc
                });
                return;
            }

            setUserData({
                nome: 'Usuário não encontrado',
                rm: '--',
                iniciais: '--'
            });
        } catch (error) {
            console.error('Erro ao carregar os dados do perfil', error);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            carregarDados();
        }, [carregarDados])
    );
    
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem(SESSION_KEY);
            router.replace('/sign');
        } catch (error) {
            console.error('Erro ao tentar sair da conta:', error);
            Alert.alert('Erro', 'Nao foi possivel sair da conta.');
        }
    };

    return (
        <View style={styles.container}>
            {/* Cabeçalho do Perfil */}
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{userData.iniciais}</Text>
                </View>
                <Text style={styles.userName}>{userData.nome}</Text>
                <Text style={styles.userRM}>RM {userData.rm}</Text>
            </View>

            {/* Informações Acadêmicas */}
            <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Curso: <Text style={styles.infoValue}>Ciência da Computação</Text></Text>
                <Text style={styles.infoLabel}>Semestre: <Text style={styles.infoValue}>1º</Text></Text>
                <Text style={styles.infoLabel}>Turma: <Text style={styles.infoValue}>1CCPX</Text></Text>
            </View>

            {/* Seção de Reserva Atual */}
            <View style={styles.reservationSection}>
                <Text style={styles.reservationTitle}>Reserva atual:</Text>
                <View style={styles.reservationCard}>
                    <Text style={{ color: 'gray', fontStyle: 'italic' }}>Nenhuma reserva ativa no momento</Text>
                </View>
            </View>

            {/* Botão Opcional de Logout */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Sair da conta</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#202020', 
        paddingHorizontal: 30,
        paddingTop: 60 
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#D9D9D9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    avatarText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#202020',
    },
    userName: {
        fontSize: 24,
        fontWeight: '700',
        color: 'white',
    },
    userRM: {
        fontSize: 16,
        color: 'gray',
        marginTop: 4,
    },
    infoSection: {
        marginBottom: 40,
    },
    infoLabel: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    infoValue: {
        color: 'gray',
        fontWeight: '400',
    },
    reservationSection: {
        flex: 1,
    },
    reservationTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 15,
    },
    reservationCard: {
        height: 180,
        borderWidth: 1,
        borderColor: '#ff096f',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'dashed', 
    },
    logoutButton: {
        marginBottom: 30,
        alignItems: 'center',
    },
    logoutText: {
        color: '#ff096f',
        fontWeight: 'bold',
    }
});
