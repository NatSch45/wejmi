import React from "react";
import { StyleSheet } from "react-native";
import { Button, View } from "native-base";

export default ({ action }) => {
    return (
        <Button style={styles.space} onPress={action}>
            Modifier
        </Button>
    );
};

const styles = StyleSheet.create({
    space: {
        marginTop: 20,
    },
});
