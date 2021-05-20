getText = () => document.getElementById("inputText").value;
getShift = () => parseInt(document.getElementById("inputShift").value);

function cipherString (string, shift, wherePrint) {
    const A = "A".charCodeAt('');
    const Z = "Z".charCodeAt('');
    const a = "a".charCodeAt('');
    const z = "z".charCodeAt('');
    const realShift = shift % (Z - A + 1);
    isLetterUpp = (ascii) => ascii >= A && ascii <= Z;
    isLetterLow = (ascii) => ascii >= a && ascii <= z;
 


    let charArray = string.split('');
    // console.log("Tablica liter: " + charArray);
    const asciiArray = charArray.map(letter => letter.charCodeAt(''));
    // console.log("Tablica ascii: " + asciiArray);
    const codedAsciiArray = asciiArray.map(ascii => 
        isLetterLow(ascii) && isLetterLow(ascii + realShift) ? ascii + realShift :
            isLetterLow(ascii) && (ascii + realShift) > z ? (a - 1) + (realShift - (z - ascii)) :
                isLetterLow(ascii) && (ascii + realShift) < a ? (z + 1) + (realShift + (ascii - a)) :
                    isLetterUpp(ascii) && isLetterUpp(ascii + realShift) ? ascii + realShift :
                        isLetterUpp(ascii) && (ascii + realShift) > Z ? (A - 1) + (realShift - (Z - ascii)) :
                            isLetterUpp(ascii) && (ascii + realShift) < A ? (Z + 1) + (realShift + (ascii - A)) :
                                ascii        
    );

        
    // console.log("Tablica zakodowanych ascii: " + codedAsciiArray);
    const codedCharArray = codedAsciiArray.map(ascii => String.fromCharCode(ascii));
    // console.log("Tablica zakodowanych liter: " + codedCharArray);
    const massage = codedCharArray.join("");
    document.getElementById(wherePrint).innerText = massage
};