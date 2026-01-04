import Slider from "@react-native-community/slider";
import * as FileSystem from "expo-file-system";
import { useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import "react-native-get-random-values";
import { SafeAreaView } from "react-native-safe-area-context";
import ModalContent from "../../components/modalContent";

const FILE_PATH = FileSystem.documentDirectory + "passwords.json";

const characterSets = {
  lowercase: { value: "abcdefghijklmnopqrstuvwxyz", name: "LOWER CASE" },
  uppercase: { value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", name: "UPPER CASES" },
  digits: { value: "0123456789", name: "DIGITS" },
  special: { value: "!@#$%^&*()_+[]{}|;:,.<>?", name: "SPECIAL" },
};

const Home = () => {
  const [textButton, setTextButton] = useState("GENERATE");
  const [size, setSize] = useState(10);
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSets, setSelectedSets] = useState({
    lowercase: true,
    uppercase: true,
    digits: true,
    special: true,
  });

  const handleGenerateSecurePassword = () => {
    const sets = Object.keys(selectedSets).filter((set) => selectedSets[set]);
    var characters = "";

    for (const setName of sets) {
      characters += characterSets[setName].value;
    }

    const length = characters.length;
    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);
    var password = "";

    for (var i = 0; i < size; i++) {
      const randomIndex = randomValues[i] % length;
      password += characters.charAt(randomIndex);
    }
    setPassword(password);
    setModalVisible(true);
    setTextButton("GENERATE AGAIN");
  };

  const handleSwitchChange = (setName) => {
    setSelectedSets({ ...selectedSets, [setName]: !selectedSets[setName] });
  };

  const savePassword = async (password) => {
    console.log(password);
    try {
      let passwords = [];
      const fileInfo = await FileSystem.getInfoAsync(FILE_PATH);
      if (fileInfo.exists) {
        const jsonString = await FileSystem.readAsStringAsync(FILE_PATH);
        passwords = JSON.parse(jsonString);
      }
      // const describe = `passwords: ${passwords.length + 1}`
      passwords.push({ describe: "password", password });
      await FileSystem.writeAsStringAsync(
        FILE_PATH,
        JSON.stringify(passwords, null, 2)
      );
      setModalVisible(false);
      console.log("Senha salva com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar senhas:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Password Generator</Text>
      <Image style={styles.logo} source={require("../../assets/lock.png")} />
      <Text style={styles.title}> {size} characters</Text>
      <View style={styles.containerSlider}>
        <Slider
          style={styles.slider}
          minimumValue={8}
          maximumValue={30}
          minimumTrackTintColor='#B49E67'
          maximumTrackTintColor='#BBBBBB'
          value={size}
          onValueChange={(value) => setSize(parseInt(value))}
        />
      </View>
      <View style={styles.switchContainer}>
        {Object.keys(selectedSets).map((setName) => (
          <View key={setName} style={styles.switchRow}>
            <Text>{characterSets[setName].name}</Text>
            <Switch
              value={selectedSets[setName]}
              onValueChange={() => handleSwitchChange(setName)}
            />
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleGenerateSecurePassword}
      >
        <Text style={styles.textButton}>{textButton}</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType='fade' transparent={true}>
        <ModalContent
          title='Password'
          password={password}
          handleClose={() => setModalVisible(false)}
          handleSave={() => savePassword(password)}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3FF",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    marginBottom: 60,
  },
  title: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  containerSlider: {
    height: 50,
    width: "80%",
    marginBottom: 20,
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#FFFFFF",
  },
  slider: {
    height: 50,
  },
  textButton: {
    color: "#fff",
    fontSize: 20,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    width: "80%",
    padding: 8,
    marginBottom: 20,
  },
  switchRow: {
    width: "50%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  button: {
    height: 50,
    width: "80%",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#008577",
  },
});
