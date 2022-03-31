import {useState} from "react";
import { View, ScrollView, Center, Box, Fab, Icon } from "native-base";
import { useTheme } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

export default () => {

  const Add = () => {
    return <Center>
          <Fab renderInPortal={true} shadow={2} size="sm" icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />} />
      </Center>;
  };

  return (
    <View>
      <ScrollView>

      </ScrollView>
        <Center flex={1} px="3">
          <Add />
        </Center>
    </View>
    )
};