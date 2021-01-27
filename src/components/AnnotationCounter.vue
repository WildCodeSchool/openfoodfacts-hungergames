<template>
  <article>
    <p>
      {{ $t("game.next_level") }}: {{ annotatedCount }} /
      {{ level }}
    </p>
  </article>
</template>

<script>
export default {
  name: "AnnotationCounter",
  props: {
    annotatedCount: {
      type: Number,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
    currentInsightId: {
      type: String,
      required: true,
    },
  },
};
</script>
