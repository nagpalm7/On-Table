"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";

export default function MultiSelect({
  formFieldName,
  options,
  onChange = (values) => {},
  defaultValues = [],
  prompt = "Select one or more options",
}) {
  const [isJsEnabled, setIsJsEnabled] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const optionsListRef = useRef(null);

  useEffect(() => {
    setIsJsEnabled(true);
  }, []);

  useEffect(() => {
    if (defaultValues && defaultValues.length > 0) {
      handleDefaultValues(defaultValues);
    }
  }, [defaultValues]);

  const handleChange = (e) => {
    const isChecked = e.target.checked;
    const option = {
        name: e.target.nextSibling.textContent,
        value: e.target.value
    }

    const selectedOptionSet = new Set(selectedOptions);

    if (isChecked) {
      selectedOptionSet.add(option);
    } else {
      selectedOptionSet.forEach((opt) => {
        if (opt.value === option.value) {
          selectedOptionSet.delete(opt);
        }
      });
    }

    const newSelectedOptions = Array.from(selectedOptionSet);

    setSelectedOptions(newSelectedOptions);
    onChange(newSelectedOptions);
  };

  const isSelectAllEnabled = selectedOptions.length < options.length;

  const handleDefaultValues = (defaultValues) => {
    const optionsInputs = optionsListRef.current.querySelectorAll("input");
    let defaultOptions = [];
    optionsInputs.forEach((input) => {
        if (defaultValues.includes(input.value)) {
            input.checked = true;
            defaultOptions.push({
                name: input.nextSibling.textContent,
                value: input.value
            });
        }
    });
    setSelectedOptions([...defaultOptions]);
    onChange([...defaultOptions]);
  };

  const handleSelectAllClick = (e) => {
    e.preventDefault();

    const optionsInputs = optionsListRef.current.querySelectorAll("input");
    optionsInputs.forEach((input) => {
      input.checked = true;
    });

    setSelectedOptions([...options]);
    onChange([...options]);
  };

  const isClearSelectionEnabled = selectedOptions.length > 0;

  const handleClearSelectionClick = (e) => {
    e.preventDefault();

    const optionsInputs = optionsListRef.current.querySelectorAll("input");
    optionsInputs.forEach((input) => {
      input.checked = false;
    });

    setSelectedOptions([]);
    onChange([]);
  };

  return (
    <label className="relative">
      <input type="checkbox" className="hidden peer" />

      <div className="cursor-pointer after:content-['▼'] after:text-xs after:ml-1 after:inline-flex after:items-center peer-checked:after:-rotate-180 after:transition-transform inline-flex border border-gray-200 rounded-sm px-5 py-2 w-full">
        {selectedOptions.length == 0 && prompt}
        {isJsEnabled && selectedOptions.length > 0 &&
            (
                <div>
                    {
                        selectedOptions.map((option, index) => (
                            <span className="badge badge-ghost mx-2" key={index}>{option.name}</span>
                        ))
                    }
                </div>
            )
        }
      </div>

      <div className="absolute bg-white border border-gray-200 transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto w-full max-h-60 overflow-y-scroll">
        {isJsEnabled && (
          <ul>
            <li>
              <button
                onClick={handleSelectAllClick}
                disabled={!isSelectAllEnabled}
                className="w-full text-left px-2 py-1 text-blue-600 disabled:opacity-50 cursor-pointer"
              >
                {"Select All"}
              </button>
            </li>
            <li>
              <button
                onClick={handleClearSelectionClick}
                disabled={!isClearSelectionEnabled}
                className="w-full text-left px-2 py-1 text-blue-600 disabled:opacity-50 cursor-pointer"
              >
                {"Clear selection"}
              </button>
            </li>
          </ul>
        )}
        <ul ref={optionsListRef}>
          {options.map((option, i) => {
            return (
              <li key={i}>
                <label
                  className={`flex whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-blue-100 [&:has(input:checked)]:bg-blue-200`}
                >
                  <input
                    type="checkbox"
                    name={formFieldName}
                    value={option.value}
                    className="cursor-pointer"
                    onChange={handleChange}
                  />
                  <span className="ml-1">{option.name}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </label>
  );
}