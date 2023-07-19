import React, { useEffect, useRef } from "react";
import "./UpdatableInput.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEntity } from "../util/db";

function UpdatableInput(props: {
  label: string;
  value: string | number | undefined;
  ressourceType: string | undefined;
  size?: string;
  weight?: string;
  ressourceId: string;
  type?: string;
  inputType?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  placeholder?: string;
}) {
  const {
    label,
    value,
    ressourceType,
    size = "1em",
    weight = "regular",
    ressourceId,
    inputType,
    placeholder,
  } = props;

  const [isEditing, setIsEditing] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value);
  // const [initialValue, setInitialtValue] = React.useState(value);

  // useEffect(() => {
  //   setInitialtValue((prev) => (value !== prev ? value : prev));
  // }, [value]);

  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();

  const updateUpdatableInput = useMutation({
    mutationFn: (data: any) => updateEntity(ressourceId, data),
  });

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setIsEditing(false);
    }
  };
  useEffect(() => {
    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing]);

  useEffect(() => {
    if (!isEditing && inputValue !== value) {
      updateUpdatableInput
        .mutateAsync({ [label]: inputValue })
        .then((res) => {
          console.log(res);
          queryClient.invalidateQueries({
            queryKey: [ressourceType, ressourceId],
          });
        })
        .then(() =>
          queryClient.invalidateQueries({
            queryKey: [ressourceType, { id: ressourceId }],
          })
        );
    }
  }, [isEditing, inputValue]);

  const renderInput = () => {
    if (isEditing && label === "additionalInfo") {
      return (
        <textarea
          style={{ fontFamily: "inherit" }}
          className={`input ${size} ${weight}`}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          ref={textareaRef}
          placeholder={value?.toString()}
          rows={5}
          autoFocus
          cols={100}
        />
      );
    }
    if (isEditing) {
      return (
        <input
          className={`input ${size} ${weight}`}
          type={inputType}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          ref={inputRef}
          autoFocus
        />
      );
    }

    return (
      <div
        onClick={() => setIsEditing(true)}
        className={`input-value ${size} ${weight} ${label}`}
      >
        {label === "phase_number" && `Phase `}
        {value}
        {!value && placeholder && (
          <span className="placeholder italic">{placeholder}</span>
        )}
      </div>
    );
  };
  return <div>{renderInput()}</div>;
}

export default UpdatableInput;
