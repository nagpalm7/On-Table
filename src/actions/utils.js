"use server";

export const convertFileToDataUrl = async (file) => {
    if (!file) return null;

    const buffer = Buffer.from(await file.arrayBuffer());

    if (buffer.length === 0) return null;

    const base64 = buffer.toString('base64');
    const dataUrl = `data:${file.type};base64,${base64}`;

    return dataUrl;
}