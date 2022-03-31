import {
    Button,
    Input,
    View,
    Text,
    Stack,
    Icon,
    Link,
    IconButton,
    KeyboardAvoidingView,
} from "native-base";
import { StyleSheet, LogBox } from "react-native";
import { useEffect, useState } from "react";
import { MaterialIcons, FontAwesome5, Entypo } from "@expo/vector-icons";
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
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [verifPwd, setVerifPwd] = useState("");

    const [show, setShow] = useState(false);
    const togglePwdDisplay = () => setShow(!show);
    const [show1, setShow1] = useState(false);
    const togglePwdDisplay1 = () => setShow1(!show1);

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

    const checkEmail = (newEmail) => {
        let good = true;
        accounts.forEach((e) => {
            if (e.email == newEmail) {
                console.log("WRONG EMAIL\n");
                good = false;
            }
        });
        return good;
    };

    const submitRegisterForm = () => {
        console.log("Form submitted");
        console.log(accounts + "\n");
        if (pwd === verifPwd) {
            if (checkEmail(email)) {
                console.log(
                    `Username: ${username}, Email: ${email}, Pwd: ${pwd}, VerifPwd: ${verifPwd}`
                );
                const newAccounts = [
                    ...accounts,
                    {
                        username: username,
                        email: email,
                        pwd: pwd,
                        connected: false,
                    },
                ];
                setAccounts(newAccounts);
                createFile(newAccounts);
                navigation.navigate("Log In");
            } else {
                console.log("An account with this email already exists\n");
            }
        } else {
            console.log("Passwords don't match\n");
        }
    };

    const goToLogInScreen = () => {
        console.log("Go to log in screen");
        navigation.navigate("Log In");
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : ""}
            keyboardVerticalOffset={30}
        >
            <View variant="container">
                <Text fontSize="4xl" style={{ marginBottom: 30 }}>
                    {"Wejmi".toUpperCase()}
                </Text>
                <Stack space={4} w="100%" alignItems="center">
                    <Input
                        InputLeftElement={
                            <Icon
                                as={<MaterialIcons name="person" />}
                                size={5}
                                ml="2"
                                color="muted.400"
                            />
                        }
                        w={{ base: "75%", md: "25%" }}
                        size="lg"
                        placeholder="Username"
                        value={username}
                        onChangeText={(val) => {
                            setUsername(val);
                        }}
                    />

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
                        placeholder="Password verification"
                        value={verifPwd}
                        onChangeText={(val) => {
                            setVerifPwd(val);
                        }}
                        type={show1 ? "text" : "password"}
                        InputRightElement={
                            <IconButton
                                h="full"
                                roundedLeft={0}
                                onPress={togglePwdDisplay1}
                                icon={
                                    <Icon
                                        as={Entypo}
                                        name={show1 ? "eye" : "eye-with-line"}
                                        size={7}
                                    />
                                }
                                _icon={{ color: show1 ? "#06b5d4" : "#919191" }}
                            />
                        }
                    />

                    <Button
                        w="150"
                        h="10"
                        variant="outline"
                        onPress={submitRegisterForm}
                    >
                        Register
                    </Button>
                </Stack>
                <Text variant="subText">Already have an account ?</Text>
                <Link onPress={goToLogInScreen}>Log in</Link>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    eyeIcon: {
        color: "#919191",
    },
});
