import { useState } from 'react';
import { Letters } from './letters';
import { Dictionary } from './dictionary';
import { Matrix } from './matrix';

function App() {
  
  const [word, setWord] = useState('');
  const [currentLetter, setCurrentLetter] = useState(null);
  const [userLetters, setUserLetters] = useState([]);

  const clickLetterHandler = (letter, i) => {
    const current = { char: letter, index: i };
    
    setWord(prevWord => `${prevWord + letter}`);
    setCurrentLetter(prevLetter => ({ ...prevLetter, ...current }));
    setUserLetters(prevLetters => ([ ...prevLetters, current ]));
  };

  const clearWordHandler = () => {
    setWord('');
    setCurrentLetter(null);
    setUserLetters([]);
  };

  const isValidWord = () => {
    if(word !== '') {
      return Dictionary.words.filter(w => w.startsWith(word)).length > 0 ? 'valid' : 'invalid'
    }
    return '';
  };
  
  const isSibling = i => {
    if(!currentLetter) return true;
    let [x, y] = Matrix[currentLetter.index];
    let [tx, ty] = Matrix[i];
    return Math.abs(x - tx) <= 1 && Math.abs(y - ty) <= 1;
  };
  
  const userSelected = i => {
    let classes = '';
    if(!userLetters.length) return classes;
    classes = userLetters.find(l => l.index === i) ? isValidWord() : '';
    return classes;
  };
  
  return (
    <>
      <div className='game'>
        { word !== '' &&  <div className='clear' onClick={ clearWordHandler }>clear word <i>x</i></div> }
        <div className='letters'>
          {
            Letters.board.map((l, i) => {
              const letter = l.toLowerCase()
              return <button className={ userSelected(i) } 
                             disabled={ userSelected(i) !== '' || !isSibling(i) }
                             key={ i } 
                             onClick={ () => clickLetterHandler(letter, i) }>{ letter }
                     </button>
              }
            )
          }
        </div>
        <div className={`output ${ isValidWord() }`}>
          { word }
          <em>{ isValidWord() }</em>
        </div>
      </div>
    </>
  );
}

export default App;