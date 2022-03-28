import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { StyleSheet, View } from "react-native";
import Directory from "./components/Screens/Directory";

export default function App() {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Directory />
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {

  },
});
