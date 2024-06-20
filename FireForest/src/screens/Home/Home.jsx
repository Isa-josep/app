import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons'; // Utiliza @expo/vector-icons si estás usando Expo
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';

function Home({ navigation }) {

  return (
    <ScrollView>

      <View style={styles.container}>
        <Image style={styles.imagen} source={require('../../../assets/adaptive-icon.png')} />
        <Text style={styles.subtitle}>Bienvenido!</Text>
        <TouchableOpacity style={styles.ReportButton} onPress={() => navigation.navigate('Report')}>
          <Text style={styles.ReportbuttonText}>Reportar Incendio</Text>
        </TouchableOpacity>
        <View style={styles.viewgris}>
          <Ionicons name="information-circle-outline" style={styles.icono} color="black" size={30} />
          <View style={styles.viewtrans}>
            <Text style={styles.noti}>Recuerda que en caso de enviar un reporte falso, serás sancionado</Text>
          </View>
        </View>
      </View>
      
    </ScrollView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
  },
  imagen: {
    width: 300,
    height: 300,
    marginTop: 50,
  },
  subtitle: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    fontSize: 50,
  },
  ReportButton: {
    backgroundColor: 'red',
    width: 300,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 50,
  },
  ReportbuttonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  viewgris: {
    backgroundColor: 'lightgray',
    width: 290,
    height: 200,
    marginTop: 50,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 50
  },
  noti: {
    fontSize: 20,
    textAlign: 'center',
  },
  viewtrans: {
    backgroundColor: 'transparent',
    width: 200,
    height: 100,
    marginTop: 10,
    alignItems: 'center',
  },
  icono: {
    position: 'absolute',
    top: 10,
    left: 10
  }
});
