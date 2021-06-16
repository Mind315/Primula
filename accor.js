'use strict';

const accordion = document.querySelectorAll(".accordion");
console.log(accordion);

accordion.forEach((item) => {
  item.addEventListener("click", function () {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    panel.style.height? (panel.style.height = null) : (panel.style.height = `${panel.scrollHeight}px`);
  });
});
