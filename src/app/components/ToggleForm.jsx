"use client";
import React from "react";

export default function ToggleForm({ defaultValue, name, id, action}) {
    return (
        <form action={action}>
            <input type="hidden" name="id" value={id} /> 
            <input
                type="checkbox"
                name={name}
                defaultChecked={defaultValue}
                className="toggle toggle-success toggle-xs"
                onClick={(e) => e.target.form.requestSubmit()}
            />
        </form>
    );
}
