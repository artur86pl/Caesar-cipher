const testString = "To jest tekst testowy do sprawdzania mechaniki szyfru Cezara śćżź";

function printMassage(wherePrint, massage) { document.getElementById(wherePrint).innerText = massage };


function cipher (string, shift, wherePrint) {
    let charArray = string.split('');
    console.log(charArray);
    charArray = charArray.map(letter => letter.charCodeAt(''));
    console.log(charArray);
    charArray = charArray.map(ascii => ascii == 32 ? ascii : ascii + shift);
    console.log(charArray);
    charArray = charArray.map(ascii => String.fromCharCode(ascii));
    console.log(charArray);
    let massage = "";
    massage = charArray.join("");
    console.log(massage);
    document.getElementById(wherePrint).innerText = massage

}