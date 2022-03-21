import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, Button, useTheme, Box } from "native-base";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Item from "./components/screens/Object.jsx";
import { NativeBaseConfigProvider } from "native-base";

const { Navigator, Screen } = createNativeStackNavigator();

export default function App() {
    const scheme = useColorScheme();
    return (
        <NativeBaseProvider>
            <NavigationContainer>
                <Navigator>
                    <Screen
                        name="Objet"
                        component={Item}
                        options={{
                            headerStyle: { backgroundColor: "#1e90ff" },
                        }}
                    ></Screen>
                </Navigator>
            </NavigationContainer>
            <StatusBar style="auto" />
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
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
