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
    View,
    IconButton,
    Icon,
    Fab,
    Badge,
} from "native-base";
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
                        <Heading>{data.item}</Heading>
                    </Stack>
                    <Stack
                        marginBottom={10}
                        space={1}
                        style={{ marginTop: 5 }}
                        alignItems="center"
                        w="100%"
                    >
                        <VStack space={4} alignItems="center">
                            <Center
                                w="80"
                                minHeight="20"
                                h="100"
                                bg="indigo.500"
                                rounded="md"
                                shadow={3}
                            >
                                <ScrollView>
                                    <Text
                                        fontSize="2xl"
                                        color="white"
                                        maxW="95%"
                                        justifyContent="center"
                                        alignItems="center"
                                        textAlign="justify"
                                        padding="2"
                                    >
                                        Lorem ipsum
                                    </Text>
                                </ScrollView>
                            </Center>
                            <Center
                                w="64"
                                h="20"
                                bg="indigo.500"
                                rounded="md"
                                shadow={3}
                            >
                                <Text fontSize="2xl" color="white">
                                    Pièce
                                </Text>
                            </Center>
                            <Center
                                w="64"
                                h="20"
                                bg="indigo.500"
                                rounded="md"
                                shadow={3}
                            >
                                <Text fontSize="2xl" color="white">
                                    Meuble
                                </Text>
                            </Center>
                            <Center
                                w="64"
                                h="20"
                                bg="indigo.500"
                                rounded="md"
                                shadow={3}
                            >
                                <Text fontSize="2xl" color="white">
                                    Catégorie
                                </Text>
                            </Center>
                        </VStack>
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
