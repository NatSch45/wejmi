import { Fab, Icon, Box, Center, NativeBaseProvider, View } from "native-base";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

export default () => {

  const Add = () => {
    return <Center>
      <Fab renderInPortal={false} shadow={2} size="sm" icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />} />
    </Center>;
  };

  function Example() {
    const theme = useTheme();
    return <Box>{/* Do something with the theme */}</Box>;
  };

  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Add />
      </Center>
    </NativeBaseProvider>
  );
};