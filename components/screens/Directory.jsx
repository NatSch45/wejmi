import { StyleSheet, Image } from "react-native";
import {
    ScrollView,
    Stack,
    KeyboardAvoidingView,
    NativeBaseProvider,
    Heading,
    Center,
    Box,
    HStack,
    Select,
    View,
    IconButton,
    Button,
    Icon,
    Fab,
    Pressable,
    Badge,
    AlertDialog,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect, useRef } from "react";
import * as Crud from "../Crud";

export default function ({ route, navigation }) {
    const routeData = route.params;

    const [fullDataObjects, setFullDataObjects] = useState([]);
    const [objects, setObjects] = useState([]);
    const [alphab, setAlphab] = useState(false);
    const [room, setRoom] = useState("");
    const [category, setCategory] = useState("");
    const [furniture, setFurniture] = useState("");

    const [rooms, setRooms] = useState([]);
    const [categories, setCategories] = useState([]);
    const [furnitures, setFurnitures] = useState([]);

    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const cancel = useRef(null);

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
                setRooms(lists[0]);
                setCategories(lists[1]);
                setFurnitures(lists[2]);
            }
        });
        return () => {
            isMounted = false;
        };
    }, []);

    const saveObjects = async () => {
        let allObjects = await Crud.getAllObjects();
        return allObjects;
    };
    useEffect(() => {
        let isMounted = true;
        saveObjects().then((allObjects) => {
            if (isMounted) {
                setObjects(allObjects);
            }
        });
        return () => {
            isMounted = false;
        };
    }, []);
    useEffect(() => {
        if (fullDataObjects.length === 0) {
            setFullDataObjects(objects);
        }
    }, [objects]);
    useEffect(() => {
        console.log("fullDataObjects : " + fullDataObjects);
    }, [fullDataObjects]);

    const statusObject = async (object) => {
        const statusValue = object.status;
        const id = object.id;

        switch (statusValue) {
            case "PERDU":
                Crud.updateStatusObject(id, "success", "A SA PLACE");
                break;

            case "A SA PLACE":
                Crud.updateStatusObject(id, "info", "DÉPLACÉ TEMPORAIREMENT");
                break;

            case "DÉPLACÉ TEMPORAIREMENT":
                Crud.updateStatusObject(id, "warning", "PERDU");
                break;

            default:
                console.log("ERROR: Wrong status value");
                break;
        }

        saveObjects().then((objects) => {
            setObjects(objects);
        });
        filterObjects();
    };

    //* Filter objects depending to room, furniture, category or alphabetically
    const filterObjects = () => {
        let updatedObjects = fullDataObjects;

        if (alphab) updatedObjects = updatedObjects.sort((objectA, objectB) => {
            const textA = objectA.Name.toUpperCase();
            const textB = objectB.Name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        if (room != "" && room != "Default") {
            updatedObjects = updatedObjects.filter(obj => obj.RoomID == room);
        };
        if (furniture != "" && furniture != "Default") {
            updatedObjects = updatedObjects.filter(obj => obj.FurnitureID == furniture);
        };
        if (category != "" && category != "Default") {
            updatedObjects = updatedObjects.filter(obj => obj.CategoryID == category);
        };
        setObjects(updatedObjects);
    }
    useEffect(() => {
        filterObjects();
    }, [alphab]);
    useEffect(() => {
        filterObjects();
    }, [room]);
    useEffect(() => {
        filterObjects();
    }, [furniture]);
    useEffect(() => {
        filterObjects();
    }, [category]);

    const goToAddObject = () => {
        navigation.navigate("Ajouter un objet");
    };
    const goToPreview = ({ id }) => {
        navigation.navigate("Détail", { id });
    };

    const AddObject = () => {
        return (
            <Center paddingRight={10} paddingBottom={5}>
                <Fab
                    renderInPortal={false}
                    size="sm"
                    onPress={goToAddObject}
                    icon={
                        <Icon
                            color="white"
                            as={MaterialIcons}
                            name="add"
                            size="sm"
                        />
                    }
                />
            </Center>
        );
    };

    if (routeData != undefined) {
        if (routeData.updateData) {
            saveObjects().then((objects) => {
                setObjects(objects);
            });
            routeData.updateData = false;
        }
    }

    // ZONE Render
    return (
        <NativeBaseProvider>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : ""}
                keyboardVerticalOffset={60}
            >
                <Stack
                    marginBottom={5}
                    space={1}
                    style={{ marginTop: 10 }}
                    alignItems="flex-start"
                    w="100%"
                >
                    <Heading style={styles.title}>Annuaires</Heading>
                </Stack>
                <Stack
                    marginBottom={10}
                    space={1}
                    style={{ marginTop: 5 }}
                    alignItems="flex-start"
                    w="100%"
                >
                    <IconButton
                        style={styles.sortAlpha}
                        onPress={() => {
                            let tempAlphab = alphab;
                            setAlphab(!tempAlphab);
                        }}
                        icon={
                            <Icon
                                as={MaterialIcons}
                                size="6"
                                name="sort-by-alpha"
                                color="blue.500"
                            />
                        }
                    ></IconButton>
                </Stack>
                <HStack alignItems="center" style={{ left: 30 }}>
                    <Center h="20">
                        <Select
                            minWidth="100"
                            accessibilityLabel="Room"
                            placeholder="Room"
                            value={room}
                            onValueChange={setRoom}
                            mr={1}
                        >
                            <Select.Item key={0} label={"Default"} value={"Default"}/>
                            {rooms.map((aRoom) => (
                                <Select.Item
                                    key={aRoom.RoomID}
                                    label={aRoom.Name}
                                    value={aRoom.RoomID}
                                />
                            ))}
                        </Select>
                    </Center>
                    <Center h="20">
                        <Select
                            minWidth="100"
                            accessibilityLabel="Furniture"
                            placeholder="Furniture"
                            value={furniture}
                            onValueChange={setFurniture}
                            mr={1}
                        >
                            <Select.Item key={0} label={"Default"} value={"Default"}/>
                            {furnitures.map((aFurniture) => (
                                <Select.Item
                                    key={aFurniture.FurnitureID}
                                    label={aFurniture.Name}
                                    value={aFurniture.FurnitureID}
                                />
                            ))}
                        </Select>
                    </Center>
                    <Center h="20">
                        <Select
                            minWidth="100"
                            accessibilityLabel="Category"
                            placeholder="Category"
                            value={category}
                            onValueChange={setCategory}
                            mr={1}
                        >
                            <Select.Item key={0} label={"Default"} value={"Default"}/>
                            {categories.map((aCategory) => (
                                <Select.Item
                                    key={aCategory.CategoryID}
                                    label={aCategory.Name}
                                    value={aCategory.CategoryID}
                                />
                            ))}
                        </Select>
                    </Center>
                </HStack>

                <ScrollView style={styles.container}>
                    <Stack
                        marginBottom={10}
                        space={1}
                        style={{ marginTop: 10 }}
                        alignItems="center"
                        w="100%"
                    >
                        {/* TEMPLATE FOR DIRECTORY */}
                        {objects.map((object) => (
                            <View style={styles.item} key={object.ObjectID}>
                                <Box>
                                    <Image
                                        source={{
                                            uri: object.Picture,
                                        }}
                                        style={styles.image}
                                    />

                                    <Center alignItems="center">
                                        <Heading
                                            fontSize="2xl"
                                            fontWeight="semibold"
                                            onPress={() =>
                                                goToPreview({
                                                    id: object.ObjectID,
                                                })
                                            }
                                        >
                                            {object.Name}
                                        </Heading>
                                    </Center>
                                    <IconButton
                                        style={styles.icon}
                                        onPress={() => {
                                            setIsOpen(!isOpen);
                                            cancel.current = object.ObjectID;
                                        }}
                                        icon={
                                            <Icon
                                                as={MaterialIcons}
                                                size="6"
                                                name="delete"
                                                color="red.400"
                                            />
                                        }
                                    ></IconButton>
                                    <Pressable
                                        style={styles.badge}
                                        onPress={() =>
                                            statusObject({
                                                id: object.ObjectID,
                                                status: object.Status,
                                                color: object.Color,
                                            })
                                        }
                                    >
                                        <Badge
                                            colorScheme={object.Color}
                                            variant="solid"
                                        >
                                            {object.Status}
                                        </Badge>
                                    </Pressable>
                                </Box>
                                <AlertDialog
                                    leastDestructiveRef={cancel}
                                    isOpen={isOpen}
                                    onClose={onClose}
                                >
                                    <AlertDialog.Content>
                                        <AlertDialog.CloseButton />
                                        <AlertDialog.Header>
                                            Supprimer cet objet ?
                                        </AlertDialog.Header>
                                        <AlertDialog.Body>
                                            Cette action sera irréversible !
                                        </AlertDialog.Body>
                                        <AlertDialog.Footer>
                                            <Button.Group space={2}>
                                                <Button
                                                    variant="unstyled"
                                                    colorScheme="coolGray"
                                                    onPress={onClose}
                                                >
                                                    Annuler
                                                </Button>
                                                <Button
                                                    colorScheme="danger"
                                                    onPress={() => {
                                                        onClose();
                                                        const objectID =
                                                            cancel.current;
                                                        Crud.deleteObject(
                                                            objectID
                                                        );
                                                        saveObjects().then(
                                                            (objects) => {
                                                                setObjects(
                                                                    objects
                                                                );
                                                            }
                                                        );
                                                    }}
                                                >
                                                    Supprimer
                                                </Button>
                                            </Button.Group>
                                        </AlertDialog.Footer>
                                    </AlertDialog.Content>
                                </AlertDialog>
                            </View>
                        ))}
                    </Stack>
                </ScrollView>
                <AddObject></AddObject>
            </KeyboardAvoidingView>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        paddingTop: "8%",
        paddingLeft: "8%",
        fontSize: 35,
    },
    item: {
        width: "90%",
        height: 90,
        backgroundColor: "white",
        borderRadius: 10,
        marginVertical: 10,
        justifyContent: "center",

        // Shadow IOS
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 20 },
        shadowRadius: 10,
        // Shadow Android
        elevation: 5,
    },
    image: {
        marginLeft: 10,
        marginTop: -12,
        width: 50,
        height: 50,
        borderRadius: 50,
        position: "absolute",
    },
    icon: {
        position: "absolute",
        right: 0,
        marginRight: 10,
        marginTop: -7,
        borderRadius: 50,
    },
    badge: {
        position: "absolute",
        right: -5,
        top: -40,
    },
    sortAlpha: {
        position: "absolute",
        left: "45%",
        borderRadius: 50,
    },
});