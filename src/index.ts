import simple from "./modules/simple";
import random from "./modules/random";
import trII from "./modules/tr-II";
import grII from "./modules/gr-II";

const params = () => {
  return {
    get: () => {},
  };
};

type Options = {
  [key: string]: (seed: string) => void;
};

const setApp = () => {
  const state = {
    currentOption: "gr-II",
    seed: "seed",
  };
  const options: Options = {
    simple: simple,
    random: random,
    "tr-II": trII,
    "gr-II": grII,
  };
  return {
    run: () => {
      options[state.currentOption](state.seed);
    },
    handleOption: (selected: string) => {
      if (state.currentOption !== selected) {
        state.currentOption = selected;
        options[selected](state.seed);
      }
    },
    handleInput: (string: string) => {
      state.seed = string;
      options[state.currentOption](state.seed);
    },
  };
};

(() => {
  const app = setApp();
  app.run();
  const options = document.getElementById("options");
  options.addEventListener("change", (e) => {
    const target = e.currentTarget as HTMLSelectElement;
    // seed here
    app.handleOption(target.value);
  });
  const input = document.getElementById("seed");
  input.addEventListener("input", (e) => {
    const target = e.currentTarget as HTMLInputElement;
    app.handleInput(target.value);
  });
})();
