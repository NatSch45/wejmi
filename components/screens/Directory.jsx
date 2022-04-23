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

export default function ({ navigation }) {
    // ZONE FUNCTIONS

    // Zone CONST

    const item = [
        {
            id: 1,
            name: "Nathan",
        },
        {
            id: 2,
            name: "Elouan",
        },
        {
            id: 3,
            name: "Malo",
        },
    ];
    const [list, updateList] = useState(item);
    const removeItem = (id) => {
        updateList(list.filter((item) => item.id !== id));
    };

    const goToAddObject = () => {
        navigation.navigate("Ajouter un objet");
    };
    const goToPreview = ({ item }) => {
        navigation.navigate("Détail", { item });
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
                        {list.map((item) => (
                            <View style={styles.item} key={item.id}>
                                <Box>
                                    <Image
                                        source={{
                                            uri: "https://wallpaperaccess.com/full/317501.jpg",
                                        }}
                                        style={styles.image}
                                    />

                                    <Center alignItems="center">
                                        <Heading
                                            fontSize="2xl"
                                            fontWeight="semibold"
                                            onPress={() =>
                                                goToPreview({ item: item.name })
                                            }
                                        >
                                            {item.name}
                                        </Heading>
                                    </Center>
                                    <IconButton
                                        style={styles.icon}
                                        onPress={() => removeItem(item.id)}
                                        icon={
                                            <Icon
                                                as={MaterialIcons}
                                                size="6"
                                                name="delete"
                                                color="red.400"
                                            />
                                        }
                                    ></IconButton>
                                    <Badge
                                        style={styles.badge}
                                        colorScheme="info"
                                        variant="solid"
                                    >
                                        DÉPLACÉ
                                    </Badge>
                                </Box>
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
