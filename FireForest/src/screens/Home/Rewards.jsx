import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import Icon from "@expo/vector-icons/AntDesign";

import Oxxo from "../../../assets/oxxo.png";
import Soriana from "../../../assets/soriana.png";
import Coppel from "../../../assets/coppel.png";
import Aurrera from "../../../assets/aurrera.png";

const Rewards = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Image source={Oxxo} style={styles.image} resizeMode="contain" />
        <Icon name="right" color="#000" size={20} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Image source={Soriana} style={styles.image} resizeMode="contain" />
        <Icon name="right" color="#000" size={20} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Image source={Coppel} style={styles.image} resizeMode="contain" />
        <Icon name="right" color="#000" size={20} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Image source={Aurrera} style={styles.image} resizeMode="contain" />
        <Icon name="right" color="#000" size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default Rewards;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#e3e3e3",
    width: "80%",
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginTop: 30
  },
  image: {
    width: 100, // Ajusta el ancho de la imagen al 100% del contenedor
    height: "100%",
  },
});
