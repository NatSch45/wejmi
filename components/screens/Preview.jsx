import { StyleSheet, Image } from "react-native";
import {
    ScrollView,
    Stack,
    KeyboardAvoidingView,
    NativeBaseProvider,
    Text,
    Heading,
    HStack,
    Badge,
} from "native-base";
import { useState, useEffect } from "react";
import Add from "../Button.jsx";
import * as Crud from "../Crud";

export default function ({ route }) {
    const data = route.params;

    const [object, setObject] = useState([]);

    const saveObject = async () => {
        let oneObject = await Crud.getObject(data.id);
        return oneObject[0];
    };
    useEffect(() => {
        let isMounted = true;
        saveObject().then((oneObject) => {
            if (isMounted) setObject(oneObject);
        });
        return () => {
            isMounted = false;
        };
    }, []);

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
                    <Heading style={styles.title}>Détails</Heading>
                </Stack>
                <ScrollView style={styles.container}>
                    <Stack
                        marginBottom={10}
                        space={1}
                        style={{ marginTop: 5 }}
                        alignItems="center"
                        w="100%"
                    >
                        <Image
                            source={{
                                uri: object.Picture,
                            }}
                            style={styles.image}
                        ></Image>
                    </Stack>
                    <Stack
                        marginBottom={10}
                        space={1}
                        style={{ marginTop: 5 }}
                        alignItems="center"
                        w="100%"
                    >
                        <Stack
                            direction={["column", "column", "row"]}
                            rounded="lg"
                            overflow="hidden"
                            width={300}
                            style={{ marginTop: 20 }}
                            shadow="1"
                            _light={{
                                backgroundColor: "coolGray.50",
                            }}
                        >
                            <Stack flex="1" p="4" space={[3, 3, 1.5]}>
                                <Stack space="2">
                                    <Heading
                                        size="xl"
                                        ml="-1"
                                        style={{ marginBottom: 10 }}
                                    >
                                        {object.Name}
                                    </Heading>
                                    <Text
                                        fontSize="xs"
                                        color="violet.500"
                                        fontWeight="500"
                                        ml="-0.5"
                                        mt="-1"
                                    >
                                        {object.CategoryName}
                                    </Text>
                                    <Text
                                        fontSize="xs"
                                        color="red.500"
                                        fontWeight="500"
                                        ml="-0.5"
                                        mt="-1"
                                    >
                                        {object.RoomName}
                                    </Text>
                                    <Text
                                        fontSize="xs"
                                        color="blue.500"
                                        fontWeight="500"
                                        ml="-0.5"
                                        mt="-1"
                                    >
                                        {object.FurnitureName}
                                    </Text>
                                </Stack>
                                <Text fontWeight="400">{object.Container}</Text>
                                <HStack
                                    alignItems="center"
                                    space="4"
                                    justifyContent="space-between"
                                >
                                    <HStack alignItems="center">
                                        <Badge
                                            style={styles.badge}
                                            colorScheme={object.Color}
                                            variant="solid"
                                        >
                                            {object.Status}
                                        </Badge>
                                    </HStack>
                                </HStack>
                            </Stack>
                        </Stack>
                        <Add label="Modifier"></Add>
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
    title: {
        paddingTop: "8%",
        paddingLeft: "8%",
        fontSize: 35,
    },
    image: {
        paddingTop: 15,
        width: 100,
        height: 100,
        borderRadius: 50,
    },
});
