// import Clipboard from '@react-native-clipboard/clipboard';
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const modalContent = ({ title, password, handleClose, handleSave }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {title && <Text style={styles.title}>{title}</Text>}
        <View style={styles.containerPassword}>
          {password && <Text style={styles.password}>{password}</Text>}
          <TouchableOpacity
            style={styles.button}
            onPress={async () => await Clipboard.setStringAsync(password)}
          >
            <Ionicons name='copy' size={24} color='black' />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleClose}>
            <Ionicons name='arrow-back' size={24} color='black' />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleSave}
          >
            <Text style={styles.buttonSaveText}>
              <Ionicons name='save' size={24} color='black' />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default modalContent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(25, 25, 25, 0.6)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "#ffffff",
    height: 300,
    width: "85%",
    paddingVertical: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 24,
  },
  containerPassword: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
  },
  password: {
    textAlign: "center",
  },
  buttonsContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    marginTop: 8,
  },
  button: {
    flex: 1,
    marginVertical: 14,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
  },
  backButton: {
    backgroundColor: "red",
  },
  saveButton: {
    // backgroundColor: "#008577",
  },
  buttonSaveText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});
