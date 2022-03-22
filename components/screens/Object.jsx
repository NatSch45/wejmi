import { StyleSheet, Text, View, ScrollView } from "react-native";
import {
    CheckIcon,
    FormControl,
    Icon,
    IconButton,
    Select,
    Stagger,
    TextArea,
    useTheme,
} from "native-base";
import { NativeBaseProvider, Input } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import MenuIcon from "../MenuIcon.jsx";

export default function Item() {
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
                                name="dots-horizontal"
                                color="warmGray.50"
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
                                name="dots-horizontal"
                                color="warmGray.50"
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
                                name="dots-horizontal"
                                color="warmGray.50"
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
            </View>
            <View>
                <MenuIcon></MenuIcon>
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
        flex: 4,
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 200,
    },
    spaceBetween: {
        marginBottom: 25,
    },
    space: {
        marginTop: 10,
    },
});
