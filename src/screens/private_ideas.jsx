import React, {useState} from 'react';
import {Button, Textarea} from "@chakra-ui/react";

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
        <div>
            <Textarea
                type="text"
                placeholder="Enter Public Key"
                fontSize={20}
                value={public_key}
                onChange={e => {
                    setPublic_Key(e.target.value);
                }}
                height={5}
                width="full"
                fontWeight="bold"
                borderColor="black"
                borderWidth="2px"
            />
            <br/>
            <Button
                bgColor="transparent"
                onClick={handleButtonClick}
                p={2}
                height={10}
                size="xxxl"
                mt={5}
                fontWeight="bold"
                borderColor="black"
                borderWidth="2px"
                overflow="hidden"
            >
                Get wallet Private keys
            </Button>
            {ideas.map((idea, index) => (
                <div key={index}>
                    <h2>{idea.Title}</h2>
                    <a href={`http://localhost:3000/#/nft/${idea.NFT_Address}`}>{idea.NFT_Address}</a>
                    <br/>
                </div>
            ))}
        </div>
    );
};
