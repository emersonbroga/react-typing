import React from 'react';

const Word = ({ word, validKeys }) => {
  if (!word) return null;
  const joinedKeys = validKeys.join('');
  const matched = word.slice(0, joinedKeys.length);
  const remainder = word.slice(joinedKeys.length);

  const matchedClass = joinedKeys === word ? 'matched completed' : 'matched';

  return (
    <>
      <span className={matchedClass}>{matched}</span>
      <span className="remainder">{remainder}</span>
    </>
  );
};

export default Word;
