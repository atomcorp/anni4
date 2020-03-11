import simple from "./modules/simple";
import random from "./modules/random";
import trII from "./modules/tr-II";
import grII from "./modules/gr-II";

(() => {
  grII();
  document.addEventListener("change", e => {
    const target = e.target as HTMLInputElement;
    if (target.name === "choice") {
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
    }
  });
})();
