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
    useTheme,
} from "native-base";
import { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MenuIcon from "../MenuIcon.jsx";
import Update from "../Button.jsx";
import * as Crud from "../Crud";

export default function Item({ route, navigation }) {
    const data = route.params;
    const [object, changeObject] = useState([]);
    const saveObject = async () => {
        let oneObject = await Crud.getObject(data.id);
        return oneObject[0];
    };
    useEffect(() => {
        let isMounted = true;
        saveObject().then((oneObject) => {
            if (isMounted) changeObject(oneObject);
        });
        return () => {
            isMounted = false;
        };
    }, []);

    const { colors } = useTheme();
    const routeData = route.params;

    //* Form data
    const [name, changeName] = useState("");
    const [description, changeDescription] = useState("");
    const [room, changeRoom] = useState("");
    const [furniture, changeFurniture] = useState("");
    const [category, changeCategory] = useState("");
    const [image] = useState("");

    const [rooms, changeRooms] = useState([]);
    const [categories, changeCategories] = useState([]);
    const [furnitures, changeFurnitures] = useState([]);

    const saveLists = async () => {
        const allRooms = await Crud.getRooms();
        const allCategories = await Crud.getCategories();
        const allFurnitures = await Crud.getFurnitures();
        return [allRooms, allCategories, allFurnitures];
    };
    useEffect(() => {
        let isMounted = true;
        saveLists().then((lists) => {
            if (isMounted) {
                changeRooms(lists[0]);
                changeCategories(lists[1]);
                changeFurnitures(lists[2]);
            }
        });
        return () => {
            isMounted = false;
        };
    }, []);

    const submitModifyObjectForm = async (objectID) => {
        if (
            name != "" &&
            description != "" &&
            room != "" &&
            furniture != "" &&
            category != ""
        ) {
        } else {
            alert("Veuillez remplir tous les champs !");
        }
    };

    const goToAddSomething = ({ nom, elem }) => {
        navigation.navigate("Ajouter une option", { nom, elem });
    };

    if (routeData != undefined) {
        if (routeData.updateData) {
            saveLists().then((lists) => {
                changeRooms(lists[0]);
                changeCategories(lists[1]);
                changeFurnitures(lists[2]);
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
                            <Image
                                source={{
                                    uri: object.Picture,
                                }}
                                style={styles.image}
                            ></Image>
                        <Input
                            size="xl"
                            variant="underlined"
                            placeholder="Nom"
                            borderColor="blue.400"
                            value={name}
                            onChangeText={(name) => {
                                changeName(name);
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
                            <FormControl.Label>Compartiment</FormControl.Label>
                            <TextArea
                                h={20}
                                placeholder="Description"
                                maxW="300"
                                value={description}
                                onChangeText={changeDescription}
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
                                onValueChange={changeRoom}
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
                                        key={room.RoomID}
                                        label={room.Name}
                                        value={room.RoomID}
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
                                onValueChange={changeFurniture}
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
                                        key={furniture.FurnitureID}
                                        label={furniture.Name}
                                        value={furniture.FurnitureID}
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
                                            elem: "furniture",
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
                                onValueChange={changeCategory}
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
                                        key={category.CategoryID}
                                        label={category.Name}
                                        value={category.CategoryID}
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
                        <Update action={submitModifyObjectForm} label="Modifier"></Update>
                    </Stack>
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
