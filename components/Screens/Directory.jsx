import React from "react";
import { View, ScrollView, Center, Box, Fab, Icon, NativeBaseProvider, FlatList, Heading, Avatar, HStack, VStack, Text, Spacer, VirtualizedList } from "native-base";
import { AntDesign } from "@expo/vector-icons";

export default () => {

  const Add = () => {
    return <Center>
          <Fab shadow={2} size="sm" icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />} />
      </Center>;
  };

  const Settings = () => {
    return <Center>
          <Fab shadow={2} right={340} size="sm" icon={<Icon color="white" as={AntDesign} name="setting" size="sm" />} />
      </Center>;
  };

  const List = () => {
    const data = [{
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      fullName: "Aafreen Khan",
      timeStamp: "12:47 PM",
      recentText: "Good Day!",
      avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    }, {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      fullName: "Sujitha Mathur",
      timeStamp: "11:11 PM",
      recentText: "Cheer up, there!",
      avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
    }, {
      id: "28694a0f-3da1-471f-bd96-142456e29d72",
      fullName: "Kiara",
      timeStamp: "12:47 PM",
      recentText: "I will call today.",
      avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
    }];
    return <Box>
        <Heading fontSize="xl" p="4" pb="3">
          List
        </Heading>
        <FlatList data={data} renderItem={({
        item
      }) => <Box borderBottomWidth="1" _dark={{
        borderColor: "gray.600"
      }} borderColor="coolGray.200" pl="4" pr="5" py="2">
              <HStack space={3} justifyContent="space-between">
                <Avatar size="48px" source={{
            uri: item.avatarUrl
          }} />
                <VStack>
                  <Text _dark={{
              color: "warmGray.50"
            }} color="coolGray.800" bold>
                    {item.fullName}
                  </Text>
                  <Text color="coolGray.600" _dark={{
              color: "warmGray.200"
            }}>
                    {item.recentText}
                  </Text>
                </VStack>
                <Spacer />
                <Text fontSize="xs" _dark={{
            color: "warmGray.50"
          }} color="coolGray.800" alignSelf="flex-start">
                  {item.timeStamp}
                </Text>
              </HStack>
            </Box>} keyExtractor={item => item.id} />
      </Box>;
  };

  return (
    <View>
      <ScrollView>
      <NativeBaseProvider>
            <Center flex={1} px="3">
                <List />
            </Center>
          </NativeBaseProvider>
      </ScrollView>
        <Center flex={1} px="3">
          <Add />
        </Center>
        <Center flex={1} px="3">
          <Settings />
        </Center>
    </View>
    )
};