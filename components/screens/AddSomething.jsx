import { StyleSheet } from "react-native";
import {
    ScrollView,
    Heading,
} from "native-base";
import { useState } from "react";
import {
    NativeBaseProvider,
    Input,
    Stack,
    KeyboardAvoidingView,
} from "native-base";
import Add from "../Button.jsx";
import * as Crud from "../Crud.jsx";

export default function AddSomething({ route, navigation }) {
    const data = route.params;
    const [name, setName] = useState("");

    const saveAndGoBack = () => {
        if (name != "") {
            switch (data.elem) {
                case "room":
                    Crud.insertNewRoom(name);
                    break;

                case "furniture":
                    Crud.insertNewFurniture(name);
                    break;

                case "category":
                    Crud.insertNewCategory(name);
                    break;
            
                default:
                    alert("Erreur");
                    break;
            }
            navigation.navigate("Ajouter un objet", { updateData: true });
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
                        <Add action={saveAndGoBack} label={"Ajouter"}></Add>
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
