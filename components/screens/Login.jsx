import { Button, Input, Stack, View, Link, Icon, Text, IconButton } from "native-base";
import { StyleSheet, LogBox } from "react-native";
import { useEffect, useState } from "react";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import * as SQLite from 'expo-sqlite';

LogBox.ignoreLogs(['NativeBase:']);

const db = SQLite.openDatabase("myDB.db")

db.transaction((tx) => {
    tx.executeSql("CREATE TABLE IF NOT EXISTS Accounts (ID INTEGER PRIMARY KEY NOT NULL, Username TEXT, Email TEXT, Password TEXT, Connected BOOLEAN);")
})

const getAllAccounts = async () => {
    return new Promise(async resolve => {
        db.transaction((tx) => {
            tx.executeSql("SELECT * FROM Accounts", [], (insertID, rows) => {
                const allAccounts = rows.rows._array
                resolve(allAccounts)
            })
        })
    })
}

const connectAccount = (accountID, connected) => {
    db.transaction((tx) => {
        tx.executeSql("UPDATE Accounts SET connected = ? WHERE id = ?", [connected, accountID])
    })
}

const disconnectUsers = () => {
    db.transaction((tx) => {
        tx.executeSql("UPDATE Accounts SET connect = ?", [false])
    })
}

disconnectUsers()

export default ({navigation}) => {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const [show, setShow] = useState(false);
    const togglePwdDisplay = () => setShow(!show);

    const [accounts, setAccounts] = useState([]);

    const saveAccounts = async () => {
        let allAccounts = await getAllAccounts()
        console.log("\nallAccounts --> " + JSON.stringify(allAccounts))
        setAccounts(allAccounts)
    }
    useEffect(() => {
        saveAccounts()
    }, [])

    const submitLoginForm = () => {
        let good = false
        accounts.forEach(e => {
            if (e.Email == email && e.Password == pwd) {
                good = true
                connectAccount(e.ID, true)
                saveAccounts()
                navigation.navigate("Object")
            }
        })
        if (!good) {
            alert("Mauvais email ou mot de passe, réessayez !")
            console.log("Wrong email or password, please retry")
        }
    }
    
    const goToRegisterScreen = () => {
        console.log("Go to register screen")
        navigation.navigate("Register")
    }

    return (
        <View variant='container'>
            <Text fontSize='4xl' style={{marginBottom: 30}}>WEJMI</Text>
            <Stack space={4} w="100%" alignItems="center">
                <Input 
                InputLeftElement={<Icon as={<Entypo name="email" />} size={5} ml="2" color="muted.400" />}
                w={{base: '75%', md: '25%'}}
                size="lg"
                placeholder="Email"
                value={email}
                onChangeText={(val) => {setEmail(val)}}/>

                <Input
                InputLeftElement={<Icon as={<FontAwesome5 name="key" />} size={5} ml="2" color="muted.400" />}
                w={{base: '75%', md: '25%'}}
                size="lg"
                placeholder="Password"
                value={pwd}
                onChangeText={(val) => {setPwd(val)}}
                type={show ? "text" : "password"}
                InputRightElement={
                    <IconButton h='full' roundedLeft={0} onPress={togglePwdDisplay} icon={<Icon as={Entypo} name={show ? "eye" : "eye-with-line"} size={7} />} _icon={{color: show ? '#06b5d4' : '#919191'}} />
                }/>

                <Button w='150' h='10' variant='outline' onPress={submitLoginForm}>Log in</Button>
                <Text variant='subText'>Haven't an account yet ?</Text><Link onPress={goToRegisterScreen}>Create one</Link>
            </Stack>
        </View>
    );
}

const styles = StyleSheet.create({
    //
})