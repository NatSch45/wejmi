import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "native-base";

export default ({ action }) => {
    return (
        <Button style={styles.space} onPress={action}>
            Sauvegarder
        </Button>
    );
};

const styles = StyleSheet.create({
    space: {
        marginTop: 20,
    },
});
