import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { View } from "react-native";
import Directory from "./components/Screens/Directory";

export default function App() {
  return (
    <NativeBaseProvider>
      <View>
        <StatusBar style="auto" />
        <Directory />
      </View>
    </NativeBaseProvider>
  );
};
