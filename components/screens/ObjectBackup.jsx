import { StyleSheet, Image } from "react-native";
import {
    CheckIcon,
    FormControl,
    Icon,
    ScrollView,
    Select,
    TextArea,
    useTheme,
    Stack,
    KeyboardAvoidingView,
    NativeBaseProvider,
    Input,
} from "native-base";
import { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MenuIcon from "../MenuIcon.jsx";
import Add from "../Button.jsx";
import * as FileSystem from "expo-file-system";
import * as Crud from "../Crud.jsx"

const fileURI = FileSystem.documentDirectory + "image.json";

const createFile = async (form) => {
    await FileSystem.writeAsStringAsync(fileURI, JSON.stringify(form));
};

const fileExists = async (uri) => {
    return (await FileSystem.getInfoAsync(uri)).exists;
};

export default function Item({ navigation }) {
    const { colors } = useTheme();
    const [name, setName] = useState("");
    const [desription, setDescription] = useState("");
    const [room, setRoom] = useState("");
    const [furniture, setFurniture] = useState("");
    const [categorie, setCategorie] = useState("");
    const [image, setImage] = useState("");

    const [form, setForm] = useState([]);

    const readFile = async () => {
        if (await fileExists(fileURI)) {
            const content = await FileSystem.readAsStringAsync(fileURI);
            setForm(JSON.parse(content));
            /* console.log(JSON.parse(content)); */
        }
    };
    useEffect(() => {
        readFile();
    }, []);

    const saveForm = async () => {
        if (
            name != "" &&
            desription != "" &&
            room != "" &&
            furniture != "" &&
            categorie != ""
        ) {
            if (image != "") {
                const newForm = [
                    ...form,
                    {
                        Nom: name,
                        Description: desription,
                        Pièce: room,
                        Meuble: furniture,
                        Catégorie: categorie,
                        Image: image,
                    },
                ];
                setForm(newForm);
                createFile(newForm);
            } else {
                alert("Veuillez ajouter une image !");
            }
        } else {
            alert("Veuillez remplir tous les champs !");
        }
        /* console.log("Saving form");
        console.log(
            `Nom : ${name} | Description : ${desription} | Pièce : ${room} | Meuble : ${furniture} | Catégorie : ${categorie} | Image : ${image}`
        ); */
    };

    const goToAddSomething = ({ nom }) => {
        navigation.navigate("Ajouter une option", { nom });
    };

    const listRoom = [
        {
            id: 1,
            label: "Chambre",
            value: "Chambre",
        },
        {
            id: 2,
            label: "Cuisine",
            value: "Cuisine",
        },
        {
            id: 3,
            label: "Salle de bain",
            value: "Salle de bain",
        },
        {
            id: 4,
            label: "Salle à manger",
            value: "Salle à manger",
        },
        {
            id: 5,
            label: "Jardin",
            value: "Jardin",
        },
    ];

    const listFurniture = [
        {
            id: 1,
            label: "Armoire",
            value: "Armoire",
        },
        {
            id: 2,
            label: "Placard",
            value: "Placard",
        },
    ];

    const listCategorie = [
        {
            id: 1,
            label: "Outil",
            value: "Outil",
        },
        {
            id: 2,
            label: "Documents",
            value: "Documents",
        },
    ];

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
                        style={
                            image == "" ? { marginTop: 70 } : { marginTop: 10 }
                        }
                        alignItems="center"
                        w="100%"
                    >
                        {image != "" && (
                            <Image
                                source={{
                                    uri: image,
                                }}
                                style={styles.image}
                            ></Image>
                        )}
                        <Input
                            size="xl"
                            variant="underlined"
                            placeholder="Nom"
                            borderColor="blue.400"
                            value={name}
                            onChangeText={(name) => {
                                setName(name);
                            }}
                            w="75%"
                        />
                    </Stack>
                    <Stack space={4} alignItems="center" w="100%">
                        <FormControl
                            w="3/4"
                            maxW="300"
                            style={styles.spaceBetween}
                            isRequired
                        >
                            <FormControl.Label>
                                Compartiment 
                            </FormControl.Label>
                            <TextArea
                                h={20}
                                placeholder="Description"
                                maxW="300"
                                value={desription}
                                onChangeText={setDescription}
                            />
                        </FormControl>

                        <FormControl
                            style={styles.spaceBetween}
                            w="3/4"
                            maxW="300"
                            isRequired
                        >
                            <FormControl.Label>Pièce</FormControl.Label>
                            <Select
                                minWidth="200"
                                accessibilityLabel="Choisir la pièce"
                                placeholder="Choisir la pièce"
                                value={room}
                                onValueChange={setRoom}
                                dropdownIcon={
                                    <Icon
                                        as={MaterialCommunityIcons}
                                        size="6"
                                        name="chevron-down"
                                        color="blue.400"
                                        _dark={{
                                            color: "warmGray.50",
                                        }}
                                    />
                                }
                                _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size={5} />,
                                }}
                                mt="1"
                            >
                                {listRoom.map((item) => (
                                    <Select.Item
                                        key={item.id}
                                        label={item.label}
                                        value={item.value}
                                    />
                                ))}
                                <Select.Item
                                    label="Ajouter une pièce..."
                                    value="Ajouter une pièce..."
                                    borderRadius="md"
                                    borderWidth="1"
                                    borderColor="#00AFC1"
                                    bgColor="#00AFC1"
                                    onPress={() =>
                                        goToAddSomething({
                                            nom: "Ajouter une pièce :",
                                        })
                                    }
                                />
                            </Select>
                        </FormControl>
                        <FormControl
                            w="3/4"
                            maxW="300"
                            style={styles.spaceBetween}
                            isRequired
                        >
                            <FormControl.Label>Meuble</FormControl.Label>
                            <Select
                                minWidth="200"
                                accessibilityLabel="Choisir le meuble"
                                placeholder="Choisir le meuble"
                                value={furniture}
                                onValueChange={setFurniture}
                                dropdownIcon={
                                    <Icon
                                        as={MaterialCommunityIcons}
                                        size="6"
                                        name="chevron-down"
                                        color="blue.400"
                                        _dark={{
                                            color: "warmGray.50",
                                        }}
                                    />
                                }
                                _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size={5} />,
                                }}
                                mt="1"
                            >
                                {listFurniture.map((item) => (
                                    <Select.Item
                                        key={item.id}
                                        label={item.label}
                                        value={item.value}
                                    />
                                ))}
                                <Select.Item
                                    label="Ajouter un meuble..."
                                    value="Ajouter un meuble..."
                                    borderRadius="md"
                                    borderWidth="1"
                                    borderColor="#00AFC1"
                                    bgColor="#00AFC1"
                                    onPress={() =>
                                        goToAddSomething({
                                            nom: "Ajouter un meuble :",
                                        })
                                    }
                                />
                            </Select>
                        </FormControl>
                        <FormControl
                            w="3/4"
                            maxW="300"
                            style={styles.spaceBetween}
                            isRequired
                        >
                            <FormControl.Label>Catégorie</FormControl.Label>
                            <Select
                                minWidth="200"
                                value={categorie}
                                onValueChange={setCategorie}
                                dropdownIcon={
                                    <Icon
                                        as={MaterialCommunityIcons}
                                        size="6"
                                        name="chevron-down"
                                        color="blue.400"
                                        _dark={{
                                            color: "warmGray.50",
                                        }}
                                    />
                                }
                                accessibilityLabel="Choisir la catégorie"
                                placeholder="Choisir la catégorie"
                                _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size={5} />,
                                }}
                                mt="1"
                            >
                                {listCategorie.map((item) => (
                                    <Select.Item
                                        key={item.id}
                                        label={item.label}
                                        value={item.value}
                                    />
                                ))}
                                <Select.Item
                                    label="Ajouter une catégorie..."
                                    value="Ajouter une catégorie..."
                                    borderRadius="md"
                                    borderWidth="1"
                                    borderColor="#00AFC1"
                                    bgColor="#00AFC1"
                                    onPress={() =>
                                        goToAddSomething({
                                            nom: "Ajouter une catégorie :",
                                        })
                                    }
                                />
                            </Select>
                        </FormControl>
                        <Add action={saveForm}></Add>
                    </Stack>
                    <MenuIcon onImageChosen={setImage}></MenuIcon>
                </ScrollView>
            </KeyboardAvoidingView>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 200,
    },
    spaceBetween: {
        marginBottom: 25,
    },
    button: {
        flex: 1,
    },
    image: {
        paddingTop: 15,
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    text: {
        fontSize: 20,
    },
});
