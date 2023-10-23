import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../App.css';

const EmojiApi = ({setMeaning, setEmoji}) => {

    const [apidata, setApidata] = useState([
        // {slug, character, unicodeName, codePoint, group, subGroup, variants}
    ]);

    useEffect(() => {
        axios({
            method: "get",
            url: "https://emoji-api.com/emojis?access_key=b1e697a9822cfb9047a931d3f8032d50e3a52399",
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            setApidata(response.data);
            // console.log(response.data);
        }).catch(error => {
            console.error(error);
        })
    }, [apidata])

    // const updateValue = (newValue) => {
    //     setApidata(newValue);
    // }

    const clickApiMeaning = (e) => {

        apidata.map(item => {
            if(item.character == e){
                setMeaning(item.unicodeName);
                setEmoji(e);
            }
        })
    }

    return (    
        <>
            <div className='apiData container d-flex flex-wrap justify-content-between mt-3'>
                {
                    apidata.map(item => {
                        return <span key={item.unicodeName} 
                        onClick={() => clickApiMeaning(item.character)} 
                        className='apiCharacter'>{item.character}
                        </span>
                    })
                }
            </div>
        </>
    )
}

export default EmojiApi;