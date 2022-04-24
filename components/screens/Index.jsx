import { View, Heading, Text, Button } from "native-base";
import { StyleSheet } from "react-native";

export default ({ navigation }) => {
    const login = () => {
        navigation.navigate("Log In");
    };

    const register = () => {
        navigation.navigate("Register");
    };

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center",
            }}
        >
            <Heading style={styles.title}>WEJMI</Heading>
            <Text style={styles.subTtitle}>
                Fatigués de perdre vos affaires en les rangeant ? 🙄
            </Text>
            <Text style={styles.subTtitle}>Wejmi™ est fait pour vous ! 💪</Text>

            <Button.Group
                variant="outline"
                space={10}
                mx={{ base: "auto", md: 0 }}
                style={styles.buttonGroup}
            >
                <Button w={"40%"} onPress={login}>
                    Log In
                </Button>

                <Button w={"40%"} onPress={register}>
                    Register
                </Button>
            </Button.Group>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        paddingTop: "65%",
        fontSize: 50,
    },
    subTtitle: {
        textAlign: "center",
        paddingTop: "5%",
        width: "80%",
    },
    buttonGroup: {
        position: "absolute",
        bottom: 30,
        justifyContent: "center",
        width: "100%",
    },
});
