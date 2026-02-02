const story = document.getElementById("story");
const input = document.getElementById("action");
const button = document.getElementById("send");

button.onclick = () => {
  const text = input.value;
  input.value = "";

  story.innerText += "\n> " + text;
};
