import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";
import axios from "axios";
import { uri } from "../../Shared/uri";
import * as FileSystem from "expo-file-system";

const Report = ({ navigation }) => {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [photoBase64, setPhotoBase64] = useState(null);
  const [modal, setModal] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      const base64Image = await FileSystem.readAsStringAsync(photo.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setPhotoBase64(base64Image);
      setPhotoUri(photo.uri);
    }
  };

  const handleSubmit = async () => {
    const url = `${uri}/predict`;
    await axios.post(url, { image: photoBase64 }).then((response) => {
      const { status, message } = response.data;


    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}
            >
              Detalles de Ubicación
            </Text>
            <View style={styles.locationContainer}>
              <Text style={styles.locationText}>
                Latitud: {location && location.coords.latitude}
              </Text>
              <Text style={styles.locationText}>
                Longitud: {location && location.coords.longitude}
              </Text>
              <Text style={styles.locationText}>
                Precisión: {location && location.coords.accuracy} metros
              </Text>
              <Text style={styles.locationText}>
                Altitud: {location && location.coords.altitude} metros
              </Text>
              <Text style={styles.locationText}>
                Precisión de Altitud:{" "}
                {location && location.coords.altitudeAccuracy} metros
              </Text>
              <Text style={styles.locationText}>
                Velocidad: {location && location.coords.speed} m/s
              </Text>
              <Text style={styles.locationText}>
                Dirección: {location && location.coords.heading} grados
              </Text>
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModal(!modal)}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.container}>
        {!photoUri ? (
          <>
            <CameraView style={styles.camera} type={facing} ref={cameraRef} />
            <Text style={styles.paragraph}>
              Se recopilará la ubicación de donde se tomó la foto para poder
              generar el informe
            </Text>
            {location ? (
              <TouchableOpacity
                style={styles.captureButton}
                onPress={takePicture}
              >
                <Text style={styles.buttonText}>Tomar foto</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.captureButton, { backgroundColor: "#3f0098" }]}
                disabled={true}
              >
                <ActivityIndicator size={"small"} />
              </TouchableOpacity>
            )}
          </>
        ) : (
          <>
            <Text style={styles.title}>¿Enviar Foto?</Text>
            <Image source={{ uri: photoUri }} style={styles.preview} />

            <View>
              <TouchableOpacity
                style={{ marginTop: 10 }}
                onPress={() => setModal(true)}
              >
                <Text style={{ color: "blue" }}>Ver detalles de ubicación</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonOpen}
                onPress={handleSubmit}
              >
                <Text style={{ color: "#0038b2", fontWeight: "bold" }}>
                  Enviar Foto
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.buttonOpen,
                  { marginTop: 15, borderColor: "red" },
                ]}
                onPress={async () => {
                  setPhotoUri(null);
                  setLocation(null);
                  let location = await Location.getCurrentPositionAsync({});
                  setLocation(location);
                }}
              >
                <Text style={{ color: "red", fontWeight: "bold" }}>
                  Volver a Tomar
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Report;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  camera: {
    width: "80%",
    height: "50%",
    marginTop: 30,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  paragraph: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 40,
  },
  preview: {
    width: "80%",
    height: "50%",
    marginTop: 20,
  },
  captureButton: {
    backgroundColor: "#6200EE",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: "30%",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#0038b2",
    width: 200,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginTop: 40,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginTop: 20,
    width: 100,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
