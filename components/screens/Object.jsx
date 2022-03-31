import { StyleSheet } from "react-native";
import {
    CheckIcon,
    FormControl,
    Icon,
    ScrollView,
    Select,
    TextArea,
    useTheme,
} from "native-base";
import { useState } from "react";
import { NativeBaseProvider, Input, Button, View, Stack } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MenuIcon from "../MenuIcon.jsx";
import Add from "../Button.jsx";

export default function Item() {
    const { colors } = useTheme();
    const [name, SetName] = useState("");

    const display = () => {
        console.log(name);
    };

    return (
        <NativeBaseProvider>
            <ScrollView style={styles.container}>
                <Stack marginBottom={10} space={1} alignItems="center" w="100%" style={{marginTop: 10}}>
                    <Input
                        size="lg"
                        variant="underlined"
                        placeholder="Nom"
                        borderColor="blue.400"
                        value={name}
                        onChangeText={(name) => {
                            SetName(name);
                        }}
                        w="75%"
                    />
                </Stack>
                <Stack space={4} alignItems="center" w="100%">
                    <FormControl w="3/4" maxW="300" style={styles.spaceBetween}>
                        <FormControl.Label>Compartiment :</FormControl.Label>
                        <TextArea h={20} placeholder="Description" maxW="300" />
                    </FormControl>

                    <FormControl
                        style={styles.spaceBetween}
                        w="3/4"
                        maxW="300"
                        isRequired
                    >
                        <FormControl.Label>Pièce :</FormControl.Label>
                        <Select
                            minWidth="200"
                            accessibilityLabel="Choisir la pièce"
                            placeholder="Choisir la pièce"
                            dropdownIcon={
                                <Icon
                                    as={MaterialCommunityIcons}
                                    size="6"
                                    name="chevron-down"
                                    color="blue.400"
                                    _dark={{
                                        color: "warmGray.50",
                                    }}
                                />
                            }
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
                    </FormControl>
                    <FormControl w="3/4" maxW="300" style={styles.spaceBetween}>
                        <FormControl.Label>Meuble :</FormControl.Label>
                        <Select
                            minWidth="200"
                            accessibilityLabel="Choisir le meuble"
                            placeholder="Choisir le meuble"
                            dropdownIcon={
                                <Icon
                                    as={MaterialCommunityIcons}
                                    size="6"
                                    name="chevron-down"
                                    color="blue.400"
                                    _dark={{
                                        color: "warmGray.50",
                                    }}
                                />
                            }
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
                    <FormControl w="3/4" maxW="300" style={styles.spaceBetween}>
                        <FormControl.Label>Catégorie :</FormControl.Label>
                        <Select
                            minWidth="200"
                            dropdownIcon={
                                <Icon
                                    as={MaterialCommunityIcons}
                                    size="6"
                                    name="chevron-down"
                                    color="blue.400"
                                    _dark={{
                                        color: "warmGray.50",
                                    }}
                                />
                            }
                            accessibilityLabel="Choisir le meuble"
                            placeholder="Choisir le meuble"
                            _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size={5} />,
                            }}
                            mt="1"
                        >
                            <Select.Item label="Outil" value="Outil" />
                            <Select.Item label="Documents" value="Documents" />
                        </Select>
                    </FormControl>
                    <Add action={display}></Add>
                </Stack>
                <MenuIcon></MenuIcon>
            </ScrollView>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 200,
    },
    spaceBetween: {
        marginBottom: 25,
    },
    button: {
        flex: 1,
    },
});
