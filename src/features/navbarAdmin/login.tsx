import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";

export function Login(){
    return(
        <Box bgColor={"black"} >
            <Box ml={"20px"} mr={"20px"}>
            <Input placeholder="Email" type="email" size="md" mb={2} />
            <Input placeholder="Password" type="password" size="md" />

            <Button mt={4} w={"100%"} bgColor={"#E50914"} _hover={{bgColor:"white", color:"#E50914"}}>Login</Button>
            <Flex mt={2} justifyContent={"center"} mb={4}>
            <Text color={"#B1B1B1"}>Don't have an account? Klik <span style={{fontWeight:"bold", cursor:"pointer"}}>Here</span></Text>
            </Flex>
            </Box>
        </Box>
    )
}