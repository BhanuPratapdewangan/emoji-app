import React, { useEffect, useState } from 'react'
import '../App.css';
import EmojiApi from './emoji-api.js';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmojiHeader = () => {

  const [meaning, setMeaning] = useState('');
  const [emoji, setEmoji] = useState('');
  const [apidata, setApidata] = useState([]);
  const [color, setColor] = useState('yellow');
  const word = "Knowing";
  const [knowingColor, setKnowingColor] = useState(word.split('').map((_, index) => (index % 2 === 0) ? 'white':'yellow'));

  useEffect(() => {
    axios({
      method: "get",
      url: "https://emoji-api.com/emojis?access_key=b1e697a9822cfb9047a931d3f8032d50e3a52399",
      // headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      setApidata(response.data);
    })

  }, [apidata])

  const emojiMeaning = (e) => {
    setColor('yellow');
    apidata.map(item => {
      if (e === item.character) { setMeaning(item.unicodeName); setEmoji(item.character); }
    })
  }

  const emojiDictionary = {
    // static api data
    "😊": "smiles",
    "👍": "Thumbs Up",
    "😶": "speechlessness",
    "💖": "Sparkling Heart",
    "😁": "Beaming Face with Smiling Eyes",
    "🤗": "Hugging face",
    "😆": "E0.6 grinning squinting face"
  };

  const objectKey = Object.keys(emojiDictionary);

  const clickEmoji = (item) => {
    var clickOneEmoji = emojiDictionary[item];
    setMeaning(clickOneEmoji);
    setEmoji(item);
  }

  return (
    <>
      <h2 className='mb-4'>
        {
          word.split('').map((letter, index) => 
            <span key={index} style={{color: knowingColor[index]}}>{letter}</span>
          )
        }
        
         - {emoji}</h2>

      <div className='input-emojis'>
        <input type='text' className='' placeholder='paste a emoji only' onChange={(e) => emojiMeaning(e.target.value)} />
        <Link to='/searchEmoji'><button className='btn btn-primary'>Search emoji</button></Link>
      </div>

      <div className='mt-5'>
        <h3>Meaning : <span style={{ color: color }}>{meaning}</span> {emoji}</h3>
      </div>
      <h6 className='mt-5'>We know about <span style={{ color: color }}>emoji's</span></h6>
      <div>
        {
          objectKey.map(item => {
            return <span key={item}
              style={{ fontSize: '1.5rem', padding: '0.5rem', cursor: 'pointer' }}
              onClick={() => clickEmoji(item)}
            >{item}</span>

          })
        }
      </div>

      <h3 className='mt-5'>API <span style={{ color: color }}>emoji</span></h3>
      <EmojiApi setMeaning={setMeaning} setEmoji={setEmoji} />
    </>
  )
}

export default EmojiHeader;