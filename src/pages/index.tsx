import { Box, Button, Flex, Input, Link } from "@chakra-ui/react";
import Image from "next/image";
import fundo from "../../public/fundo.jpg";
import { CiSearch } from "react-icons/ci";
import { LinkBut } from "@/components/utils/linkButton/linkBut";

export default function Home() {
  return (
    <Flex h={"100vh"} bg={"blue.600"} align={"center"}>
      <Box position={"absolute"}>
        <Image
          alt="fundo"
          src={fundo}
          style={{
            backgroundRepeat: "no-repeat",
            height: "100vh",
            width: "100vw",
          }}
        />
      </Box>
      <Flex margin={"0 auto"} mt={60} gap={10} zIndex={999}>
        <Link href={"/calculator"}>
          <LinkBut text={"Caluladora"} />
        </Link>
        <Link href={"/calculator"}>
          <LinkBut text={"Simulador"} />
        </Link>
      </Flex>
    </Flex>
  );
}

export async function getServerSideProps() {
  return { props: {} };
}
