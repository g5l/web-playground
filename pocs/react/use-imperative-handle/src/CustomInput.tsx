import React, {forwardRef, useImperativeHandle, useRef} from "react";

export type CustomInputHandle = {
  focus: () => void;
  clear: () => void;
};

type Props = {
  placeholder?: string;
};

const CustomInput = forwardRef<CustomInputHandle, Props>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current?.focus();
    },
    clear() {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
  }));

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder={props.placeholder || "Type something..."}
      style={{padding: "8px", fontSize: "16px", width: "200px"}}
    />
  );
});

export default CustomInput;
