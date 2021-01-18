import robotoffService from "../robotoff";
import {
  getUserInsightLocalStorage,
  saveUserInsightLocalStorage,
} from "../utils";

const updateInsightLocalStorage = async () => {
  const { ids } = getUserInsightLocalStorage();
  if (!ids) return;

  const ids_annotated = await robotoffService.getInsightsAnnotated();

  const ret = ids.filter((el) => !ids_annotated.includes(el));
  saveUserInsightLocalStorage(null, null, ret);
};

export { updateInsightLocalStorage };
