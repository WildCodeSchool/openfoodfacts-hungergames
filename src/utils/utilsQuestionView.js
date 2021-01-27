const updateURLParam = (key, value) => {
  const urlParams = new URLSearchParams(window.location.search);

  if (!urlParams.has(key) && !value) return;
  if (value) urlParams.set(key, value);
  else urlParams.delete(key);

  const newRelativePathQuery =
    window.location.pathname +
    (urlParams.toString().length ? `?${urlParams.toString()}` : "");
  history.pushState(null, "", newRelativePathQuery);
};

const getURLParam = (key) => {
  const urlParams = new URLSearchParams(window.location.search);

  if (!urlParams.has(key)) return "";

  return urlParams.get(key);
};

const NO_QUESTION_LEFT = "NO_QUESTION_LEFT";

const insightTypesNames = {
  // label: "label",
  category: "category",
  brand: "brand",
};

const randomInsightTypeChoices = ["category", "brand"];

const getRandomInsightType = () =>
  randomInsightTypeChoices[
    Math.floor(randomInsightTypeChoices.length * Math.random())
  ];

const getInitialInsightType = () => {
  const urlParamValue = getURLParam("type");

  if (urlParamValue.length) {
    return urlParamValue;
  }

  return getRandomInsightType();
};

const reformatTagMapping = {
  " ": "-",
  "'": "-",
  "&": "",
  à: "a",
  â: "a",
  ä: "a",
  é: "e",
  è: "e",
  ê: "e",
  ë: "e",
  î: "i",
  ï: "i",
  ô: "o",
  ö: "o",
  û: "u",
  ù: "u",
  ü: "u",
};

const reformatValueTag = (value) => {
  let output = value.trim().toLowerCase();
  for (const [search, replace] of Object.entries(reformatTagMapping)) {
    output = output.replace(new RegExp(search, "g"), replace);
  }
  output = output.replace(/-{2,}/g, "-");
  return output;
};

export {
  updateURLParam,
  getURLParam,
  NO_QUESTION_LEFT,
  insightTypesNames,
  getInitialInsightType,
  getRandomInsightType,
  reformatTagMapping,
  reformatValueTag,
};
