import { Icon, IconButton, Stagger } from "native-base";
import { useDisclose, HStack, Center } from "native-base";

import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import { openImage, openCamera } from "./ImagePicker.jsx";

export default ({ onImageChosen }) => {
    const { isOpen, onToggle } = useDisclose();

    const openImagePicker = async () => {
        let imageUri = await openImage();
        onImageChosen(imageUri);
    };
    const openCameraPicker = async () => {
        let imageUri = await openCamera();
        onImageChosen(imageUri);
    };
    return (
        <Center height={200} width={{ base: 100 }} style={{ marginTop: -170 }}>
            <Stagger
                visible={isOpen}
                initial={{
                    opacity: 0,
                    scale: 0,
                    translateY: 34,
                }}
                animate={{
                    translateY: 0,
                    scale: 1,
                    opacity: 1,
                    transition: {
                        type: "spring",
                        mass: 0.8,
                        stagger: {
                            offset: 30,
                            reverse: true,
                        },
                    },
                }}
                exit={{
                    translateY: 34,
                    scale: 0.5,
                    opacity: 0,
                    transition: {
                        duration: 100,
                        stagger: {
                            offset: 30,
                            reverse: true,
                        },
                    },
                }}
            >
                <IconButton
                    mb="4"
                    variant="solid"
                    bg="red.500"
                    colorScheme="red"
                    borderRadius="full"
                    icon={
                        <Icon
                            as={MaterialIcons}
                            size="6"
                            name="photo-library"
                            onPress={openImagePicker}
                            _dark={{
                                color: "warmGray.50",
                            }}
                            color="warmGray.50"
                        />
                    }
                />
                <IconButton
                    mb="4"
                    variant="solid"
                    bg="blue.500"
                    colorScheme="blue"
                    borderRadius="full"
                    icon={
                        <Icon
                            as={MaterialIcons}
                            size="6"
                            name="camera"
                            onPress={openCameraPicker}
                            _dark={{
                                color: "warmGray.50",
                            }}
                            color="warmGray.50"
                        />
                    }
                />
            </Stagger>
            <HStack alignItems="center">
                <IconButton
                    variant="solid"
                    borderRadius="full"
                    size="lg"
                    onPress={onToggle}
                    bg="cyan.400"
                    icon={
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
                />
            </HStack>
        </Center>
    );
};
