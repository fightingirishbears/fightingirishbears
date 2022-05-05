import ReactDOM from 'react-dom/client';
import Playboard from './Playboard';
//import Playboard_v3 from './Playboard_v3';
import Playboard_orig from './Playboard_orig';

import Mainboard from './Mainboard';

import './App.css';

import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';


function App() {

  //const words = useState([{word: "tractor"}, {word: "egg"}, {word: "flax"}])
  //const words = [{word: "tractor"}, {word: "egg"}, {word: "flax"}, {word: "barn"}, {word: "wheat"}, {word: "combine"}, {word: "apple"}, {word: "sheep"}, {word: "canola"}, {word: "cow"}, {word: "chicken"}]

  const words = [{word: "golf"}, {word: "ball"}, {word: "birdie"}, {word: "eagle"}, {word: "flag"}, {word: "putter"}, {word: "driver"}]



  return (
    <div className="App">
      <Playboard words={words}/>
    </div>
  );
}

export default App;
