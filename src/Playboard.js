import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import styled from "styled-components";
import Modal from "react-modal";

//import Selectword from './Selectword';

//import Button from 'react-bootstrap/Button';
//  npm install react-bootstrap bootstrap

export default function WordsList({ words }) {

    // think maybe once we got the random word for the day this might be ok as we will always 
    // bring that word in so it wont try and reload page????/

    const random = Math.floor(Math.random() * words.length)
    const currentword = 'EGGS' //words[random].word.toUpperCase()
    const currentwordlength = currentword.length
    const numrows = currentwordlength+1


/////////////////////////////////////////////////////////////
// https://api.dictionaryapi.dev/api/v2/entries/en/<word>
//  use this to send in and see if real word
////////////////////////////////////////////////////////////////

    
// turn word into an array so can map over it
const wordArray = currentword.split("")

//const first = wordArray[1]
    
var SWStyle = {
    display: 'inline-block',
    textAlign: "center",
    margin: 5,
    height: 35,
    width: 35,
    padding: 0,
    backgroundColor: "#FFF",
    WebkitFilter: "drop-shadow(0px 0px 5px #555)",
    filter: "drop-shadow(0px 0px 5px #555)"
    };





var Main = styled.main`
  font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

var Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 100%;
  
  padding-bottom: 15%;
  padding-top: 10%;

  font-weight: 700;
  font-size: 3.6rem;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
`;


var GameSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding-bottom: 25px;
`;

var TileContainer = styled.div`
  display: grid;
  //grid-template-rows: repeat(12, 1fr);
  grid-template-rows: repeat(eval(numrows), 1fr);

  grid-gap: 5px;

  //grid-template-rows:  ${props => props.rows};
  //margin: ${props => props.size};
  //padding: ${props => props.size};

  height: 720px;
  width: 650px;
`;

var TileRow = styled.div`
  width: 100%;

  display: grid;
  //grid-template-columns: repeat(11, 1fr);
  grid-template-columns: repeat(eval(currentwordlength), 1fr);
  //grid-template-columns: ${props => props.columns};
  grid-gap: 5px;
`;

var Tile = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  border: 2px solid #3a3a3c;
  font-size: 3.2rem;
  font-weight: bold;
  line-height: 3.2rem;
  text-transform: uppercase;

  user-select: none;
`;

///////////////////////////////////////////////////////////
//  KEYBOARD
///////////////////////////////////////////////////////////

const KeyboardSection = styled.section`
  height: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const KeyboardRow = styled.div`
  width: 100%;
  margin: 0 auto 8px;

  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const KeyboardButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0 6px 0 0;
  height: 58px;
  flex: 1;

  border: 0;
  border-radius: 4px;
  background-color: #818384;
  font-weight: bold;
  text-transform: uppercase;
  color: #d7dadc;

  cursor: pointer;
  user-select: none;

  &:last-of-type {
    margin: 0;
  }
`;






///////////////////////////////////////////////////////////////
// for some reason can't update the existing.. should be able
// not working so just hard code this in to get proper grid
///////////////////////////////////////////////////////////////
if (currentwordlength === 3) {
  TileContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 5px;

  height: 720px;
  width: 650px;
`;

TileRow = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5px;
`;

} else if (currentwordlength === 4) {
  TileContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 5px;

  height: 720px;
  width: 650px;
`;

TileRow = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5px;
`;

} else if (currentwordlength === 5) {
  TileContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 5px;

  height: 720px;
  width: 650px;
`;

TileRow = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
`;

}  else if (currentwordlength === 6) {
  TileContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(7, 1fr);
  grid-gap: 5px;

  height: 720px;
  width: 650px;
`;

TileRow = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 5px;
`;

} else if (currentwordlength === 7) {
  TileContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(8, 1fr);
  grid-gap: 5px;

  height: 720px;
  width: 650px;
`;

TileRow = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 5px;
`;

}


//////////////////////////////////////////////////////////////////////

// old school way...
function Avatar()  {
            var avatarStyle = {
                marginLeft: 27,
                marginTop: 20,
                width: 175,
                height: 150,
                borderRadius: "20%"
            }
            return (
                <img src="house_finch.png" alt="profile pic" style={avatarStyle}/>

            )
}


/////////////////////////////////////////////////////////////////////


//console.log(TileContainer)

// rows="repeat({numrows}, 1fr)"
//columns="repeat({currentwordlength}, 1fr)"
//r.style.setProperty('--blue', 'lightblue');
//TileContainer.grid-template-rows = "repeat(12, 1fr)"
//TileContainer.grid-template-rows = repeat(16, 1fr);


//{ alert('Nice pick!'); }


/////////////////////////////////////////////////////////////////////
//  CODE
/////////////////////////////////////////////////////////////////////


// used in array of guesses
let letterIndex = useRef(0)
let round = useRef(0)

// valid keys.  maybe use later to map out keyboard
const keyboardRows = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"],
    ];


const allKeys = keyboardRows.flat();






useEffect(() => {
    //Modal.setAppElement("#share")

    document.addEventListener("keydown", handleKeyPress)

    return () => document.removeEventListener("keydown", handleKeyPress)
}, [])



const validateWord = (word) => {
    console.log("Try validate the word now: ", word)
    let url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word
    return fetch(url, {
        method: "GET",
    })
        // promise is full filled, use .then

        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => console.log("fetching and parsing data error:  ", error));
        

}


const handleClick = (key, e) => {
    e.preventDefault()      // trying to stop screen refresh?
    //e.stopPropagation()
    //need to render this in the grid now.
    console.log(key)

    enterGuess(key, e)

}

const enterGuess = (key, e) => {

    e.preventDefault()       // trying to stop screen refresh?

    if (key === "enter") {
        validateWord('eggs')
    }

    //TO DO////////////////////////////////////////////////////////
    // need to check if valid word
    // if enter on the last letter in word, need to check if valid word
    // if it is, need to see if letters match etc and update colours.  green, correct spot and letter.  yellow is correct letter, wrong spot.  white as default
    // need to move to next row as well

    if (key === "backspace") {
        eraseLetter(e)
    } else if (key !== "enter") {
        submitLetter( key, e )
        
    }
}


const submitLetter = ( key, e ) => {

    e.preventDefault()
    const _letterIndex = letterIndex.current;
    const _round = round.current;

    // ***want to make sure cant guess more than length of theword!!***
    if (_letterIndex < currentwordlength) {
        setMatrix((prev) => {  
        const newGuesses = { ...prev }
        newGuesses[_round][_letterIndex] = key //.toLowerCase();
        return newGuesses
        })

        //alert('grrr WHY IS IT REFRESHING! bring in new word.  refreshing page??') 
        
        //whoops need this inside the if statement otherwise array getting bigger and boxes are messed up....
        console.log(matrix)
        letterIndex.current = _letterIndex + 1
    }
}



const eraseLetter = (e) => {
    //e.preventDefault()

    // initialize
    const _letterIndex = letterIndex.current
    const _round = round.current

    // lets remove from array
    if (_letterIndex !== 0) {
        setMatrix((prev) => {
            const newGuesses = { ...prev }
            newGuesses[_round][_letterIndex - 1] = null
            return newGuesses
        })

        //whoops need this inside the if statement otherwise array getting bigger and boxes are messed up....
        console.log (letterIndex.current)
        letterIndex.current = _letterIndex - 1
    }
}




const handleKeyPress = (e) => {
    //e.preventDefault()
    const key = e.key.toLowerCase();   //want to make sure all lowercase

    //  making sure only using valid keys to press.  dont need amperands etc....
    if (allKeys.includes(key)) {
        enterGuess(key, e);
    }
}






// declaring a state variable and setting it.  use setMatrix to update it
const [matrix, setMatrix] = useState(Array.from({length: numrows},()=> Array.from({length: currentwordlength}, () => null)));

//const matrix = new Array(numrows).fill("").map(() => new Array(currentwordlength).fill(""));


//console.log('Key is: ', matrix[0][1]);
//console.log(matrix)


//  um try and get rid of that error....  The component styled.section with the id of "sc-dGHKFW" has been created dynamically.
// You may see this warning because you've called styled inside another component.
// To resolve this only create new StyledComponents outside of any render method and function component.
const grid = () => {
return 
(
                <TileContainer>
                  {Object.values(matrix).map((word, i) => (
                    <TileRow key={i}>
                      {word.map((letter, i) => (
                        <Tile key={i}>{letter}</Tile>
                      ))}
                    </TileRow>
                  ))}
                </TileContainer>


)
}


/*    useEffect(() => {
        const handleKeyDown = (e) => {
            if (allKeys.includes(e.key)) {
                console.log(e.key);
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, [])

*/

//<TileContainer> 
//    {Object.values(matrix).map((word, i) => (
//   //{[...Array(numrows).keys()].map((i) => (
//        <TileRow key={i}>
//            //{[...Array(currentwordlength).keys()].map((i) => (
//            {word.map((letter, i) => (
//                <Tile key={i}>{i}</Tile>
//                //{console.log()}
//            ))}
//        </TileRow>
//    ))}              
//</TileContainer>


    return (
        <Main>

            <Header>
                <Avatar/>
                    word: {currentword}
                <Avatar/>
            </Header>

          
            <GameSection>
                <TileContainer>
                  {Object.values(matrix).map((word, i) => (
                    <TileRow key={i}>
                      {word.map((letter, i) => (
                        <Tile key={i}>{letter}</Tile>
                      ))}
                    </TileRow>
                  ))}
                </TileContainer>
            </GameSection>



            <KeyboardSection>
                <KeyboardRow>
                  {["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"].map((key) => (
                    <KeyboardButton onClick={(e) => handleClick(key, e)}>{key}</KeyboardButton>
                  ))}
                </KeyboardRow>
                <KeyboardRow>
                  {["a", "s", "d", "f", "g", "h", "j", "k", "l"].map((key) => (
                    <KeyboardButton onClick={(e) => handleClick(key, e)}>{key}</KeyboardButton>
                  ))}
                </KeyboardRow>
                <KeyboardRow>
                  {["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"].map(
                    (key) => (
                      <KeyboardButton onClick={(e) => handleClick(key, e)}>{key}</KeyboardButton>
                    )
                  )}
                </KeyboardRow>
              </KeyboardSection>


        </Main>
    



    );

}