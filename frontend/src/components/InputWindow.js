import React from "react";

const InputWindow = ({ userInput, setUserInput }) => {
  return (
    <>
      {" "}
      <textarea
        rows="6"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder={`Custom input`}
      ></textarea>
    </>
  );
};

export { InputWindow };
