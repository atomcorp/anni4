import simple from "./modules/simple";
import random from "./modules/random";
import trII from "./modules/tr-II";
import grII from "./modules/gr-II";
import smII from "./modules/second-movement-ii";
import eclat from "./modules/eclat/eclat";

type paramType = "pattern" | "seed";

const setParams = () => {
  const searchParams = new URLSearchParams(window.location.search);
  return {
    get: (type: paramType) => {
      if (searchParams.has(type)) {
        return decodeURIComponent(searchParams.get(type));
      }
      return null;
    },
    set: (type: paramType, value: string) => {
      searchParams.set(type, encodeURIComponent(value));
      window.history.replaceState(null, null, "?" + searchParams.toString());
    },
    share: () => {
      return `${window.location}?${searchParams.toString()}`;
    },
  };
};

type Options = {
  [key: string]: (seed: string) => void;
};

const setApp = () => {
  const searchParams = setParams();
  const state = {
    currentOption: "tr-II",
    seed: "Anni Albers",
  };
  const options: Options = {
    simple: simple,
    random: random,
    "tr-II": trII,
    "gr-II": grII,
    "sm-ii": smII,
    eclat,
  };
  return {
    init: (inputEl: HTMLInputElement, optionsEl: HTMLSelectElement) => {
      if (searchParams.get("seed")) {
        inputEl.value = decodeURIComponent(searchParams.get("seed"));
        state.seed = searchParams.get("seed");
      } else {
        searchParams.set("seed", state.seed);
        inputEl.value = state.seed;
      }
      if (searchParams.get("pattern")) {
        optionsEl.value = searchParams.get("pattern");
        options[searchParams.get("pattern")](state.seed);
        state.currentOption = searchParams.get("pattern");
      } else {
        options[state.currentOption](state.seed);
        optionsEl.value = state.currentOption;
        searchParams.set("pattern", state.currentOption);
      }
    },
    handleOption: (selected: string) => {
      if (state.currentOption !== selected) {
        state.currentOption = selected;
        options[selected](state.seed);
        searchParams.set("pattern", selected);
      }
    },
    handleInput: (string: string) => {
      state.seed = string;
      options[state.currentOption](state.seed);
      searchParams.set("seed", string);
    },
  };
};

(() => {
  const app = setApp();
  const options = document.getElementById("options") as HTMLSelectElement;
  options.addEventListener("change", (e) => {
    const target = e.currentTarget as HTMLSelectElement;
    // seed here
    app.handleOption(target.value);
  });
  const input = document.getElementById("seed") as HTMLInputElement;
  input.addEventListener("input", (e) => {
    const target = e.currentTarget as HTMLInputElement;
    app.handleInput(target.value);
  });
  app.init(input, options);
})();
