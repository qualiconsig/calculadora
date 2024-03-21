import { motion } from "framer-motion";
import qu from '../../../public/qu.png'
import load from "../../../public/load.png";
import Image from "next/image";
import { Box, Flex } from "@chakra-ui/react";

export default function Load() {
  return (
    <Flex h={'100vh'} justify={"center"} flexDir={"column"} align={"center"}>
      
      <motion.div
        className="box"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.3,
          ease: [0, 0.71, 0.2, 1.01],
          scale: {
            type: "spring",
            damping: 5,
            stiffness: 100,
            restDelta: 0.001,
          },
        }}
      >
       
        <Box w={"500px"}>
          <Image alt="Qualiconsig" src={qu} />
        </Box>
      </motion.div>
      <div>
        <motion.div
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "5px",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Image alt="carregando" src={load} />
          
        </motion.div>
        
      </div>
      
    </Flex>
    
  );
}
