const getText = () => document.getElementById("inputText").value;
const getShift = () => parseInt(document.getElementById("inputShift").value);

const string ="Ala ma kota, a kot ma Alę";

const statPl = {
    a:	8.91,
    ą:	0.99,
    b:	1.47,
    c:	3.96,
    ć:	0.40,
    d:	3.25,
    e:	7.66,
    ę:	1.11,
    f:	0.30,
    g:	1.42,
    h:	1.08,
    i:	8.21,
    j:	2.28,
    k:	3.51,
    l:	2.10,
    ł:	1.82, 
    m:	2.80,
    n:	5.52,
    ń:	0.20,
    o:	7.75,
    ó:	0.85,
    p:	3.13,
    q:	0.14,
    r:	4.69,
    s:	4.32,
    ś:	0.66,
    t:	3.98,
    u:	2.50,
    v:	0.04,
    w:	4.65,
    x:	0.02,
    y:	3.76,
    z:	5.64,
    ź:	0.06,
    ż:	0.83,
};


const alphabetPl = [
    'a',
    'ą',
    'b',
    'c',
    'ć',
    'd',
    'e',
    'ę',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'ł',
    'm',
    'n',
    'ń',
    'o',
    'ó',
    'p',
    'q',
    'r',
    's',
    'ś',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    'ź',
    'ż',
];

function countLetters (string, char)
{
    char = char.toUpperCase();
    string = string.toUpperCase();
    let charCounter = 0
    for (position = 0; position < string.length; position ++)
    {
        string.charAt(position) == char ? charCounter += 1 : charCounter;
    }
    return charCounter;
};

function calcPercentLetters (string, stat)
{
    let statString = new Object();
    Object.keys(stat).map(letter => statString[letter] = countLetters(string,letter));
    let letterNumber = 0;
    for (let letter in statString){
        if (statString.hasOwnProperty(letter)){
            letterNumber += parseFloat( statString[letter]);
        };
    };
    for (let letter in statString){
        if (statString.hasOwnProperty(letter)){
            statString[letter] = statString[letter]*100/letterNumber;
        };
    };
    return statString;
};

function findKey (string, stat, alphabet)
{
    let lowestDiff = Infinity;
    let loopBest = null;
    const statString = calcPercentLetters(string, stat);

    for (let i = 0; i <  alphabet.length; i++)
    {        
        const tekstVsStatistic = alphabet.map(letter => Math.abs(
            alphabet.indexOf(letter)+i < alphabet.length ? stat[alphabet[alphabet.indexOf(letter)+i]] - statString[letter] : stat[alphabet[-1+i-(alphabet.length-1-alphabet.indexOf(letter))]] - statString[letter]));
        const difference = tekstVsStatistic.reduce((a, b) => a + b, 0);

        if (lowestDiff > difference) {
            lowestDiff = difference;
            loopBest = i;
            console.log(`Najmniejszą różnicę równą ${lowestDiff} znaleziono przy pętli ${loopBest}. Stary klucz wynosił: ${alphabet.length - loopBest}`);
        };
    };
    return loopBest;
    // document.getElementById(wherePrint).innerText = `Poszukiwany klucz: ${alphabet.length -loopBest}`
};



function cipherAlphabet (string, stat, alphabet, wherePrint) 
{
    const alphabetUpper = alphabet.map(letter => letter.toUpperCase());
    const key = findKey (string, stat, alphabet);
    const isLetterLow = (letter, key) => alphabet.includes(alphabet[alphabet.indexOf(letter) + key]);
    const isLetterUpp = (letter, key) => alphabetUpper.includes(alphabetUpper[alphabetUpper.indexOf(letter) + key]);

    const charArray = string.split('');
    const codedCharArray = charArray.map(letter => 
        isLetterLow(letter, 0) && isLetterLow(letter, key) ? alphabet[alphabet.indexOf(letter)+key] :
            isLetterLow(letter, 0) && (alphabet.indexOf(letter) + key) >= alphabet.length ? alphabet[(- 1) + (key - ((alphabet.length -1) - alphabet.indexOf(letter)))] :
                isLetterLow(letter, 0) && (alphabet.indexOf(letter) + key) < 0 ? alphabet[(alphabet.length) + (key + alphabet.indexOf(letter))] :
                    isLetterUpp(letter, 0) && isLetterUpp(letter, key) ? alphabetUpper[alphabetUpper.indexOf(letter)+ key] :
                        isLetterUpp(letter, 0) && (alphabetUpper.indexOf(letter) + key) >= alphabetUpper.length ? alphabetUpper[(- 1) + (key - ((alphabetUpper.length -1) - alphabetUpper.indexOf(letter)))] :
                            isLetterUpp(letter, 0) && (alphabetUpper.indexOf(letter) + key) < 0 ? alphabetUpper[(alphabetUpper.length) + (key + alphabetUpper.indexOf(letter))] :
                                letter
    );
    const massage = codedCharArray.join("");
    document.getElementById(wherePrint).innerText = massage;
};

function cipherAsci (string, shift, wherePrint) 
{
    const A = "A".charCodeAt('');
    const Z = "Z".charCodeAt('');
    const a = "a".charCodeAt('');
    const z = "z".charCodeAt('');
    const realShift = shift % (Z - A + 1);
    const isLetterUpp = (ascii) => ascii >= A && ascii <= Z;
    const isLetterLow = (ascii) => ascii >= a && ascii <= z;

    let charArray = string.split('');
    const asciiArray = charArray.map(letter => letter.charCodeAt(''));
    const codedAsciiArray = asciiArray.map(ascii => 
        isLetterLow(ascii) && isLetterLow(ascii + realShift) ? ascii + realShift :
            isLetterLow(ascii) && (ascii + realShift) > z ? (a - 1) + (realShift - (z - ascii)) :
                isLetterLow(ascii) && (ascii + realShift) < a ? (z + 1) + (realShift + (ascii - a)) :
                    isLetterUpp(ascii) && isLetterUpp(ascii + realShift) ? ascii + realShift :
                        isLetterUpp(ascii) && (ascii + realShift) > Z ? (A - 1) + (realShift - (Z - ascii)) :
                            isLetterUpp(ascii) && (ascii + realShift) < A ? (Z + 1) + (realShift + (ascii - A)) :
                                ascii        
    );
        
    const codedCharArray = codedAsciiArray.map(ascii => String.fromCharCode(ascii));
    const massage = codedCharArray.join("");
    document.getElementById(wherePrint).innerText = massage
};

