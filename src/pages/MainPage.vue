<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <RecipePreviewList v-if="random_recipes.length" :recipes_list = "random_recipes" class="RandomRecipes center" />
    <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link>
    {{ !$root.store.username }}
    <RecipePreviewList
        
      :class="{
        RandomRecipes: true,
        blur: !$root.store.username,
        center: true
      }"
      disabled
    ></RecipePreviewList>
    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList
  },
  data() {
    return{
    random_recipes:[]
    };
  },

  created() {
  //   this.axios.get(
  //   //this.$root.store.server_domain + "/recipes/random",
  //   process.env.VUE_APP_ROOT_API+ "/recipes/random",
  //   // "https://test-for-3-2.herokuapp.com/recipes/random"
  // ).then(res=>{

  //   this.random_recipes = res.data;
  //   console.log( this.random_recipes);
  // });

    this.random_recipes = 
    [
    {
        "id": 664025,
        "title": "Turkey Enchilada Bake",
        "readyInMinutes": 45,
        "image": "https://spoonacular.com/recipeImages/661121-556x370.jpg",
        "popularity": 31,
        "vegan": false,
        "vegetarian": false,
        "glutenFree": true,
        "isFavorite": false,
        "wasWatched": false
    },
    {
        "id": 648348,
        "title": "Jalapeno Cornbread Stuffing",
        "readyInMinutes": 45,
        "image": "https://spoonacular.com/recipeImages/648348-556x370.jpg",
        "popularity": 9,
        "vegan": false,
        "vegetarian": true,
        "glutenFree": false,
        "isFavorite": false,
        "wasWatched": false
    },
    {
        "id": 661121,
        "title": "Spicy Lemongrass Soup",
        "readyInMinutes": 45,
        "image": "https://spoonacular.com/recipeImages/661121-556x370.jpg",
        "popularity": 13,
        "vegan": true,
        "vegetarian": true,
        "glutenFree": false,
        "isFavorite": false,
        "wasWatched": false
    }
]

   console.log( this.random_recipes);
}
};

</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
