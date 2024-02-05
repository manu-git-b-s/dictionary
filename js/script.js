const title = document.createElement("h1");
title.innerText = "Dictionary API Project";
title.classList.add("title");

// Audio Element
const audioEl = document.createElement("audio");
audioEl.setAttribute("id", "sound");
document.body.appendChild(audioEl);

// container
const containerEl = document.createElement("div");
containerEl.classList.add("container");
document.body.appendChild(containerEl);

// result
const resultDiv = document.createElement("div");
resultDiv.classList.add("result");
resultDiv.setAttribute("id", "result");

// input
const input = document.createElement("input");
input.setAttribute("type", "text");
input.setAttribute("id", "inp-word");
input.setAttribute("placeholder", "Type the word here...");

// button
const button = document.createElement("button");
button.innerText = "Search";
button.setAttribute("id", "search-btn");

// search-box
const searchBoxDiv = document.createElement("div");
searchBoxDiv.classList.add("search-box");
searchBoxDiv.append(input, button);
containerEl.append(title, searchBoxDiv, resultDiv);

const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

// fetching the data from Dictionary API
btn.addEventListener("click", () => {
  let inpWrd = document.getElementById("inp-word").value;

  fetch(`${url}${inpWrd}`)
    .then((res) => res.json())
    .then((data) => {
      result.innerHTML = `
        <div class="word">
          <h3>${inpWrd}</h3>
          <button onclick="playSound()">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
        <div class="details">
          <p>${data[0].meanings[0].partOfSpeech}</p>
          <p>/${data[0].phonetic}</p>
        </div>
        <div class="word-meaning">
          ${data[0].meanings[0].definitions[0].definition}
        </div>
        <div class="word-example">
         ${data[0].meanings[0].definitions[0].example || ""}
        </div>
        `;

      sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
    })
    .catch((err) => {
      result.innerHTML = `
        <h3 class="error">Could'nt find the word</h3>
        `;
    });
});

function playSound() {
  sound.play();
}
