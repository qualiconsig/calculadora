import { Text } from "@chakra-ui/react";

export const TextResponse = ({ item, rest }: any) => {
  return (
    <Text
      mb={"5px"}
     
      fontSize={['10px', '13px', '15px', '15px', '16px']}  w={['100%','80%','100%']}
      {...rest}
    >
      {item}
    </Text>
  );
};
