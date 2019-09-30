import React, { useState } from "react";

export default function RomanNumeralComponent() {
  const [calculatedAnswer, updateAnswer] = useState("Nulla");
  const [input, updateInput] = useState("");
  //tried hooks. didnt go well
  //const [RomanString, updateRomanStr] = useState("");

  //These should preferably be in state but because this is a functional component and figured id keep it that way
  var RomanString = "";
  const RomanTable = {
    Thousands: {
      1: "M"
    },
    Hundreds: {
      9: "CM",
      5: "D",
      4: "CD",
      1: "C"
    },
    Tens: {
      9: "XC",
      5: "L",
      4: "XL",
      1: "X"
    },
    Ones: {
      9: "IX",
      5: "V",
      4: "IV",
      1: "I"
    }
  };

  const convertToRoman = total => {
    let sTotal = total.toString();
    let totalArr = [];

    //Break up our total and turn it into an array based on place value
    for (let i = 0; i < sTotal.length; i++) {
      totalArr.push(sTotal.charAt(i));
    }

    //Responsible for calculating the numeral based on the place value and the digit
    const calculatePlaceValue = (digit, place) => {
      switch (digit) {
        case 9:
          addToRomanString(1, RomanTable[place][9]);
          break;
        case 8:
        case 7:
        case 6:
        case 5:
          addToRomanString(1, RomanTable[place][5]);
          addToRomanString(digit - 5, RomanTable[place][1]);
          break;
        case 4:
          addToRomanString(1, RomanTable[place][4]);
          break;
        default:
          addToRomanString(digit, RomanTable[place][1]);
      }
    };

    //these will determine which plave value is evaluated and continue to the next smallest place
    //TODO simplify and abstract
    if (totalArr.length === 4) {
      calculatePlaceValue(parseInt(totalArr[0]), "Thousands");
    }
    if (totalArr.length >= 3) {
      totalArr = totalArr.slice(-3);
      calculatePlaceValue(parseInt(totalArr[0]), "Hundreds");
    }
    if (totalArr.length >= 2) {
      totalArr = totalArr.slice(-2);
      calculatePlaceValue(parseInt(totalArr[0]), "Tens");
    }
    if (totalArr.length >= 1) {
      totalArr = totalArr.slice(-1);
      calculatePlaceValue(parseInt(totalArr[0]), "Ones");
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

    //checks for 0 or NaN
    if (isNaN(sum)) return "Enter numbers only please";
    if (sum === 0) return "nulla";

    convertToRoman(sum);

    return RomanString;
  };

  const calculateTotal = arr => {
    let sum = null;

    arr.forEach(int => {
      sum += int;
    });
    return sum;
  };

  //i renamed your function since its more of a conversion than addition and i have a different function for summation
  const mapInputStrToArray = inputString => {
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
    const answer = mapInputStrToArray(input);
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
