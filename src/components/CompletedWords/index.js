import React from 'react';

const CompletedWords = ({ data }) => {
  if (!data) return null;

  return (
    <ol>
      {data.map((word) => (
        <li key={word}>{word}</li>
      ))}
    </ol>
  );
};

export default CompletedWords;
