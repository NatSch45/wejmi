import React from "react";
import { StyleSheet } from "react-native";
import { Button, View } from "native-base";

export default ({ action, label }) => {
    return (
        <Button style={styles.space} onPress={action}>
            {label}
        </Button>
    );
};

const styles = StyleSheet.create({
    space: {
        marginTop: 20,
    },
});
