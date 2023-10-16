const buttonrules = document.querySelector(".button_rules");
const buttonclose= document.querySelector(".button_close");
const rules = document.querySelector(".rules");

// Event listeners to show/hide the rules
buttonrules.addEventListener("click", () => {
    rules.classList.toggle("show-rules");
});

buttonclose.addEventListener("click", () => {
    rules.classList.toggle("show-rules");
});