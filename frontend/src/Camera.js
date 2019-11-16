import React, {useState} from 'react';
import Camera from 'react-html5-camera-photo';
import Tesseract from 'tesseract.js';
import { Link } from "@reach/router";
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

function parsePrice(text){
  try {
    const match = text.match(/\d+[\.|\,]\d{1,2}/gm);
    return match[0]
  } catch(e) {
    return 9.99;
  }
}

function CameraWrapper(props) {
  const [text, setText] = useState('');
  const [price, setPrice] = useState('');
  const [timespan, setTimespan] = useState('chocolate');

  const recognize = (dataUrl) => {
    Tesseract.recognize(
      dataUrl,
      'eng',
      { logger: m => console.log(m) }
    ).then((data) => {
      console.log(data);
      const { text } = data;
      setPrice(parsePrice(text));
      setText(text);
    })
  }

  const submit = (e) => {
    e.preventDefault();
    console.log(e);
  }

  return (
    <div>
      <Link to="/" className="home-button">X</Link>
      <Camera
        isImageMirror={false}
        onTakePhoto = { (dataUri) => { recognize(dataUri) } }
      />
      <form onSubmit={submit}>
        {/* <div>
          <label>Name: </label>
          <input 
            type="text" 
            value={text} 
            onChange={(e) => setText(e.target.value)}
          />
        </div> */}
        <div>
          <input 
            type="text" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
          />
        </div>
        <div>
          <Select 
            className="selector"
            value={timespan} 
            onChange={(value) => setTimespan(value)}
            options={options}
          />
        </div>
        <input type="submit" value="Search" />
      </form>
    </div>
  )
}

export default CameraWrapper;