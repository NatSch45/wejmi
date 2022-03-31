import {
    Button,
    Input,
    Stack,
    View,
    Link,
    Icon,
    Text,
    IconButton,
    KeyboardAvoidingView,
} from "native-base";
import { StyleSheet, LogBox } from "react-native";
import { useEffect, useState } from "react";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";

LogBox.ignoreLogs(["NativeBase:"]);

const fileURI = FileSystem.documentDirectory + "accounts.json";

const createFile = async (accounts) => {
    await FileSystem.writeAsStringAsync(fileURI, JSON.stringify(accounts));
    // console.log(await FileSystem.getInfoAsync(fileURI))
};

const fileExists = async (uri) => {
    return (await FileSystem.getInfoAsync(uri)).exists;
};

export default ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const [show, setShow] = useState(false);
    const togglePwdDisplay = () => setShow(!show);

    const [accounts, setAccounts] = useState([]);

    const readFile = async () => {
        if (await fileExists(fileURI)) {
            const content = await FileSystem.readAsStringAsync(fileURI);
            setAccounts(JSON.parse(content));
        }
    };
    useEffect(() => {
        readFile();
    }, []);

    const submitForm = () => {
        console.log("Form submitted");
        let good = false;
        accounts.forEach((e) => {
            if (e.email == email && e.pwd == pwd) {
                good = true;
                e.connected = true;
                createFile(accounts);
                navigation.navigate("Object");
            }
        });
        if (!good) {
            console.log("Wrong email or password, please retry");
        }
    };

    const goToRegisterScreen = () => {
        console.log("Go to register screen");
        navigation.navigate("Register");
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : ""}
            keyboardVerticalOffset={30}
        >
            <View variant="container">
                <Text fontSize="4xl" style={{ marginBottom: 30 }}>
                    WEJMI
                </Text>
                <Stack space={4} w="100%" alignItems="center">
                    <Input
                        InputLeftElement={
                            <Icon
                                as={<Entypo name="email" />}
                                size={5}
                                ml="2"
                                color="muted.400"
                            />
                        }
                        w={{ base: "75%", md: "25%" }}
                        size="lg"
                        placeholder="Email"
                        value={email}
                        onChangeText={(val) => {
                            setEmail(val);
                        }}
                    />

                    <Input
                        InputLeftElement={
                            <Icon
                                as={<FontAwesome5 name="key" />}
                                size={5}
                                ml="2"
                                color="muted.400"
                            />
                        }
                        w={{ base: "75%", md: "25%" }}
                        size="lg"
                        placeholder="Password"
                        value={pwd}
                        onChangeText={(val) => {
                            setPwd(val);
                        }}
                        type={show ? "text" : "password"}
                        InputRightElement={
                            <IconButton
                                h="full"
                                roundedLeft={0}
                                onPress={togglePwdDisplay}
                                icon={
                                    <Icon
                                        as={Entypo}
                                        name={show ? "eye" : "eye-with-line"}
                                        size={7}
                                    />
                                }
                                _icon={{ color: show ? "#06b5d4" : "#919191" }}
                            />
                        }
                    />

                    <Button
                        w="150"
                        h="10"
                        variant="outline"
                        onPress={submitForm}
                    >
                        Log in
                    </Button>
                    <Text variant="subText">Haven't an account yet ?</Text>
                    <Link onPress={goToRegisterScreen}>Create one</Link>
                </Stack>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    //
});
