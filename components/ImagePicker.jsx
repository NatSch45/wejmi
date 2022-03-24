import * as ImagePicker from "expo-image-picker";

export let openImage = async () => {
    let permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
    }
    /* const display = setImage({}) */
    /* display(pickerResult.uri); */
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
};

/* export let display = (params) => {
        const [image, setImage] = useState(null);
    setImage({ localUri: params });

    if (image !== null) {
        return (
            <View>
                <Image source={{ uri: image.localUri }} />
            </View>
        );
    }
}; */

export let openCamera = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync();
    console.log(pickerResult);
};
