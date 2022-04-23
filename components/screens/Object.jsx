import { StyleSheet, Image } from "react-native";
import {
    CheckIcon,
    FormControl,
    Icon,
    ScrollView,
    Select,
    TextArea,
    Stack,
    KeyboardAvoidingView,
    NativeBaseProvider,
    Input,
} from "native-base";
import { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MenuIcon from "../MenuIcon.jsx";
import Add from "../Button.jsx";
import * as Crud from "../Crud.jsx"

export default function Item({ route, navigation }) {
    const routeData = route.params;

    //* Form data
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [room, setRoom] = useState("");
    const [furniture, setFurniture] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");

    const [rooms, setRooms] = useState([]);
    const [categories, setCategories] = useState([]);
    const [furnitures, setFurnitures] = useState([]);

    const saveLists = async () => {
        const allRooms = await Crud.getRooms();
        const allCategories = await Crud.getCategories();
        const allFurnitures = await Crud.getFurnitures();
        return [allRooms, allCategories, allFurnitures];
    }
    useEffect(() => {
        let isMounted = true;
        saveLists().then(lists => {
            if (isMounted) {
                setRooms(lists[0]);
                setCategories(lists[1]);
                setFurnitures(lists[2]);
            }
        });
        return () => { isMounted = false }
    }, []);

    const submitNewObjectForm = async () => {
        if (
            name != "" &&
            description != "" &&
            room != "" &&
            furniture != "" &&
            category != ""
        ) {
            if (image != "") {
                await Crud.insertNewObject(name, description, room, furniture, category, image);
                navigation.navigate("Annuaires", { updateData: true });
            } else {
                alert("Veuillez ajouter une image !");
            }
        } else {
            alert("Veuillez remplir tous les champs !");
        }
    };

    const goToAddSomething = ({ nom, elem }) => {
        navigation.navigate("Ajouter une option", { nom, elem });
    };

    if (routeData != undefined) {
        if (routeData.updateData) {
            saveLists().then(lists => {
                setRooms(lists[0]);
                setCategories(lists[1]);
                setFurnitures(lists[2]);
            });
            routeData.updateData = false;
        }
    }

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
                                value={description}
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
                                {rooms.map((room) => (
                                    <Select.Item
                                        key={room.ID}
                                        label={room.Name}
                                        value={room.ID}
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
                                            elem: "room",
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
                                {furnitures.map((furniture) => (
                                    <Select.Item
                                        key={furniture.ID}
                                        label={furniture.Name}
                                        value={furniture.ID}
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
                                            elem: "furniture"
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
                                value={category}
                                onValueChange={setCategory}
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
                                {categories.map((category) => (
                                    <Select.Item
                                        key={category.ID}
                                        label={category.Name}
                                        value={category.ID}
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
                                            elem: "category",
                                        })
                                    }
                                />
                            </Select>
                        </FormControl>
                        <Add action={submitNewObjectForm}></Add>
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
