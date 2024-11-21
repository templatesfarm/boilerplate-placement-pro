"use client";
import React, { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/store/appStore";
import env from "@/app/env";

const PasswordInput: React.FC = () => {
  const { setIsEditing } = useAppStore();
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (inputRef.current) {
        inputRef.current.focus();
        setInputValue((prev) => prev + event.key);
      }
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (inputValue === env.password) {
      setIsEditing(true);
      setInputValue(''); // Clear the input value after successful match
    }
  }, [inputValue, setIsEditing]);

//   useEffect(() => {
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, []);

//   const handleChange = useCallback(
//     (event: React.ChangeEvent<HTMLInputElement>) => {
//       console.log("🚀 ~ handleChange ~ event:", event.target.value);
//       setInputValue(event.target.value);
//       console.log("🚀 ~ env.password:", env.password)
//       console.log("🚀 ~ inputValue:", inputValue)
//       if (inputValue === "123456") {
//         setIsEditing(true);
//         setInputValue(""); // Clear the input value after successful match
//       }
//     },
//     [inputValue, setIsEditing]
//   );

  return (
    <input
      type="password"
      ref={inputRef}
      value={inputValue}
    //   onChange={(event) => setInputValue(event?.target.value)}
        style={{ position: 'absolute', top: '-9999px', left: '-9999px' }} // Hide the input field
    />
  );
};

export default PasswordInput;
