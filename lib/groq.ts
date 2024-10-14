import Groq from "groq-sdk";

const groq = (() => {
  const GROQ_API_KEY = process.env.EXPO_PUBLIC_LABORIT_GROQ_KEY;
  console.log('GROQ_API_KEY', GROQ_API_KEY);
  return new Groq({ apiKey: GROQ_API_KEY });
})();

export default groq;