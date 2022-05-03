import { useState } from "react";

const useInput = (validate) => {
  const [enteredInput, setEnteredInput] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isEnteredInputValid = validate(enteredInput);
  const hasError = !isEnteredInputValid && isTouched;

  const handleInputChange = (e) => setEnteredInput(e.target.value);
  const handleInputBlur = (e) => setIsTouched(true);

  const reset = () => {
    setEnteredInput("");
    setIsTouched(false);
  };
  return {
    value: enteredInput,
    // isTouched,
    hasError,
    handleInputChange,
    handleInputBlur,
    reset,
  };
};

export default useInput;
