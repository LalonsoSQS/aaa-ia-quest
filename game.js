const story = document.getElementById("story");
const input = document.getElementById("action");
const button = document.getElementById("send");

// URL de tu Worker
const API_URL = "https://aaa-ia-quest-api.lalonso.workers.dev";

// API Key temporal para pruebas
const OPENAI_API_KEY = "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";

// Mensajes iniciales
let messages = [
  {
    role: "system",
    content: `
Eres un narrador de aventuras tipo RPG.
Habla en segunda persona.
Describe escenas cortas y evocadoras.
Da siempre 3 opciones numeradas.
No salgas nunca del personaje.
`
  }
];

async function sendAction(text) {
  messages.push({ role: "user", content: text });

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({ messages })
    });

    const data = await res.json();
    const reply = data.choices[0].message.content;

    messages.push({ role: "assistant", content: reply });
    story.innerText += "\n\n" + reply;
  } catch (err) {
    story.innerText += "\n\n[Error al conectar con la IA]";
    console.error(err);
  }
}

// Enviar texto al hacer click
button.addEventListener("click", () => {
  const text = input.value;
  if (!text) return;

  input.value = "";
  story.innerText += "\n> " + text;
  sendAction(text);
});

// Comenzar la aventura automáticamente
sendAction("Comienza la aventura");

