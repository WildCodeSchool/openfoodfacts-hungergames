export const getURLParam = (key) => {
  const urlParams = new URLSearchParams(window.location.search);

  if (!urlParams.has(key)) {
    return "";
  }

  return urlParams.get(key);
};

export const removeEmptyKeys = (obj) => {
  Object.keys(obj).forEach(
    (key) => (obj[key] === undefined || obj[key] === "") && delete obj[key]
  );
  return obj;
};

export const getUserInsightLocalStorage = () => {
  if (!localStorage.userInsight)
    localStorage.userInsight = JSON.stringify({ count: 0, level: 20, ids: [] });

  return JSON.parse(localStorage.userInsight);
};

export const saveUserInsightLocalStorage = (count, level, ids) => {
  const ret = JSON.parse(localStorage.userInsight);
  // A retirer - temporaire, au cas ou ids soit encore une string
  if (ret && ret.ids && typeof ret.ids === "string") ret.ids = [];

  if (count) ret.count = count;
  if (level) ret.level = level;
  if (Array.isArray(ids)) ret.ids = ids;
  else {
    if (ids) ret.ids.push(ids);
    else ret.ids = [ids];
  }
  localStorage.userInsight = JSON.stringify(ret);
};
