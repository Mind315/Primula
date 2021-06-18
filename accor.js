"use strict";

let accordionItems = document.querySelectorAll(".detail");

accordionItems.forEach((item) => {
  const but = item.querySelector(".detail__but");

  but.addEventListener("click", function () {
    if (item.classList.contains("active")) {
      item.classList.remove("active");
    } else {
      accordionItems.forEach(function (i) {
        i.classList.remove("active");
      });
      item.classList.add("active");
    }
  });
});
