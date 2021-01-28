<template>
  <section class="questionContainer">
    <div v-if="currentQuestion && !noRemainingQuestion" class="answerContainer">
      <div class="questionTopContainer">
        <article class="currentQuestionContainer">
          <p class="productQuestion">{{ currentQuestion.question }}</p>

          <div v-if="valueTagQuestionsURL" class="productValue">
            <button class="ui big label" v-on:click="toggleFav">
              {{ currentQuestion.value }}
              <i
                v-bind:class="[is_fav ? 'fas fa-star' : 'far fa-star']"
                style="margin-left: 0.5rem"
              ></i>
            </button>
          </div>
          <div v-else>
            <div class="ui big label">{{ currentQuestion.value }}</div>
          </div>
        </article>

        <AnnotationCounter
          class="progressionContainer"
          :currentInsightId="currentQuestion.insight_id"
          :annotatedCount="insightsLocalStorage.count"
        />
      </div>

      <article class="imgContainer">
        <Product :barcode="currentQuestionBarcode" />
      </article>
      <article class="buttonsContainer">
        <button
          class="ui button yellow annotate"
          data-inverted
          data-tooltip="Shortcut: b"
          @click="backAnnotation()"
          :disabled="!lastAnnotation"
        >
          <img class="buttonImg" src="../assets/back.svg" alt="Back" />
        </button>
        <button
          data-inverted
          data-tooltip="Shortcut: n"
          class="ui button red annotate"
          @click="annotate(0)"
        >
          <img class="buttonImg" src="../assets/no.svg" alt="No" />
        </button>
        <button
          data-inverted
          data-tooltip="Shortcut: k"
          class="ui button blue annotate"
          @click="annotate(-1)"
        >
          {{ $t("questions.skip") }}
        </button>
        <button
          data-inverted
          data-tooltip="Shortcut: o"
          class="ui button green annotate"
          @click="annotate(1)"
        >
          <img class="buttonImg" src="../assets/yes.svg" alt="Yes" />
        </button>
      </article>
    </div>

    <div v-else>
      <LoadingSpinner :show="loading" />
      <div v-if="noRemainingQuestion" class="noQuestionContainer">
        <h2>{{ $t("questions.no_questions_remaining") }}</h2>
        <div>
          <!-- :class="{ selected: insightType === selectedInsightType }" -->
          <button
            class="tag"
            v-for="insightType of availableInsightTypes"
            :key="insightType"
            @click="selectInsightType(insightType)"
          >
            {{ $t("questions." + insightType) }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import robotoffService from "../robotoff";
import {
  getUserInsightLocalStorage,
  saveOneAnnotationLS,
  getAnnotationsLS,
  saveAnnotationsLS,
  saveUserInsightLocalStorage,
} from "../utils";
import Product from "../components/Product";
import LoadingSpinner from "../components/LoadingSpinner";
import AnnotationCounter from "../components/AnnotationCounter";

import {
  updateURLParam,
  getURLParam,
  NO_QUESTION_LEFT,
  insightTypesNames,
  getInitialInsightType,
  reformatValueTag,
} from "../utils/utilsQuestionView";

export default {
  name: "QuestionView",
  components: { Product, AnnotationCounter, LoadingSpinner },
  props: {
    sortBy: {
      type: String,
      default: "random",
      validator: (prop) => ["random", "popular"].includes(prop),
    },
  },
  data: function () {
    return {
      is_fav: getURLParam("value_tag") ? true : false,
      valueTag: getURLParam("value_tag"),
      valueTagTimeout: null,
      currentQuestion: null,
      questionBuffer: [],
      lastAnnotation: null,
      selectedInsightType: getInitialInsightType(),
      imageRotation: 0,
      seenInsightIds: null,
      brandFilter: getURLParam("brand"),
      countryFilter: getURLParam("country"),
      insightsLocalStorage: getUserInsightLocalStorage(),
      imageZoomOptions: {
        toolbar: {
          rotateLeft: 1,
          rotateRight: 1,
        },
      },
      // hand: "right",
    };
  },
  methods: {
    toggleFav() {
      clearTimeout(this.valueTagTimeout);

      if (this.is_fav) this.valueTag = "";
      else {
        this.valueTagTimeout = setTimeout(() => {
          this.valueTag = reformatValueTag(
            this.currentQuestion.value.toLowerCase()
          );
        }, 500);
      }

      this.is_fav = !this.is_fav;
    },
    rotateImage() {
      window.console.log(this.imageRotation);
      if (this.imageRotation === 0) {
        this.imageRotation = 90;
      } else if (this.imageRotation === 90) {
        this.imageRotation = 180;
      } else if (this.imageRotation === 180) {
        this.imageRotation = 270;
      } else if (this.imageRotation === 270) {
        this.imageRotation = 0;
      }
    },
    selectInsightType: function (insightType) {
      this.selectedInsightType = insightType;
      this.valueTag = "";
      this.is_fav = false;
    },
    async sendLastAnnotationsLS(inf) {
      const annotationsLS = getAnnotationsLS();
      if (annotationsLS) {
        const shouldFilter = await Promise.all(
          annotationsLS.map(async (el, ind) => {
            if (ind < inf) return true;
            return await robotoffService.annotate(el.id, el.annotation);
          })
        );
        const newlist = annotationsLS.filter((_, ind) => shouldFilter[ind]);
        saveAnnotationsLS(newlist);
      }
    },
    backAnnotation: function () {
      this.seenInsightIds.delete(this.lastAnnotation.insight_id);
      this.questionBuffer.unshift(this.currentQuestion);
      this.currentQuestion = this.lastAnnotation;
      this.lastAnnotation = null;
      if (this.currentQuestion.annotation !== -1)
        this.updateUserInsightLocalStorage(-1);
    },
    updateUserInsightLocalStorage: function (n) {
      this.insightsLocalStorage.count += n;
      saveUserInsightLocalStorage(
        this.insightsLocalStorage.count,
        null,
        this.currentQuestion.insight_id
      );
    },
    annotate: function (annotation) {
      this.seenInsightIds.add(this.currentQuestion.insight_id);

      this.lastAnnotation = { ...this.currentQuestion, annotation };
      if (annotation !== -1) {
        saveOneAnnotationLS(this.currentQuestion.insight_id, annotation);
        this.updateUserInsightLocalStorage(1);
      }
      this.sendLastAnnotationsLS(annotation !== -1 ? 1 : 0);
      this.updateCurrentQuestion();

      if (!this.noRemainingQuestion && this.questionBuffer.length <= 5)
        this.loadQuestions();
    },
    updateCurrentQuestion: function () {
      this.currentQuestion = null;
      if (this.questionBuffer.length > 0)
        this.currentQuestion = this.questionBuffer.shift();
      else {
        window.console.error(
          "question buffer is empty, cannot update current question!"
        );
      }
    },
    addNoQuestionLeft: function () {
      if (!this.questionBuffer.includes(NO_QUESTION_LEFT))
        this.questionBuffer.push(NO_QUESTION_LEFT);
    },
    loadQuestions: function () {
      const count = 15;
      robotoffService
        .questions(
          this.sortBy,
          this.selectedInsightType,
          this.valueTag,
          this.brandFilter,
          this.countryFilter !== "en:world" ? this.countryFilter : null,
          count
        )
        .then((result) => {
          let nbNewQuestion = 0;
          result.data.questions.forEach((q) => {
            if (!this.seenInsightIds.has(q.insight_id)) {
              this.questionBuffer.push(q);
              nbNewQuestion++;
            }
          });
          if (!nbNewQuestion && this.questionBuffer.length <= 2)
            this.addNoQuestionLeft();

          if (this.currentQuestion === null) {
            this.updateCurrentQuestion();
          }
        });
    },
  },
  computed: {
    availableInsightTypes: function () {
      return Object.keys(insightTypesNames);
    },
    currentQuestionImageUrl: function () {
      if (this.currentQuestion.source_image_url) {
        return this.currentQuestion.source_image_url;
      }
      return "https://static.openfoodfacts.org/images/image-placeholder.png";
    },
    imageRotationClassName: function () {
      if (this.imageRotation === 90) return "rotate-90";
      if (this.imageRotation === 180) return "rotate-180";
      if (this.imageRotation === 270) return "rotate-270";
      return "rotation-0";
    },
    loading: function () {
      return !this.noRemainingQuestion && this.currentQuestion == null;
    },
    noRemainingQuestion: function () {
      return (
        !this.questionBuffer.length && this.currentQuestion === NO_QUESTION_LEFT
      );
    },
    currentQuestionBarcode: function () {
      if (
        this.currentQuestion !== null &&
        this.currentQuestion !== NO_QUESTION_LEFT
      ) {
        return this.currentQuestion.barcode;
      } else {
        return null;
      }
    },
    valueTagQuestionsURL: function () {
      return (
        this.currentQuestion !== null &&
        this.currentQuestion !== NO_QUESTION_LEFT &&
        this.selectedInsightType === "brand"
      );
    },
  },
  beforeRouteUpdate(to, from, next) {
    if (this.valueTag) {
      this.valueTag = "";
      this.is_fav = false;
      updateURLParam("value_tag", this.valueTag);
    }
    this.selectedInsightType = to.query.type;
    updateURLParam("type", this.selectedInsightType);
    next();
  },
  mounted() {
    updateURLParam("type", this.selectedInsightType);
    const userids = getUserInsightLocalStorage();
    this.seenInsightIds = new Set(userids.ids);
    this.loadQuestions();
    this.sendLastAnnotationsLS(0);

    const vm = this;
    window.addEventListener("keyup", function (event) {
      if (event.target.nodeName == "BODY") {
        if (event.key === "k") vm.annotate(-1);
        if (event.key === "n") vm.annotate(0);
        if (event.key === "o") vm.annotate(1);
        if (event.key === "b") vm.backAnnotation();
        if (event.key === "p") vm.rotateImage();
      }
    });
    this.$watch(
      (vm) => ({ type: vm.selectedInsightType, value_tag: vm.valueTag }),
      (newQuery, oldQuery) => {
        for (const nameParam in newQuery) {
          if (!oldQuery || newQuery[nameParam] !== oldQuery[nameParam])
            updateURLParam(nameParam, newQuery[nameParam]);
        }
        this.$route.query.value_tag = this.valueTag;

        this.questionBuffer = [];
        if (!newQuery["value_tag"]) this.currentQuestion = null;
        this.loadQuestions();
      },
      { deep: true }
    );
  },
};
</script>

<style scoped>
@import "../components/styles/question.css";
</style>
