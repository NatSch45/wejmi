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
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { MaterialIcons, FontAwesome5, Entypo } from "@expo/vector-icons";
import * as Crud from '../Crud';

Crud.disconnectUsers();

export default ({navigation}) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [verifPwd, setVerifPwd] = useState("");

    const [show, setShow] = useState(false);
    const togglePwdDisplay = () => setShow(!show);
    const [show1, setShow1] = useState(false);
    const togglePwdDisplay1 = () => setShow1(!show1);

    const [accounts, setAccounts] = useState([]);

    const saveAccounts = async () => {
        let allAccounts = await Crud.getAllAccounts();
        console.log("\nallAccounts --> " + JSON.stringify(allAccounts));
        return allAccounts;
    }
    useEffect(() => {
        let isMounted = true;
        saveAccounts().then(allAccounts => {
            if (isMounted) setAccounts(allAccounts);
        });
        return () => { isMounted = false }
    }, []);

    const checkEmail = (newEmail) => {
        let good = true;
        if (accounts !== undefined) {
            accounts.forEach(e => {
                if (e.email == newEmail) {
                    console.log("WRONG EMAIL\n");
                    good = false;
                }
            });
        }

        return good;
    };

    const submitRegisterForm = async () => {
        console.log("Form submitted");
        if (pwd === verifPwd) {
            if (checkEmail(email)) {
                console.log(`Username: ${username}, Email: ${email}, Pwd: ${pwd}, VerifPwd: ${verifPwd}`);
                Crud.insertNewAccount(username, email, pwd);
                saveAccounts();
                console.log(accounts + "\n");
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
                        autoCapitalize="none"
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
                        autoCapitalize="none"
                        keyboardType="email-address"
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
                                _icon={{
                                    color: show ? "#06b5d4" : "#919191",
                                }}
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
                                _icon={{
                                    color: show1 ? "#06b5d4" : "#919191",
                                }}
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
    //
});
