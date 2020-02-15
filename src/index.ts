import simple from "./modules/simple";
import random from "./modules/random";

(() => {
  simple();
  document.addEventListener("change", e => {
    const target = e.target as HTMLInputElement;
    if (target.name === "choice") {
      if (target.value === "simple") {
        simple();
      }
      if (target.value === "random") {
        random();
      }
    }
  });
})();
