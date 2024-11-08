import React, { useState } from 'react';

export default function TextForm(props) {
  const handleUpClick = () => {
    setText(text.toUpperCase());
    props.showAlert("Converted To Uppercase","success");
  };

  const handleLoClick = () => {
    setText(text.toLowerCase());
    props.showAlert("Converted To Lowercase","success");
  };

  const handleClearClick = () => {
    setText('');
    props.showAlert("Text Cleared","success");
  };

  const handleSpeakClick = () => {
    const Speech = new SpeechSynthesisUtterance();
    Speech.lang = 'en-US';
    Speech.text = text;
    window.speechSynthesis.speak(Speech);
    props.showAlert("Converted To Speech","success");
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  // Toggle bold styling
  const handleBoldClick = () => {
    setIsBold(!isBold);
    props.showAlert("Converted To Bold","success");
  };

  // Toggle italic styling
  const handleItalicClick = () => {
    setIsItalic(!isItalic);
    props.showAlert("Convert To Italic","success");
  };

  // Reset text and styling
  const handleResetClick = () => {
    setText('Enter Text Here');
    setIsBold(false);
    setIsItalic(false);
    props.showAlert("Text Has Been Reset","success");
  };

  // Find and Replace functionality
  const handleFindAndReplace = () => {
    const findText = prompt("Enter the word to find:");
    const replaceText = prompt("Enter the word to replace with:");
    if (findText && replaceText) {
      setText(text.replaceAll(findText, replaceText));
    }
    props.showAlert("Designated String Replaced","success");
  };

  const handleCapitalizeClick = () => {
    let lowercase = text.toLowerCase();
    let words = lowercase.split(" ");
    let newWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    let newText = newWords.join(" ");
    setText(newText);
    props.showAlert("Capitalized The First Characters","success");
  };

  // Email Extractor functionality
  const handleEmailExtractor = () => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const foundEmails = text.match(emailRegex);
    if (foundEmails) {
      alert(`Extracted Emails:\n${foundEmails.join('\n')}`);
      props.showAlert("Email Extracted","success");
    } else {
      alert("No emails found.");
      props.showAlert("No Email Extracted","warning");
    }
  };

  const handleToggleClick = () => {
    let words = text.split(" ");
    let newText = words
      .map((word) => {
        let newWord = "";
        for (let i = 0; i < word.length; i++) {
          let char = word.charAt(i);
          if (char >= "A" && char <= "Z") {
            char = char.toLowerCase();
          } else if (char >= "a" && char <= "z") {
            char = char.toUpperCase();
          }
          newWord += char;
        }

        return newWord;
      })
      .join(" ");

    setText(newText);
    props.showAlert("Case Toggled","success");
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(text);
    alert("Text copied to clipboard!");
    props.showAlert("Copied To Clipboard","success");
  };

  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "))
    props.showAlert("Extra Spaces Removed","success");
  }

  const [text, setText] = useState('Enter Text Here');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  return (
    <>
      <div className="container" style={{color: props.mode === 
       'dark'?'white':'#3b3b3b'}}>
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            style={{backgroundColor: props.mode === 
              'dark'?'grey':'white' , color: props.mode === 
              'dark'?'white':'#3b3b3b'}}
            id="myBox"
            rows="8"
          ></textarea>
        </div>
        <button className="btn btn-primary mx-2" onClick={handleUpClick}>
          Convert to Uppercase
        </button>
        <button className="btn btn-primary mx-2" onClick={handleLoClick}>
          Convert to Lowercase
        </button>
        <button className="btn btn-info mx-2" onClick={handleToggleClick}>
          Toggle Case
        </button>
        <button className="btn btn-info mx-2 my-2" onClick={handleCapitalizeClick}>
          Capitalize
        </button>
        <button className="btn btn-dark mx-2" onClick={handleBoldClick}>
          {isBold ? "Remove Bold" : "Bold Text"}
        </button>
        <button className="btn btn-warning mx-2" onClick={handleItalicClick}>
          {isItalic ? "Remove Italic" : "Italic Text"}
        </button>
        <button className="btn btn-secondary mx-2" onClick={handleCopyText}>
          Copy Text
        </button>
        <button className="btn btn-success mx-2" onClick={handleEmailExtractor}>
          Extract Emails
        </button>
        <button className="btn btn-success mx-2" onClick={handleExtraSpaces}>
          Remove Extra Spaces
        </button>
        <button className="btn btn-success mx-2" onClick={handleFindAndReplace}>
          Find and Replace
        </button>
        <button className="btn btn-secondary mx-2 my-2" onClick={handleSpeakClick}>
          Speak
        </button>
        <button className="btn btn-danger mx-2" onClick={handleResetClick}>
          Reset Text
        </button>
        <button className="btn btn-danger mx-2" onClick={handleClearClick}>
          Clear Text
        </button>
      </div>

      <div className="container my-4" style={{color: props.mode === 
       'dark'?'white':'#3b3b3b'}}>
        <h2>Your Text Summary</h2>
        <p>{text.split(" ").filter((word) => word.length > 0).length} Words and {text.trim().length} Characters</p>
        <p>{0.008 * text.split(" ").filter((word) => word.length > 0).length} Minutes Read</p>
        <h2>Preview</h2>
        {/* Apply bold and italic styling using conditional class names */}
        <p className={`${isBold ? 'fw-bold' : ''} ${isItalic ? 'fst-italic' : ''}`}>{text.length>0?text:"Enter Text To Preview"}</p>
      </div>
    </>
  );
}
