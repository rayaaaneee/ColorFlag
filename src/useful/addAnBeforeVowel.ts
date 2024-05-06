const addAnBeforeVowel = (itemName: string) => {

    itemName = itemName.trim().toLocaleLowerCase();

    const vowels: string[] = ['a', 'e', 'i', 'o', 'u'];
    const startsWithVowel: boolean = vowels.includes(itemName[0].toLowerCase());

    const anWords: string[] = ['honest', 'honor', 'hour', 'heir', 'herb', 'homage', 'honorarium', 'honorific', 'honorificabilitudinitatibus'];
    const aWords: string[] = ['university', 'FBI', 'NATO', "one", "user", "unicorn", "universe"];

    const isAWord: boolean = aWords.includes(itemName);
    const isException: boolean = [...anWords, ...aWords].includes(itemName);
    
    let prefix = (isException === true ? (isAWord === true ? "a" : "an") : (startsWithVowel === true ? 'an' : 'a'));
    
    return prefix;
}

export default addAnBeforeVowel;