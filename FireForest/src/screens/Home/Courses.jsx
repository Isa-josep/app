import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'

const Courses = () => {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.title}>Técnicas de Combate de Indencios para Bomberos</Text>
                    <View style={styles.box}>
                        <Text style={styles.date}>15 al 20 de Julio del 2024</Text>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.textButton}>Entrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>Rescate de Indencios Estructurales para Bomberos</Text>
                    <View style={styles.box}>
                        <Text style={styles.date}>10 al 15 de Septiembre del 2024</Text>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.textButton}>Entrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>Gestión de Incidentes Críticos para Bomberos</Text>
                    <View style={styles.box}>
                        <Text style={styles.date}>5 al 9 de Noviembre del 2024</Text>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.textButton}>Entrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Courses

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },  
    section: {
        borderWidth: 1,
        width: '90%',
        height: 150,
        marginTop: 40,
        padding: 12,
        position: 'relative'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    box: {
        flexDirection: 'row',
        marginTop: 70,
    },
    date: {
        color: 'gray',
        fontStyle: 'italic',
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    button: {
        backgroundColor: '#D32F2F',
        height: 25,
        width: '30%',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    textButton: {
        color: 'white'
    }
})