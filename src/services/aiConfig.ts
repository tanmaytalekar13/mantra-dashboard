import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;

if (!API_KEY) {
  console.warn(
    "[AI] VITE_GEMINI_API_KEY is not set. AI features will be unavailable."
  );
}

export const genAI = new GoogleGenerativeAI(API_KEY ?? "");

export const getModel = () =>
  genAI.getGenerativeModel({ model: "gemini-2.5-flash" });