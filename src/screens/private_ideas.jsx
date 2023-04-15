import React, {useState,useEffect} from 'react';
export const Pideas = () => {
    const [ideas , setIdea] = useState([""])

    useEffect(()=>{
       fetch('/get_data/${public_key}')
           .then(response=>response.json())
           .then((data)=>{
              setIdea(data.results);
           });
    },[]);
    return(
        <div>
            {ideas.map((idea, index) => (
                <div key={index}>
                    <h2>{idea.Title}</h2>
                    <a href="{idea.NFT_Address}">{idea.NFT_Address}</a>
                </div>
            ))}
        </div>
    );
};