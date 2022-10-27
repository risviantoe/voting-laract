import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export default function SelectInput(props) {
    const { id, name, label, options, onChange, isDisabled } = props
    return (
        <div className="mb-4">
            <label htmlFor={id}>{label}</label>
            <Select
                // {...props}
                isMulti
                id={id}
                name={name}
                components={animatedComponents}
                options={options}
                onChange={onChange}
            />
        </div>
    );
}
