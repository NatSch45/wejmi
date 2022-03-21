import { StyleSheet, Text, View } from "react-native";
import {
    CheckIcon,
    Container,
    FormControl,
    Select,
    useTheme,
    WarningOutlineIcon,
} from "native-base";
import { NativeBaseProvider, Box, Input } from "native-base";

const Error = () => {
    return (
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Ce champ est obligatoire !
        </FormControl.ErrorMessage>
    );
};

export default function () {
    const { colors } = useTheme();
    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <Input
                    size="lg"
                    variant="underlined"
                    placeholder="Nom"
                    w="75%"
                />
            </View>
            <View style={styles.form}>
                <FormControl
                    style={styles.spaceBetween}
                    w="3/4"
                    maxW="300"
                    isRequired
                    isInvalid
                >
                    <FormControl.Label>Pièce :</FormControl.Label>
                    <Select
                        minWidth="200"
                        accessibilityLabel="Choisir la pièce"
                        placeholder="Choisir la pièce"
                        _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size={5} />,
                        }}
                        mt="1"
                    >
                        <Select.Item label="Cuisine" value="Cuisine" />
                        <Select.Item
                            label="Salle à manger"
                            value="Salle à manger"
                        />
                        <Select.Item
                            label="Salle de bain"
                            value="Salle de bain"
                        />
                        <Select.Item label="Chambre" value="Chambre" />
                        <Select.Item label="Jardin" value="Jardin" />
                    </Select>
                    <FormControl.ErrorMessage
                        leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                        Ce champ est obligatoire !
                    </FormControl.ErrorMessage>
                </FormControl>
                <FormControl w="3/4" maxW="300" style={styles.spaceBetween}>
                    <FormControl.Label>Meuble :</FormControl.Label>
                    <Select
                        minWidth="200"
                        accessibilityLabel="Choisir le meuble"
                        placeholder="Choisir le meuble"
                        _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size={5} />,
                        }}
                        mt="1"
                    >
                        <Select.Item label="Armoire" value="Armoire" />
                        <Select.Item label="Placard" value="Placard" />
                    </Select>
                </FormControl>
            </View>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 100,
    },
    form: {
        flex: 2,
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 200,
    },
    spaceBetween: {
        marginBottom: 25,
    },
});
