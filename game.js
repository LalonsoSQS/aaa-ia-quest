// Elementos del HTML
const story = document.getElementById("story");
const input = document.getElementById("action");
const button = document.getElementById("send");

// URL de tu Worker
const API_URL = "https://aaa-ia-quest-api.lalonso.workers.dev";

// Mensajes iniciales (historia)
let messages = [
  {
    role: "system",
    content: "Eres un narrador de aventuras tipo RPG. Describe escenas cortas y da 3 opciones numeradas. Mantente siempre en personaje."
  }
];

// Función que envía la acción del jugador al Worker
async function sendAction(text) {
  messages.push({ role: "user", content: text });

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages })
    });

    const data = await res.json();

    // Tomamos la respuesta del asistente
    const reply = data.choices[0].message.content;

    messages.push({ role: "assistant", content: reply });
    story.innerText += "\n\n" + reply;

  } catch (err) {
    story.innerText += "\n\n[Error al conectar con la IA]";
    console.error(err);
  }
}

// Detectar click en el botón "Enviar"
button.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;

  input.value = "";
  story.innerText += "\n> " + text;
  sendAction(text);
});

// Comenzar la historia automáticamente
sendAction("Comienza la aventura");



