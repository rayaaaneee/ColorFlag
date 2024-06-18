const getPluralWord = (word: string): string  => 
    (word.endsWith('y') ? word.slice(0, -1) + 'ies' : word + 's');

export default getPluralWord;