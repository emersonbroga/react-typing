import React, { useState, useEffect, useRef } from 'react';

import CompletedWords from './components/CompletedWords';
import Ended from './components/Ended';
import Timer from './components/Timer';
import Word from './components/Word';

import { getWord } from './helpers/strings';
import { isValidKey } from './helpers/validate';
import { MAX_TYPED_KEYS, WORD_ANIMATION_INTERVAL, TIMER_DURATION } from './helpers/configs';

const App = () => {
  const [typedKeys, setTypedKeys] = useState(['']);
  const [validKeys, setValidKeys] = useState([]);
  const [completedWords, setCompletedWords] = useState([]);
  const [word, setWord] = useState('');
  const [timerRunning, setTimerRunning] = useState(false);
  const [ended, setEnded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setWord(getWord());
    if (containerRef) containerRef.current.focus();
  }, []);

  useEffect(() => {
    const wordFromValidKeys = validKeys.join('').toLowerCase();

    let timeout = null;
    if (word && word === wordFromValidKeys) {
      timeout = setTimeout(() => {
        let newWord = null;
        do {
          newWord = getWord();
        } while (completedWords.includes(newWord));

        setWord(newWord);
        setValidKeys([]);
        setCompletedWords((prev) => [...prev, word]);
      }, WORD_ANIMATION_INTERVAL);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [word, validKeys, completedWords]);

  const getTimerValue = (v) => {
    if (v > 0) return;
    setTimerRunning(false);
    setEnded(true);
  };

  const onRestart = (e) => {
    e.preventDefault();
    setTypedKeys(['']);
    setValidKeys([]);
    setCompletedWords([]);
    setTimerRunning(false);
    setEnded(false);

    setWord(getWord());
    if (containerRef) containerRef.current.focus();
  };

  const handleKeyDown = (e) => {
    e.preventDefault();
    if (ended) return;

    const { key } = e;
    if (!timerRunning) setTimerRunning(true);
    setTypedKeys((prev) => [...prev, key].slice(MAX_TYPED_KEYS * -1));

    if (isValidKey(key, word)) {
      setValidKeys((prev) => {
        const isValidLength = prev.length <= word.length;
        const isNextChar = isValidLength && word[prev.length] === key;
        return isNextChar ? [...prev, key] : prev;
      });
    }
  };

  return (
    <div className="container" tabIndex="0" onKeyDown={handleKeyDown} ref={containerRef}>
      <Timer duration={TIMER_DURATION} isRunning={timerRunning} getValue={getTimerValue} />
      <div className="valid-keys">
        <Word word={word} validKeys={validKeys} />
      </div>
      <div className="typed-keys">{typedKeys ? typedKeys.join(' ') : null}</div>
      <div className="completed-words">
        <CompletedWords data={completedWords} />
      </div>
      <Ended ended={ended} completedWords={completedWords} duration={TIMER_DURATION} onRestart={onRestart} />
    </div>
  );
};

export default App;
