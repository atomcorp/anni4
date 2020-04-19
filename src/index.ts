import simple from "./modules/simple";
import random from "./modules/random";
import trII from "./modules/tr-II";
import grII from "./modules/gr-II";

(() => {
  grII();
  const options = document.getElementById('options');
  options.addEventListener("change", e => {
    const target = e.target as HTMLSelectElement;
    // seed here
    if (target.value === "simple") {
      simple();
    }
    if (target.value === "random") {
      random();
    }
    if (target.value === "tr-II") {
      trII();
    }
    if (target.value === "gr-II") {
      grII();
    }
  });
})();
