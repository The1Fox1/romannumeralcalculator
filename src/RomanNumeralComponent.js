import React, { useState } from "react";

export default function RomanNumeralComponent() {
  const [calculatedAnswer, updateAnswer] = useState("Nulla");
  const [input, updateInput] = useState("");
  //tried hooks. didnt go well
  //const [RomanString, updateRomanStr] = useState("");

  //Id noramlly keep this in state but because this is a functional component and wanted to keep it that way
  var RomanString = "";

  const convertToRoman = total => {
    let sTotal = total.toString();
    let totalArr = [];

    //im going to break up our total and turn it into an array based on place value
    for (let i = 0; i < sTotal.length; i++) {
      totalArr.push(sTotal.charAt(i));
    }

    //each of these subsequent functions are responsible for calculating the numeral based on the place value
    //TODO simplify and abstract
    const calculateThouasands = num => {
      addToRomanString(num, "M");
    };
    const calculateHundreds = num => {
      switch (num) {
        case 9:
          addToRomanString(1, "CM");
          break;
        case 8:
        case 7:
        case 6:
          addToRomanString(1, "D");
          addToRomanString(num - 5, "C");
          break;
        case 5:
          addToRomanString(1, "D");
          break;
        case 4:
          addToRomanString(1, "CD");
          break;
        default:
          addToRomanString(num, "C");
      }
    };
    const calculateTens = num => {
      switch (num) {
        case 9:
          addToRomanString(1, "XC");
          break;
        case 8:
        case 7:
        case 6:
          addToRomanString(1, "L");
          addToRomanString(num - 5, "X");
          break;
        case 5:
          addToRomanString(1, "L");
          break;
        case 4:
          addToRomanString(1, "XL");
          break;
        default:
          addToRomanString(num, "X");
      }
    };
    const calculateOnes = num => {
      switch (num) {
        case 9:
          addToRomanString(1, "IX");
          break;
        case 8:
        case 7:
        case 6:
          addToRomanString(1, "V");
          addToRomanString(num - 5, "I");
          break;
        case 5:
          addToRomanString(1, "V");
          break;
        case 4:
          addToRomanString(1, "IV");
          break;
        default:
          addToRomanString(num, "I");
      }
    };

    //these will determine which plave value is evaluated and continue to the next smallest place
    //TODO simplify and abstract
    if (totalArr.length === 4) {
      //return M x times
      calculateThouasands(parseInt(totalArr[0]));
    }
    if (totalArr.length >= 3) {
      totalArr = totalArr.slice(-3);
      calculateHundreds(parseInt(totalArr[0]));
    }
    if (totalArr.length >= 2) {
      totalArr = totalArr.slice(-2);
      calculateTens(parseInt(totalArr[0]));
    }
    if (totalArr.length >= 1) {
      totalArr = totalArr.slice(-1);
      calculateOnes(parseInt(totalArr[0]));
    }
  };

  const addToRomanString = (num, romanNumeral) => {
    for (let i = 0; i < num; i++) {
      //updateRomanStr(RomanString + romanNumeral);
      RomanString += romanNumeral;
    }
  };

  const addAndConvertToRomanNumerals = ints => {
    // Calculate the total
    let sum = calculateTotal(ints);

    //Calculate Roman Numeral by place value

    //check for non numbers
    //if (typeof int != "number") return "Please enter numbers only";
    //check for 0 sum
    if (sum === 0) return "nulla";

    convertToRoman(sum);

    return RomanString;
  };

  //sum of array elements
  const calculateTotal = arr => {
    let sum = null;

    arr.forEach(int => {
      sum += int;
    });
    return sum;
  };

  const addNumbers = inputString => {
    const numbersStringArray = inputString.split(",");
    const numbers = numbersStringArray.map(numberAsString => {
      return parseInt(numberAsString, 10);
    });

    /* numbers is an array of ints. E.g. [1, 2, 3] */
    const answer = addAndConvertToRomanNumerals(numbers);

    return answer;
  };

  const handleChange = event => {
    updateInput(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const answer = addNumbers(input);
    updateAnswer(answer);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label style={{ paddingRight: "10px" }}>
          <span style={{ paddingRight: "10px" }}>
            Numbers (separated by commas):
          </span>
          <input type="text" name="input-form" onChange={handleChange} />
        </label>
        <input type="submit" value="Add Numbers" />
      </form>
      <div>Answer in Roman Numerals: {calculatedAnswer}</div>
    </div>
  );
}
