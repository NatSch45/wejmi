import {
    StyleSheet,
    Image,
    Animated,
    TouchableHighlight,
    TouchableOpacity,
    StatusBar,
} from "react-native";
import {
    ScrollView,
    Stack,
    KeyboardAvoidingView,
    NativeBaseProvider,
    Text,
    Heading,
    VStack,
    Center,
    Box,
    HStack,
    View,
    IconButton,
    Icon,
    Fab,
    Badge,
} from "native-base";
import Add from "../Button.jsx";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

export default function ({ navigation, route }) {
    const data = route.params;
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
                                uri: "https://picsum.photos/400/400",
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
                                        {data.item}
                                    </Heading>
                                    <Text
                                        fontSize="xs"
                                        color="violet.500"
                                        fontWeight="500"
                                        ml="-0.5"
                                        mt="-1"
                                    >
                                        Catégorie
                                    </Text>
                                    <Text
                                        fontSize="xs"
                                        color="red.500"
                                        fontWeight="500"
                                        ml="-0.5"
                                        mt="-1"
                                    >
                                        Pièce
                                    </Text>
                                    <Text
                                        fontSize="xs"
                                        color="blue.500"
                                        fontWeight="500"
                                        ml="-0.5"
                                        mt="-1"
                                    >
                                        Meuble
                                    </Text>
                                </Stack>
                                <Text fontWeight="400">Description</Text>
                                <HStack
                                    alignItems="center"
                                    space="4"
                                    justifyContent="space-between"
                                >
                                    <HStack alignItems="center">
                                        <Badge
                                            style={styles.badge}
                                            colorScheme="info"
                                            variant="solid"
                                        >
                                            DÉPLACÉ
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
