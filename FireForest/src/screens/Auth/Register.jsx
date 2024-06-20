import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
    const navigation = useNavigation();
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async () => {
        if (!nombre || !email || !password || !confirmPassword) return setMessage('Llena todos los datos');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return setMessage('Correo no válido');

        if (password.length < 8) return setMessage('La contraseña debe tener al menos 8 carácteres');

        if (password !== confirmPassword) return setMessage('Las contraseñas no coinciden');

        try {
            const response = await axios.post('http://192.168.246.19:3000/register', { nombre, email, password });

            if (response.data.success) {
                setMessage('Registro exitoso');
                navigation.navigate('Login');
            } else {
                setMessage('Error en el registro');
            }
        } catch (error) {
            setMessage('Error al intentar registrar');
            console.error(error);
        }
    };

    return (
        <KeyboardAwareScrollView style={{ flex: 1 }} resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView>
                    <View style={styles.container}>
                        <Text style={styles.errorMessage}>{message}</Text>
                        <View style={styles.section}>
                            <Text style={styles.subtitle}>Nombre:</Text>
                            <TextInput style={styles.input} placeholder="Brandon Servin" value={nombre} onChangeText={setNombre} />
                            <Text style={styles.subtitle}>Correo Electrónico</Text>
                            <TextInput style={styles.input} placeholder="example@domain.com" value={email} onChangeText={setEmail} />
                            <Text style={styles.subtitle}>Contraseña</Text>
                            <TextInput style={styles.input} placeholder="*******" secureTextEntry={true} value={password} onChangeText={setPassword} />
                            <Text style={styles.subtitle}>Repite la Contraseña</Text>
                            <TextInput style={styles.input} placeholder="*******" secureTextEntry={true} value={confirmPassword} onChangeText={setConfirmPassword} />
                            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                                <Text style={styles.text}>Continuar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    );
};

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    section: {
        width: 300,
        marginBottom: 20,
    },
    subtitle: {
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 20
    },
    input: {
        width: '100%',
        height: 60,
        borderColor: 'gray',
        borderBottomWidth: 1,
        marginBottom: 20,
        fontSize: 15,
        padding: 10,
    },
    button: {
        backgroundColor: 'red',
        paddingHorizontal: 100,
        paddingVertical: 20,
        borderRadius: 20,
        marginTop: 50
    },
    text: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    errorMessage: {
        color: 'red',
        marginBottom: 10
    }
});
