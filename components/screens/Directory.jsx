import { StyleSheet, Image } from "react-native";
import React from "react";
import {
    ScrollView,
    Stack,
    KeyboardAvoidingView,
    NativeBaseProvider,
    Heading,
    Center,
    Box,
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
import { useState, useEffect } from "react";
import * as Crud from "../Crud";

export default function ({ route, navigation }) {
    const routeData = route.params;

    const [objects, setObjects] = useState([]);

    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const cancel = React.useRef(null);

    const statusObject = async (value) => {
        const statusValue = value.status;
        const id = value.id;
        if (statusValue == "PERDU") {
            let updateObject = Crud.updateStatusObject(
                id,
                "success",
                "A SA PLACE"
            );
            return updateObject;
        } else if (statusValue == "A SA PLACE") {
            let updateObject = Crud.updateStatusObject(
                id,
                "info",
                "DÉPLACÉ TEMPORAIREMENT"
            );
            return updateObject;
        } else if (statusValue == "DÉPLACÉ TEMPORAIREMENT") {
            let updateObject = Crud.updateStatusObject(id, "warning", "PERDU");
            return updateObject;
        }
    };

    const saveObjects = async () => {
        let allObjects = await Crud.getAllObjects();
        // console.log("\nallObjects --> " + JSON.stringify(allObjects));
        return allObjects;
    };
    useEffect(() => {
        let isMounted = true;
        saveObjects().then((allObjects) => {
            if (isMounted) setObjects(allObjects);
        });
        return () => {
            isMounted = false;
        };
    }, []);

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
                    marginBottom={10}
                    space={1}
                    style={{ marginTop: 10 }}
                    alignItems="flex-start"
                    w="100%"
                >
                    <Heading style={styles.title}>Annuaires</Heading>
                </Stack>
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
                                        onPress={() => setIsOpen(!isOpen)}
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
                                                    ref={cancel}
                                                >
                                                    Annuler
                                                </Button>
                                                <Button
                                                    colorScheme="danger"
                                                    onPress={() => {
                                                        Crud.deleteObject(
                                                            object.ObjectID
                                                        );
                                                        saveObjects().then(
                                                            (objects) => {
                                                                setObjects(
                                                                    objects
                                                                );
                                                                onClose;
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
});
