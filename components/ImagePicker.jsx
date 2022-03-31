import * as ImagePicker from "expo-image-picker";
import { View, Image, Text } from "react-native";
import { useState } from "react";
import MenuIcon from "./MenuIcon";

export let openImage = async () => {
    let permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
    }
    /* const display = setImage({}) */

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    paramsImage(pickerResult.uri);
    console.log(pickerResult);
};

let paramsImage = (params) => {
    const [image, setImage] = useState(null);
    setImage({ localUri: params });

    if (image !== null) {
        let result = image.localUri;
        console.log(result);
        return DisplayImage(result);
        {
            /* <View>
            <Image source={{ uri: image.localUri }} />
        </View>; */
        }
    }
};

export let Display = () => {
    return (
        <View>
            <MenuIcon></MenuIcon>
        </View>
    );
};

export let DisplayImage = ({ params }) => {
    return (
        <View style={{ padding: 150 }}>
            <Text>Salut</Text>
            <Image source={{ uri: params }}></Image>
            <MenuIcon></MenuIcon>
        </View>
    );
};

export let openCamera = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync();
    console.log(pickerResult);
};
