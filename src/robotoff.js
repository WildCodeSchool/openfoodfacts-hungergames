import axios from "axios";
import { ROBOTOFF_API_URL, BACK_API_NODE } from "./const";
import { getLang } from "./settings";
import { removeEmptyKeys } from "./utils";

export default {
  getInsightsAnnotated() {
    return axios
      .get(`${BACK_API_NODE}/insights/annotate`)
      .then((results) => results.data);
  },

  annotate(insightId, annotation) {
    return axios.post(
      `${BACK_API_NODE}/insights/annotate`,
      new URLSearchParams(
        `insight_id=${insightId}&annotation=${annotation}&update=1`
      ),
      { withCredentials: true }
    );
  },

  questions(sortBy, insightTypes, valueTag, brands, country, count = 10) {
    const lang = getLang();
    return axios
      .get(`${BACK_API_NODE}/questions`, {
        params: removeEmptyKeys({
          count,
          lang,
          insight_types: insightTypes,
          value_tag: valueTag,
          brands,
          country,
          sortBy,
        }),
      })
      .then((result) => result);
  },

  getUserStatistics(username) {
    return axios.get(`${ROBOTOFF_API_URL}/users/statistics/${username}`);
  },
};
