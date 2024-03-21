import { Button } from "@chakra-ui/react"
import Link from "next/link"

export const LinkBut = ( {text}:any) => {


  return (
  
          <Button boxShadow= "3px 2px 8px 3px rgba(0,0,0,0.75)" color={'white'} w={'150px'} h={20} bg={'#2980B9'} _hover={{
            background: "#2675aa",
            padding:'5px',
            boxShadow: "-1px 1px 6px 2px rgba(0,0,0,0.75)"
          }}>{text}</Button>
        
  )
}