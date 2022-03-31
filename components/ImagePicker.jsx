import * as ImagePicker from "expo-image-picker";

export let openImage = async () => {
    let permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    return pickerResult.uri;
};

export let openCamera = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync();
    return pickerResult.uri;
};
