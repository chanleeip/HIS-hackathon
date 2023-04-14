import {Button, HStack, Text, VStack} from "@chakra-ui/react";
import {FaFile} from "react-icons/fa";
import React from "react";

return (
    <HStack key={v.publicKey} alignItems="center" justifyContent="space-between" width="full">
        <VStack alignItems="start" spacing={8}>
            <HStack>
                <FaFile fontSize={80} />
                <Text fontSize={80}>{v.name}</Text>
            </HStack>
            <HStack>
                <Text fontWeight="bold" fontSize={40}>Description: </Text>
                <Text fontWeight="light" fontSize={40}>{v.description}</Text>
            </HStack>
        </VStack>
        <Button
            size="lg"
            borderWidth={2}
            borderRadius={5}
            onClick={() =>
                (window.location.href = `/#/nft/${v.publicKey}`)
            }
        >
            Learn More
        </Button>
    </HStack>
);
})}
</VStack>
</HStack>
</Box>
)};