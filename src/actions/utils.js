"use server";

export const convertFileToDataUrl = async (file) => {
    if (!file) return null;

    const buffer = Buffer.from(await file.arrayBuffer());

    if (buffer.length === 0) return null;

    const base64 = buffer.toString('base64');
    const dataUrl = `data:${file.type};base64,${base64}`;

    return dataUrl;
}

export const getVariantsFromFormData = async (formData) => {
    const variants = [];
    let idx = 0;

    while (true) {
        const name = await formData.get(`variants[${idx}][name]`);
        const price = await formData.get(`variants[${idx}][price]`);
        // Stop if no more variants
        if (name === null && price === null) break;
        // Only add if at least one field is present
        if (name !== null || price !== null) {
            variants.push({
                name: name ?? "",
                price: price ?? ""
            });
        }
        idx++;
    }

    return variants;
}