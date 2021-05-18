function getText()  { return document.getElementById("inputText").value };
function getShift() { return parseInt(document.getElementById("inputShift").value) };

function cipher (string, shift, wherePrint) {
    const A = "A".charCodeAt('');
    const Z = "Z".charCodeAt('');
    const a = "a".charCodeAt('');
    const z = "z".charCodeAt('');

    let charArray = string.split('');
    console.log(charArray);
    charArray = charArray.map(letter => letter.charCodeAt(''));
    console.log(charArray);
    charArray = charArray.map(ascii => ascii >= A && ascii <= Z  || ascii >= a && ascii <= z ? ascii + shift : ascii);
    console.log(charArray);
    charArray = charArray.map(ascii => String.fromCharCode(ascii));
    console.log(charArray);
    let massage = "";
    massage = charArray.join("");
    console.log(massage);
    document.getElementById(wherePrint).innerText = massage

};