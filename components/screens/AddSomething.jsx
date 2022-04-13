import { StyleSheet, Image } from "react-native";
import {
    CheckIcon,
    FormControl,
    Icon,
    ScrollView,
    Select,
    TextArea,
    useTheme,
    Text,
    Heading,
} from "native-base";
import { useState, useEffect } from "react";
import {
    NativeBaseProvider,
    Input,
    Button,
    View,
    Stack,
    KeyboardAvoidingView,
} from "native-base";
import Add from "../Button.jsx";

import * as FileSystem from "expo-file-system";

export default function AddSomething({ route, navigation }) {
    const data = route.params;
    const [name, setName] = useState("");

    const saveAndGoBack = () => {
        console.log(name);
        if (name != "") {
            navigation.navigate("Ajouter un objet", name);
        } else {
            alert("Veuillez entrer un nom");
        }
    };

    return (
        <NativeBaseProvider>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : ""}
                keyboardVerticalOffset={60}
            >
                <ScrollView style={styles.container}>
                    <Stack
                        marginBottom={10}
                        space={1}
                        style={{ marginTop: 10 }}
                        alignItems="center"
                        w="100%"
                    >
                        <Heading style={styles.title}>{data.nom}</Heading>
                    </Stack>
                    <Stack space={4} alignItems="center" w="100%">
                        <Input
                            size="lg"
                            variant="underlined"
                            placeholder="Nom"
                            borderColor="blue.400"
                            value={name}
                            onChangeText={(name) => setName(name)}
                            w="75%"
                        ></Input>
                        <Add action={saveAndGoBack}></Add>
                    </Stack>
                </ScrollView>
            </KeyboardAvoidingView>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    title: {
        paddingTop: "55%",
        fontSize: 40,
    },
    container: {
        flex: 1,
    },
});
