const uppercaseFirstWordsLetters = (sentence: string): string => 
    (sentence.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));

export default uppercaseFirstWordsLetters;