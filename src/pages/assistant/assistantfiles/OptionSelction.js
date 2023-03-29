import React, { useEffect } from 'react';

export default function OptionSelection({ arrayItems, selectOption }) {

  useEffect(() => {
    const selectedOption = arrayItems[0].option; // Select the first option by default
    selectOption(selectedOption);
  }, [arrayItems, selectOption]);

  return (
    <>
      <div className="option-select-div">

        <div className="grid-outer">
          <div className="grid-main">
            {arrayItems.map((item) => {
              return (
                <div
                  className="grid-child"
                  onClick={() => selectOption(item.option)}
                >
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </>
  );
}
