import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, Button, useTheme, Box } from "native-base";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Object from "./components/screens/Object.jsx";
import Register from "./components/screens/Register.jsx";
import Login from "./components/screens/Login.jsx";
import Index from "./components/screens/Index.jsx";
import AddSomething from "./components/screens/AddSomething.jsx";
import Directory from "./components/screens/Directory.jsx";
import Preview from "./components/screens/Preview.jsx";
import { extendTheme } from "native-base";
import * as Crud from "./components/Crud";

/* Crud.dropObjectsTable();
Crud.dropRoomsTable();
Crud.dropFurnituresTable();
Crud.dropCategoriesTable();
Crud.deleteAllAccounts(); */

Crud.createAccountsTable();
Crud.createRoomsTable();
Crud.createFurnituresTable();
Crud.createCategoriesTable();
Crud.createObjectsTable();

const { Navigator, Screen } = createNativeStackNavigator();

export default function App() {
    const scheme = useColorScheme();
    return (
        <NativeBaseProvider theme={theme}>
            <NavigationContainer>
                <Navigator>
                    <Screen
                        name="Index"
                        component={Index}
                        options={{
                            headerStyle: { backgroundColor: "#1e90ff" },
                        }}
                    />
                    <Screen
                        name="Register"
                        component={Register}
                        options={{
                            headerStyle: { backgroundColor: "#1e90ff" },
                        }}
                    />
                    <Screen
                        name="Log In"
                        component={Login}
                        options={{
                            headerStyle: { backgroundColor: "#1e90ff" },
                        }}
                    />
                    <Screen
                        name="Ajouter un objet"
                        component={Object}
                        options={({ route }) => {
                            return {
                                headerStyle: { backgroundColor: "#1e90ff" },
                            };
                        }}
                    />
                    <Screen
                        name="Ajouter une option"
                        component={AddSomething}
                        options={({ route }) => {
                            return {
                                title: route.params.nom,
                                headerStyle: { backgroundColor: "#1e90ff" },
                            };
                        }}
                    />
                    <Screen
                        name="Annuaires"
                        component={Directory}
                        options={({ route }) => {
                            return {
                                headerStyle: { backgroundColor: "#1e90ff" },
                            };
                        }}
                    />
                    <Screen
                        name="Détail"
                        component={Preview}
                        options={{
                            headerStyle: { backgroundColor: "#1e90ff" },
                        }}
                    />
                </Navigator>
            </NavigationContainer>
            <StatusBar style="auto" />
        </NativeBaseProvider>
    );
}

const theme = extendTheme({
    components: {
        View: {
            variants: {
                container: () => {
                    return {
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    };
                },
            },
        },
        Text: {
            baseStyle: {
                // default style for entire app
            },
            variants: {
                // Exemple de déclaration de variants :
                subText: () => {
                    return {
                        marginTop: 30,
                        color: "#787878",
                        fontSize: 16,
                    };
                },
            },
        },
    },
});
