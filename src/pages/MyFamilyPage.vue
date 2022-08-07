<template>
  <div class="container">
    <h1 class="title" v-if="$root.store.username" style= "font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-weight: bold;" >Family Recipes:</h1>
    <RecipePreviewList v-if= "family_recipes.length && $root.store.username" :recipes_list = "family_recipes" class="FamilyRecipes center" />
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
    family_recipes:[]
    };
  },
  created() {
    this.axios.get(
      process.env.VUE_APP_ROOT_API+ "/users/familyRecipes",
    ).then(res=>{
    this.family_recipes = res.data;
  });
  
    // this.family_recipes = 
    // [
    // {
    //     "id": 640720,
    //     "title": "Creamy Vegan Butternut Squash Mac and Cheese",
    //     "readyInMinutes": 45,
    //     "image": "https://spoonacular.com/recipeImages/640720-556x370.jpg",
    //     "popularity": 40,
    //     "vegan": false,
    //     "vegetarian": false,
    //     "glutenFree": false,
    //     "isFavorite": false,
    //     "wasWatched": false
    // },
    // {
    //     "id": 640461,
    //     "title": "Crawfish Cake Sliders",
    //     "readyInMinutes": 45,
    //     "image": "https://spoonacular.com/recipeImages/640461-556x370.jpg",
    //     "popularity": 15,
    //     "vegan": false,
    //     "vegetarian": false,
    //     "glutenFree": false,
    //     "isFavorite": false,
    //     "wasWatched": false
    // },
    // {
    //     "id": 641836,
    //     "title": "Easy Baked Parmesan Chicken",
    //     "readyInMinutes": 45,
    //     "image": "https://spoonacular.com/recipeImages/641836-556x370.jpg",
    //     "popularity": 92,
    //     "vegan": false,
    //     "vegetarian": false,
    //     "glutenFree": false,
    //     "isFavorite": false,
    //     "wasWatched": false
    // }
    // ]
  },
};
</script>

<style lang="scss" scoped>
.FamilyRecipes {
  margin: 10px 0 10px;
}
.title{

  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding:30px;

}

</style>
