const story = document.getElementById("story");
const input = document.getElementById("action");
const button = document.getElementById("send");

// URL de tu Worker
const API_URL = "https://aaa-ia-quest-api.lalonso.workers.dev";

// Tu API Key temporal (solo para pruebas)
const OPENAI_API_KEY = "TU_API_KEY_DE_OPENAI";

// Mensajes iniciales
let messages = [
  {
    role: "system",
    content: "Eres un narrador de aventuras RPG, da 3 opciones numeradas."
  }
];

// Función para enviar la acción al Worker
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

    // Mostrar respuesta en la pantalla
    const reply = data.choices[0].message.content;
    messages.push({ role: "assistant", content: reply });
    story.innerText += "\n\n" + reply;

  } catch (err) {
    story.innerText += "\n\n[Error al conectar con la IA]";
    console.error(err);
  }
}

// Detectar click en el botón
button.addEventListener("click", () => {
  const text = input.value;
  if (!text) return;

  input.value = "";
  story.innerText += "\n> " + text;
  sendAction(text);
});

// Comenzar la historia
sendAction("Comienza la aventura");


