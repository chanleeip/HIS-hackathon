import React, {useState} from 'react';
import {Box, Button, Heading, HStack, Text, Textarea, VStack} from "@chakra-ui/react";

export const Pideas = () => {

    const [ideas , setIdea] = useState([]);
    const [public_key, setPublic_Key] = useState("");

    const fetchData = async () => {
        const response = await fetch('get_data',{
            method : 'POST',
            headers : {'content-Type':'application/json'},
            body:JSON.stringify({public_key})
        });
        const data = await response.json();
        if (data.success){
            setIdea(data.result);
        }
    }

    const handleButtonClick = async () => {
        await fetchData();
    }

    return(
        <div style={{paddingTop: '50px'}} >

            <Heading fontWeight='semibold' display="flex" justifyContent="center" fontSize={50} mb="10" mt="7">Paste the Wallet address below</Heading>
            <Textarea
                type="text"
                fontSize={25}
                value={public_key}
                onChange={e => {
                    setPublic_Key(e.target.value);
                }}
                pos="absolute"
                left="400"
                height={10}
                width="50%"
                p={4}
                fontWeight="bold"
                borderColor="black"
                borderWidth="1px"
                color="#D5D8DC"
                bg="#1B2631"
                overflow="hidden"

            />
            <br/>

            <Button
               pos="relative"
               left="680"
               top="95"
                onClick={handleButtonClick}
                p={8}
               py={7}
                height={10}
                fontWeight="semibold"
                fontSize={25}
                borderColor="black"
               rounded="full"
               boxShadow="xl"
                borderWidth="4px"
                overflow="hidden"
                bg="transparent"
                color="#1B2631"

            >
                Get keys
            </Button>
           <Box mt={40}>
               {ideas.map((idea, index) => (
                <Box bg="#1B2631" width="75%" mt={10} ml={200} p={5} rounded="lg" >
                <div key={index}>
                    <Heading fontSize={25} fontWeight="extrabold" display="flex" justifyContent="center" color="white" >{idea.Title}</Heading>
                    <VStack>
                    <HStack mt={8} color="#D5D8DC" spacing={10}>
                    <Text fontWeight="bold" fontSize={20}>Private key :</Text>
                   <Box color="#FA8072" marginLeft={20}>
                       <a href={`http://localhost:3000/#/nft/${idea.NFT_Address}`}>{idea.NFT_Address}</a>
                       </Box>
                        <Box><h3 >Expiry:{idea.Expire_Date}</h3></Box>
                    </HStack>
                    </VStack>

                    <br/>
                </div>
                </Box>
            ))}
           </Box>
        </div>
    );
};
