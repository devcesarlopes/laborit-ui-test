import groq from "@/lib/groq";

export async function getGroqChatCompletion(message:string) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
    model: "llama3-8b-8192",
  });
}