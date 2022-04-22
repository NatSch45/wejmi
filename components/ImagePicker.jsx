import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

export let openImage = async () => {
    let permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    let imageResult = await copyFile(pickerResult);
    return imageResult;
};

export let openCamera = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync();
    let imageResult = await copyFile(pickerResult);
    return imageResult;
};

const copyFile = async (image) => {
    let fileName = image.uri.substring(
        image.uri.lastIndexOf("/") + 1,
        image.uri.length
    );
    const uri = `${FileSystem.documentDirectory}${fileName}`;

    await FileSystem.copyAsync({
        from: image.uri,
        to: uri,
    });
    return uri;
};
