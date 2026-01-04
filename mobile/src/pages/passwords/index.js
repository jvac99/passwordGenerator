import * as FileSystem from "expo-file-system";
import { useEffect, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FILE_PATH = FileSystem.documentDirectory + "passwords.json";

const Passwords = () => {
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    loadPasswords();
  }, []);

  const loadPasswords = async () => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(FILE_PATH);
      if (!fileInfo.exists) {
        setPasswords([]);
      } else {
        const jsonString = await FileSystem.readAsStringAsync(FILE_PATH);
        setPasswords(JSON.parse(jsonString));
        console.log(jsonString);
      }
    } catch (error) {
      console.error("Erro ao carregar senhas:", error);
    }
  };

  // const deletePassword = async (password) => {
  //     Alert.alert(
  //         "Confirmação",
  //         "Tem certeza que deseja excluir essa senha?",
  //         [
  //             { text: "Cancelar", style: "cancel" },
  //             {
  //                 text: "Excluir", onPress: async () => {
  //                     try {
  //                         const newPasswords = passwords.filter((_, i) => i !== index);
  //                         await RNFS.writeFile(FILE_PATH, JSON.stringify(newPasswords, null, 2), 'utf8');
  //                         setPasswords(newPasswords);
  //                     } catch (error) {
  //                         console.error('Erro ao excluir senha:', error);
  //                     }
  //                 }
  //             }
  //         ]
  //     );
  // }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{passwords.length} generated passwords</Text>
      <FlatList
        data={passwords}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item: { describe, password } }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{describe}</Text>
            <Text style={styles.text}>{password}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.textButton}>deletePassword</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Passwords;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3FF",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  text: {
    fontSize: 32,
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
