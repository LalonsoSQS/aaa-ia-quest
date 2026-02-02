const API_URL = "https://aaa-ia-quest-api.lalonso.workers.dev";

async function sendAction(text) {
  const res = await fetch(API_URL, {
    method: "POST", // importante, no GET
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: [{ role: "user", content: text }] })
  });

  const data = await res.json();
  const reply = data.choices[0].message.content;

  const story = document.getElementById("story");
  story.innerText += "\n\n" + reply;
}
