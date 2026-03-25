import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const SALAS_RESERVADAS = [
    { id: '1', title: 'Iniciação Cientifica', sala: '202', unidade: 'Paulista', privada: true, reservante_name: 'Fulano da Silva', reservante_rm: '999999' },
    { id: '2', title: 'Grupo de Estudo - Matemática', sala: '204', unidade: 'Aclimação', privada: false, reservante_name: 'Fulano da Silva', reservante_rm: '999999' },
    { id: '3', title: 'Challenge 3ECPW', sala: '306', unidade: 'Paulista', privada: true, reservante_name: 'Fulano da Silva', reservante_rm: '999999' },
    { id: '4', title: 'Dicas de Clean Code', sala: '608', unidade: 'Paulista', privada: false, reservante_name: 'Fulano da Silva', reservante_rm: '999999' },
];

const SALAS_DISPONIVEIS = [
    { id: '1', sala: '110', unidade: 'Paulista' },
    { id: '2', sala: '215', unidade: 'Aclimação' },
    { id: '3', sala: '408', unidade: 'Paulista' },
    { id: '4', sala: '512', unidade: 'Aclimação' },
];

export default function Index() {
    const router = useRouter();
    const renderReservedItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={{ color: 'white', fontSize: 25, fontWeight: '700' }}>{item.title}</Text>
            <Text style={{ color: 'white', marginTop: 3, marginBottom: 10, fontWeight: '500', }}>Reservante:<Text style={styles.secondaryText}>{item.reservante_name} | RM {item.reservante_rm}</Text></Text>
            <Text style={styles.secondaryText}>Sala: {item.sala} | {item.sala.charAt(0)}º andar</Text>
            <Text style={styles.secondaryText}>Unidade: {item.unidade}</Text>
            <Text style={{ color: 'white', marginTop: 5 }}>Privada: {item.privada ? 'SIM' : 'NÃO'}</Text>
            {!item.privada && (
                <TouchableOpacity style={styles.requestButton}>
                    <Text style={styles.requestButtonText}>Solicitar entrada</Text>
                </TouchableOpacity>
            )}
        </View>
    );

    const renderAvailableItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: '700', marginBottom: 8 }}>Sala {item.sala}</Text>
            <Text style={styles.secondaryText}>{item.sala.charAt(0)}º andar</Text>
            <Text style={styles.secondaryText}>Unidade: {item.unidade}</Text>
            <TouchableOpacity style={styles.requestButton} onPress={() => router.push('/reservar')}>
                <Text style={styles.requestButtonText}>Solicitar reserva</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={{ color: '#ff096f', fontSize: 40, fontWeight: '500', marginBottom: 20, marginTop: 50, textAlign: 'center' }}>ReservaFIAP</Text>
            <FlatList
                data={[
                    { id: 'reservadas', title: 'Salas Reservadas:', rooms: SALAS_RESERVADAS, renderRoom: renderReservedItem },
                    { id: 'disponiveis', title: 'Salas para Reservar:', rooms: SALAS_DISPONIVEIS, renderRoom: renderAvailableItem },
                ]}

                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ marginBottom: 24 }}>
                        <Text style={{ color: 'white', fontSize: 20, marginBottom: 10 }}>{item.title}</Text>
                        <FlatList
                            data={item.rooms}
                            renderItem={item.renderRoom}
                            keyExtractor={(room) => room.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingRight: 20 }}
                        />
                    </View>
                )}
                contentContainerStyle={{ paddingBottom: 24 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#252525', paddingHorizontal: 20 },
    item: { padding: 24, borderWidth: 1, borderColor: '#ff096f', borderRadius: 10, marginRight: 12, width: 320 },
    secondaryText: { color: 'gray' },
    requestButton: { marginTop: 14, backgroundColor: '#ff096f', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 16, alignItems: 'center' },
    requestButtonText: { color: 'white', fontWeight: '700' },
});
