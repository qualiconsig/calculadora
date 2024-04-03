import { ChakraProvider, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const AnimatedText = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length < 3) {
          return prevDots + '.';
        } else {
          return '';
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Flex h={'40vh'} justify={'center'} align={'center'}>
      <Text fontSize="xl">Em desenvolvimento{dots}</Text>
    </Flex>
  );
};

