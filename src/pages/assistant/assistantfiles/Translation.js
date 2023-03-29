import React, { useState, useEffect, useRef } from 'react';

export default function Translation({ doStuff, setInput, result }) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState([]);
  const [height, setHeight] = useState(40);
  const dataContainerRef = useRef(null);

  useEffect(() => {
    if (currentIndex < result.length) {
      const newChar = result.charAt(currentIndex);
      setDisplayedText(prevText => prevText + newChar);
      const timeoutId = setTimeout(() => {
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 20);
      return () => clearTimeout(timeoutId);
    }  
  }, [currentIndex, result]);

  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [result]);

  const handleButtonClick = () => {
    setInput('')
    setDisplayedText('AI is thinking...');
    setCurrentIndex(0);
    doStuff();
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13  && !e.shiftKey) {
      e.preventDefault(); // prevent default behavior of the enter key
      handleButtonClick();
    } else if (e.keyCode === 191 ) {
      // "/" key was pressed, show options
      setShowOptions(true);
      setOptions(['Heading 1', 'Heading 2', 'Heading 3', 'Sub-Heading', 'Italics', 'Bullets', 'Numbering']);
    } else if (e.keyCode === 8 || !e.target.value.includes('/')) {
      // Backspace was pressed or slash is not in input, hide options
      setShowOptions(false);
      setOptions([]);
    }
  };

  const handleOptionClick = (option) => {
    // Insert the selected option into the input
    setInput(option);
    // Hide the options
    setShowOptions(false);
    setOptions([]);
  };

  useEffect(() => {
    // Scroll to the bottom of the data container on initial render
    dataContainerRef.current.scrollTop = dataContainerRef.current.scrollHeight;
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
    setHeight(e.target.scrollHeight);
  };

  return (
    <div className="translation-outer" ref={dataContainerRef}>
      <div className="translation-inner">
        <p className="result-text">
            {displayedText}
        </p>
        <div className="text-area-write">
          <textarea rows={1} cols={1}
            className="text-area"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask AI to write anything ... "
            style={{ minHeight: "40px", height: height + "px" }}
          >
            
          </textarea>
          <div className='mainOptionContainer'>

          {showOptions && (
            <div className="options-container">
              {options.map((option, index) => (
                <div key={index} className="option" onClick={() => handleOptionClick(option)}>
                  {option}
                </div>
              ))}
            </div>
          )}
          </div>
        </div>

      </div>
    </div>
  );
}
