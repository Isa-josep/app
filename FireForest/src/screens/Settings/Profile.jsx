import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";

const Profile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Nombre:</Text>
        <TextInput style={styles.input} placeholder="Brandon Servin" />
        <Text style={styles.subtitle}>Correo Electrónico</Text>
        <TextInput style={styles.input} placeholder="example@domain.com" />
        <Text style={styles.subtitle}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="*******"
          secureTextEntry={true}
        />
        <Text style={styles.subtitle}>Repite la Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="*******"
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.pop()}
        >
          <Text style={styles.text}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 30,
  },
  section: {
    width: 300,
    marginBottom: 20,
  },
  subtitle: {
    color: "black",
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 20,
  },
  input: {
    width: "100%",
    height: 60,
    borderColor: "gray",
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: 15,
    padding: 10,
  },
  button: {
    backgroundColor: "red",
    paddingHorizontal: 100,
    paddingVertical: 20,
    borderRadius: 20,
    marginTop: 50,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
},
});
