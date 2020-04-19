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
  [key: string]: () => void
}

const setApp = () => {
  const state = {
    currentOption: "gr-II",
    // seed: params.get(),
  };
  const options: Options = {
    simple: simple,
    random: random,
    "tr-II": trII,
    'gr-II': grII,
  };
  return {
    run: () => {
      options[state.currentOption]();
    },
    change: (selected: string) => {
      if (state.currentOption !== selected) {
        console.log(selected, options)
        state.currentOption = selected;
        options[selected]();
      }
    },
  };
};

(() => {
  const app = setApp();
  app.run();
  const options = document.getElementById("options");
  options.addEventListener("change", (e) => {
    const target = e.target as HTMLSelectElement;
    // seed here
    app.change(target.value);
  });
})();
