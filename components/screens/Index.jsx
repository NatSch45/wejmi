import { View, Heading, Text, Button} from 'native-base';
import { StyleSheet } from 'react-native';

export default ({navigation}) => {

    const login = () => {
        navigation.navigate("Log In")
    }

    const register = () => {
        navigation.navigate("Register")
    }

    return (
        <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
            <Heading style={styles.title}>WEJMI</Heading>
            <Text style={styles.subTtitle}>Ici y'a un petit texte ouai c'est carrément incroyable j'adore ça.</Text>

            <Button.Group variant="outline" space={10} mx={{ base: "auto", md: 0 }} style={styles.buttonGroup}>
                <Button w={'40%'} onPress={login}>Log In</Button>

                <Button w={'40%'} onPress={register}>Register</Button>
            </Button.Group>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        paddingTop: '65%',
        fontSize: 50,
    },
    subTtitle: {
        textAlign: 'center',
        width: '80%'
    },
    buttonGroup: {
        position: 'absolute',
        bottom: 10,
        justifyContent: 'center',
        width: '100%'
    },
})