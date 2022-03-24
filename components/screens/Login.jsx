import { Button, Input, Stack, View, Link, Icon, Text, IconButton } from "native-base";
import { StyleSheet, LogBox } from "react-native";
import { useState } from "react";
import { FontAwesome5, Entypo } from "@expo/vector-icons";

LogBox.ignoreLogs(['NativeBase:']);

export default ({navigation}) => {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const [show, setShow] = useState(false);
    const togglePwdDisplay = () => setShow(!show);

    const submitForm = () => {
        console.log("Form submitted")
        // console.table({email: email, pwd: pwd})
        console.log(`Email: ${email}, Pwd: ${pwd}`)
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

                <Button w='150' h='10' variant='outline' onPress={submitForm}>Log in</Button>
                <Text variant='subText'>Haven't an account yet ?</Text><Link onPress={goToRegisterScreen}>Create one</Link>
            </Stack>
        </View>
    );
}

const styles = StyleSheet.create({
    //
})