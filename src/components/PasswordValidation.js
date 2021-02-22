import React, { useState } from "react";

export default function PasswordValidation() {
  const rules = [
    { id: 1, text: "The length is at least 8." },
    { id: 2, text: "It contains at least one digit." },
    { id: 3, text: "It contains at least one lowercase English character." },
    { id: 4, text: "It contains at least one uppercase English character." },
    {
      id: 5,
      text:
        "It contains at least one special character. The special characters are: !@#$%^&*()-+",
    },
  ];

  const [inputValue, setInputValue] = useState("");
  const [atleast8, setAtLeast8] = useState(false);
  const [digit, setDigit] = useState(false);
  const [lowerCase, setlowerCase] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [special, setSpecial] = useState(false);
  const strength =
    atleast8 && digit && lowerCase && upperCase && special ? "strong" : "weak";

  let message = `Password is  ${strength}.${atleast8 ? "" : rules[0].text} ${
    digit ? "" : rules[1].text
  } ${lowerCase ? "" : rules[2].text} ${upperCase ? "" : rules[3].text} ${
    special ? "" : rules[4].text
  }`;

  const validation = (value) => {
    if (new RegExp("^(?=.{8,})").test(value)) {
      setAtLeast8(true);
    } else {
      setAtLeast8(false);
    }
    if (new RegExp("^(?=.*[a-z])").test(value)) {
      setlowerCase(true);
    } else {
      setlowerCase(false);
    }
    if (new RegExp("^(?=.*[A-Z])").test(value)) {
      setUpperCase(true);
    } else {
      setUpperCase(false);
    }
    if (new RegExp("^(?=.*[0-9])").test(value)) {
      setDigit(true);
    } else {
      setDigit(false);
    }
    if (new RegExp("^(?=.*[!@#$%^()+&*])").test(value)) {
      setSpecial(true);
    } else {
      setSpecial(false);
    }
    return message;
  };
  const handleChange = (value) => {
    setInputValue(value, validation(value));
  };

  return (
    <div className="main">
      <h3>Question 2: Password Validation</h3>
      <form>
        <input
          placeholder="Enter password..."
          type="password"
          onChange={(e) => handleChange(e.target.value)}
          className="pattern-input"
          style={{
            border: strength === "strong" ? "0.1rem solid green" : "",
          }}
        />
      </form>

      <p className={strength}>{inputValue.length > 0 ? message : null}</p>
    </div>
  );
}
