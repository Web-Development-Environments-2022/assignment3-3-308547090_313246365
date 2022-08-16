<template>
  <b-container>
    <b-row>
    <b-row v-for="r in recipes_list" :key="r.id">
      <b-col >
        <RecipePreviewFamily class="recipePreview" :recipe="r" />
      </b-col>
      <br>
    </b-row>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreviewFamily from "./RecipePreviewFamily.vue";
export default {
  name: "FamilyRecipePreviewList",
  components: {
    RecipePreviewFamily
  },
  props: {
    // title: {
    //   type: String,
    //   required: true
    // }
    recipes_list: [],

  },
  data() {
    return {
    };
  },
  

};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
 
 
}
</style>
