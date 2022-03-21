import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Register from "./components/screens/Register";
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { NativeBaseProvider, extendTheme } from "native-base";

export default function App() {

    return (
        <NativeBaseProvider theme={theme}>
            <Register />
            <StatusBar style="auto" />
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
		alignItems: "stretch",
		justifyContent: "flex-start",
		backgroundColor: "#fff",
        padding: 10,
    },
});

const theme = extendTheme({
    components: {
        Text: {
            baseStyle: {
                // default style for entire app
            },
            variants: { // Exemple de déclaration de variants :
            //     subText: () => {
            //         return {
            //             color: '#787878',
            //             fontSize: 'sm'
            //         }
            //     }
            }
        }
    }
})
