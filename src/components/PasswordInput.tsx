"use client";
import React, { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/store/appStore";
import env from "@/app/env";

const PasswordInput: React.FC = () => {
  const { setIsEditing } = useAppStore();
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (inputRef.current) {
        inputRef.current.focus();
        setInputValue((prev) => prev + event.key);
      }
    };

    const handlePaste = (event: ClipboardEvent) => {
      if (inputRef.current) {
        const pastedText = event.clipboardData?.getData("text") || "";
        console.log("🚀 ~ handlePaste ~ pastedText:", pastedText);
        setInputValue(pastedText);
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    window.addEventListener("paste", handlePaste);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
      window.removeEventListener("paste", handlePaste);
    };
  }, []);

  useEffect(() => {
    if (inputValue === env.password) {
      setIsEditing(true);
      setInputValue(""); // Clear the input value after successful match
    }
  }, [inputValue, setIsEditing]);

  return (
    <input
      type="password"
      ref={inputRef}
      value={inputValue}
      onChange={() => {}}
      style={{ position: "absolute", top: "-9999px", left: "-9999px" }} // Hide the input field
    />
  );
};

export default PasswordInput;
