function getText()  { return document.getElementById("inputText").value };
function getShift() { return parseInt(document.getElementById("inputShift").value) };

function cipherString (string, shift, wherePrint) {
    const A = "A".charCodeAt('');
    const Z = "Z".charCodeAt('');
    const a = "a".charCodeAt('');
    const z = "z".charCodeAt('');
    function isLetterUpp(ascii) { return ascii >= A && ascii <= Z};
    function isLetterLow(ascii) { return ascii >= a && ascii <= z};


    let charArray = string.split('');
    // console.log("Tablica liter: " + charArray);
    const asciiArray = charArray.map(letter => letter.charCodeAt(''));
    // console.log("Tablica ascii: " + asciiArray);
    const codedAsciiArray = asciiArray.map(ascii => isLetterUpp(ascii) || isLetterLow(ascii) ? ascii + shift : ascii);
    // console.log("Tablica zakodowanych ascii: " + codedAsciiArray);
    const codedCharArray = codedAsciiArray.map(ascii => String.fromCharCode(ascii));
    // console.log("Tablica zakodowanych liter: " + codedCharArray);
    const massage = codedCharArray.join("");
    document.getElementById(wherePrint).innerText = massage
};