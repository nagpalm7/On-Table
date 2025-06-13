"use client";

import React, { useEffect, useState } from "react";

const VariantsInput = ({ initialVariants = [], errors }) => {
    const [variants, setVariants] = useState(
        initialVariants.length > 0
            ? initialVariants
            : [{ name: "", price: "" }]
    );

    // Add a new empty variant
    const addVariant = () => {
        setVariants([...variants, { name: "", price: "" }]);
    };

    // Remove a variant by index
    const removeVariant = (idx) => {
        setVariants(variants.filter((_, i) => i !== idx));
    };

    // Update variant field
    const updateVariant = (idx, field, value) => {
        setVariants(
            variants.map((variant, i) =>
                i === idx ? { ...variant, [field]: value } : variant
            )
        );
    };

    // Keep variants in sync with form submission
    useEffect(() => {
        // This effect is only for keeping initialVariants in sync if they change
        setVariants(
            initialVariants.length > 0
                ? initialVariants
                : [{ name: "", price: "" }]
        );
    }, [initialVariants]);

    return (
        <div className="flex flex-col gap-6">
            <div>
                <button
                    type="button"
                    className="btn btn-outline btn-primary btn-sm mt-2 self-start"
                    onClick={addVariant}
                >
                    Add Variant
                </button>
            </div>
            {variants.map((variant, idx) => (
                <div key={idx} className="flex gap-2 items-end">
                    <button
                        type="button"
                        className="btn btn-error btn-outline"
                        onClick={() => removeVariant(idx)}
                        disabled={variants.length === 1}
                        title="Remove variant"
                    >
                        ×
                    </button>
                    <label className="floating-label w-full">
                        <span>Name</span>
                        <input
                            type="text"
                            name={`variants[${idx}][name]`}
                            className="input validator w-full"
                            placeholder="Variant Name (e.g. Regular, Large)"
                            value={variant.name}
                            onChange={e =>
                                updateVariant(idx, "name", e.target.value)
                            }
                            required
                        />
                    </label>
                    <label className="floating-label w-full">
                        <span>Price</span>
                        <input
                            type="number"
                            name={`variants[${idx}][price]`}
                            className="input validator w-full"
                            placeholder="Price"
                            min="0"
                            step="1"
                            value={variant.price}
                            onChange={e =>
                                updateVariant(idx, "price", e.target.value)
                            }
                            required
                        />
                    </label>
                </div>
            ))}
            {errors &&
                <ul className="list-disc validator-hint visible text-error px-4 my-0">
                    {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            }
        </div>
    );
};

export default VariantsInput;