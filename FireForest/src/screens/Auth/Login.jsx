import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import React, { useState, useContext } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CredentialsContext } from '../../Components/CredentialsContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");

    const { setStoredCredentials } = useContext(CredentialsContext);

    const handleLogin = async () => {
        if (!email || !password) return setMessage("Llena todos los datos");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return setMessage("Correo no válido");

        if (password.length < 8) return setMessage("La contraseña debe tener al menos 8 carácteres");

        try {
            const response = await axios.post('http://192.168.246.19:3000/login', { email, password });

            if (response.data.success) {
                setStoredCredentials(response.data.user);
                await AsyncStorage.setItem('credentials', JSON.stringify(response.data.user));
                setMessage('Login exitoso');
                navigation.navigate('Home'); // Asumiendo que tienes una pantalla Home a la cual navegar
            } else {
                setMessage('Credenciales incorrectas');
            }
        } catch (error) {
            setMessage('Error al intentar iniciar sesión');
            console.error(error);
        }
    };

    return (
        <KeyboardAwareScrollView style={{ flex: 1 }} resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView>
                    <View style={styles.container}>
                        <Image style={styles.imagen} source={require("../../../assets/adaptive-icon.png")} />
                        <View style={styles.form}>
                            <Text style={styles.errorMessage}>{message}</Text>
                            <View style={styles.section}>
                                <Text style={styles.subtitle}>Correo Electrónico</Text>
                                <TextInput style={styles.input} placeholder="example@domain.com" inputMode={'email'} keyboardType={'email-address'} value={email} onChangeText={setEmail} />
                            </View>
                            <View style={styles.section}>
                                <Text style={styles.subtitle}>Contraseña</Text>
                                <TextInput style={styles.input} placeholder="********" secureTextEntry={true} value={password} onChangeText={setPassword} />
                            </View>
                            <View style={[styles.section, { flexDirection: 'row', justifyContent: "center" }]}>
                                <Text style={styles.forgote}>¿Olvidaste tu contraseña?</Text>
                                <TouchableOpacity onPress={() => console.log('Restablecer contraseña')} style={{ marginLeft: 8 }} >
                                    <Text style={styles.forgotebutton}>Restablecela</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={handleLogin} style={[styles.loginButton, { marginTop: -50 }]}>
                                <Text style={styles.buttonText}>Ingresar</Text>
                            </TouchableOpacity>
                            <View style={[styles.section, { flexDirection: 'row', marginTop: 20, justifyContent: "center" }]}>
                                <Text style={styles.forgote}>¿No tienes cuenta?</Text>
                                <TouchableOpacity onPress={() => navigation.navigate("Register")} style={{ marginLeft: 8 }} >
                                    <Text style={styles.forgotebutton}>Registrate</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    imagen: {
        width: 200,
        height: 200
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 50
    },
    section: {
        width: 300,
        height: 60,
        marginBottom: 50
    },
    subtitle: {
        color: 'gray',
        fontWeight: 'bold',
        fontFamily: 'monospace',
        marginBottom: 10,
        fontSize: 20
    },
    forgote: {
        color: 'gray',
        fontWeight: 'bold',
        fontFamily: 'monospace',
        marginBottom: 10,
        fontSize: 20
    },
    forgotebutton: {
        color: 'red',
        fontStyle: 'italic',
        fontFamily: 'monospace',
        marginBottom: 10,
        fontSize: 20
    },
    form: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        height: 40,
        borderBottomWidth: 0.5,
        fontSize: 18
    },
    loginButton: {
        backgroundColor: 'red',
        width: 300,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    errorMessage: {
        color: 'red',
        marginBottom: 10
    }
});
