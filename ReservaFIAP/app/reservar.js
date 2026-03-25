import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Switch, TouchableOpacity, ScrollView, Platform } from 'react-native';

// Cores principais do design
const COLORS = {
  background: '#1c1c1e',
  magenta: '#ff096f',
  inputBackground: '#252525',
  placeholder: '#555555',
  white: '#ffffff',
  grayText: '#8a8a8e',
};

export default function ReservaForm() {
  // Estado para capturar os dados do formulário
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [isPrivada, setIsPrivada] = useState(false);

  const handleEnviar = () => {
    // Lógica para enviar o formulário (ex: API call)
    console.log('Dados Enviados:', { titulo, descricao, data, horario, isPrivada });
    alert('Solicitação Enviada!');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Título Principal */}
      <Text style={styles.mainTitle}>ReservaFIAP</Text>

      {/* Seção da Sala */}
      <Text style={styles.sectionTitle}>Reservar:</Text>
      <View style={styles.salaInfo}>
        <Text style={styles.salaLabel}>Sala 110</Text>
        <Text style={styles.salaDetail}>Unidade: Paulista</Text>
        <Text style={styles.salaDetail}>1º andar</Text>
      </View>

      {/* Input de Título */}
      <View style={styles.inputGroup}>
        <Text style={styles.fieldLabel}>Titulo:</Text>
        <TextInput
          style={styles.inputSingle}
          value={titulo}
          onChangeText={setTitulo}
          placeholderTextColor={COLORS.placeholder}
        />
      </View>

      {/* Input de Descrição */}
      <View style={styles.inputGroup}>
        <Text style={styles.fieldLabel}>Descrição:</Text>
        <TextInput
          style={[styles.inputSingle, styles.inputMultiline]}
          value={descricao}
          onChangeText={setDescricao}
          placeholderTextColor={COLORS.placeholder}
          multiline={true}
          numberOfLines={6}
          textAlignVertical="top"
        />
      </View>

      {/* Data e Horário */}
      <View style={[styles.inputGroup, styles.rowInputGroup]}>
        <Text style={styles.fieldLabel}>Data:</Text>
        <TextInput
          style={[styles.inputSingle, styles.inlineInput]}
          value={data}
          onChangeText={setData}
          keyboardType="numeric"
          placeholder="DD/MM/AAAA"
          placeholderTextColor={COLORS.placeholder}
        />
      </View>

      <View style={[styles.inputGroup, styles.rowInputGroup, { marginTop: 8 }]}>
        <Text style={styles.fieldLabel}>Horário:</Text>
        <TextInput
          style={[styles.inputSingle, styles.inlineInput]}
          value={horario}
          onChangeText={setHorario}
          keyboardType="numeric"
          placeholder="HH:MM"
          placeholderTextColor={COLORS.placeholder}
        />
      </View>

      {/* Switchzinho Sala Privada */}
      <View style={styles.switchContainer}>
        <Text style={styles.fieldLabel}>Sala privada:</Text>
        <Switch
          trackColor={{ false: COLORS.inputBackground, true: COLORS.magenta }}
          thumbColor={Platform.OS === 'ios' ? undefined : (isPrivada ? COLORS.magenta : '#f4f3f4')}
          ios_backgroundColor={COLORS.inputBackground}
          onValueChange={() => setIsPrivada(previousState => !previousState)}
          value={isPrivada}
        />
      </View>

      {/* Botão Enviar */}
      <TouchableOpacity style={styles.submitButton} onPress={handleEnviar}>
        <Text style={styles.submitButtonText}>Enviar solicitação</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 30,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.magenta,
    textAlign: 'center',
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 10,
  },
  salaInfo: {
    marginBottom: 30,
  },
  salaLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
  },
  salaDetail: {
    fontSize: 14,
    color: COLORS.grayText,
    marginTop: 2,
  },
  inputGroup: {
    marginBottom: 20,
  },
  rowInputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  fieldLabel: {
    fontSize: 16,
    color: COLORS.white,
    marginRight: 10, 
    marginBottom: Platform.OS === 'ios' ? 8 : 4,
  },
  inputSingle: {
    height: 48,
    backgroundColor: COLORS.inputBackground,
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    color: COLORS.white,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  inputMultiline: {
    height: 140,
    paddingTop: 16,
  },
  inlineInput: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: COLORS.magenta,
    borderRadius: 0,
    paddingHorizontal: 0,
    minWidth: 100,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  submitButton: {
    height: 54,
    backgroundColor: COLORS.magenta,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.magenta,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },
});