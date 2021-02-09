<template>
  <section class="projectContainer">
    <h2 class="projectTitle">En savoir plus</h2>
    <p>
      <span class="projectName">{{ name_app }}</span> est une application
      proposée par
      <a href="https://world.openfoodfacts.org/" title="Open Food Facts"
        >Open Food Facts</a
      >
      pour participer à la construction de sa base de donnée de manière ludique.
    </p>
    <p>
      <a href="https://world.openfoodfacts.org/" title="Open Food Facts"
        >Open Food Facts</a
      >
      est une base de données de produits alimentaires comprenant leurs
      ingrédients, allergènes, informations nutritionnelles ou toute autre chose
      qui peut renseigner sur le produit.
    </p>
    <p>
      Puisqu’<a href="https://world.openfoodfacts.org/" title="Open Food Facts"
        >Open Food Facts</a
      >
      est une association à but non-lucratif, ce sont ses bénévoles – des
      consommateurs venus des quatre coins du globe – qui contribuent à
      alimenter la base de données.
    </p>
    <p>
      Ce sont eux qui rentrent de nouveaux produits en les photographiant
      simplement avec leur smartphone.
    </p>
    <p>
      L’algorithme d’<a
        href="https://world.openfoodfacts.org/"
        title="Open Food Facts"
        >Open Food Facts</a
      >
      se charge ensuite d’interpréter les photographies pour extraire les
      informations essentielles : la marque, la catégorie, le label ou encore la
      composition du produit.
    </p>
    <p>
      C’est ici que vous pouvez jouer, grâce à
      <span class="projectName">{{ name_app }}</span> ! En effet, pour ne pas
      entrer de mauvaises informations dans la base de données, vous allez
      devoir vérifier si l’algorithme a eu juste.
    </p>
    <p>
      Pour cela, rien de plus simple: regardez les photos et cherchez à
      confirmer, ou à infirmer, ce qui vous est demandé. Si vous avez le moindre
      doute, n’hésitez pas à ignorer la question pour passer à la suivante.
    </p>
    <p>
      Vous pourrez ainsi aider les autres consommateurs à trouver des
      informations fiables… Mais aussi aider la science ! En effet, de
      nombreuses recherches s’appuient sur la base de données d’<a
        href="https://world.openfoodfacts.org/"
        title="Open Food Facts"
        >Open Food Facts</a
      >
      pour étudier notre alimentation.
    </p>
  </section>
</template>

<script>
import { NAME_APP } from "../const";

export default {
  name: "ProjectView",
  data: function () {
    return {
      name_app: NAME_APP,
    };
  },
};
</script>

<style scoped>
@import "../components/styles/project.css";
</style>
