import { Button, Input, View, Text, Stack, Icon, Link } from "native-base";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { MaterialIcons, FontAwesome5, Entypo } from "@expo/vector-icons";

export default () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [verifPwd, setVerifPwd] = useState("");

    const submitForm = () => {

        console.log("Form submitted")
        console.table({name: name, email: email, pwd: pwd, verifPwd: verifPwd})
        // console.log(`Name: ${name}, Email: ${email}, Pwd: ${pwd}, VerifPwd: ${verifPwd}`)
    }
    
    const goToLogIn = () => {
        console.log("Go to log in screen")
    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text fontSize='4xl' style={{marginBottom: 30}}>{"Wejmi".toUpperCase()}</Text>
            <Stack space={4} w="100%" alignItems="center">
                <Input
                InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />}
                w={{base: '75%', md: '25%'}}
                size="lg"
                placeholder="Name"
                value={name}
                onChangeText={(val) => {setName(val)}} />

                <Input
                InputLeftElement={<Icon as={<Entypo name="email" />} size={5} ml="2" color="muted.400" />}
                w={{base: '75%', md: '25%'}}
                size="lg"
                placeholder="Email"
                value={email}
                onChangeText={(val) => {setEmail(val)}} />

                <Input
                InputLeftElement={<Icon as={<FontAwesome5 name="key" />} size={5} ml="2" color="muted.400" />}
                w={{base: '75%', md: '25%'}}
                size="lg"
                placeholder="Password"
                value={pwd}
                onChangeText={(val) => {setPwd(val)}} />

                <Input
                InputLeftElement={<Icon as={<FontAwesome5 name="key" />} size={5} ml="2" color="muted.400" />}
                w={{base: '75%', md: '25%'}}
                size="lg"
                placeholder="Password verification"
                value={verifPwd}
                onChangeText={(val) => {setVerifPwd(val)}} />
                
                <Button w='150' h='10' variant='outline' onPress={submitForm}>Register</Button>
            </Stack>
            <Text style={styles.subText}>Already have an account ?</Text><Link onPress={goToLogIn}>Log in</Link>
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        marginBottom : 20,
    },
    subText: {
        marginTop: 30,
        color: '#787878',
        fontSize: 'sm'
    }
})