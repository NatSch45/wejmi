import { Camera } from "react-native-vision-camera";

export default () => {
    const devices = Camera.getAvailableCameraDevices();
    const device = devices.back;

    return <Camera device={device} isActive={true} />;
};
