<template>
  <div class="container">
    <h1 class="title" v-if="$root.store.username" style= "font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-weight: bold;" >My Recipes</h1>
    <RecipePreviewList v-if= "my_recipes.length && $root.store.username" :recipes_list = "my_recipes" class="MyRecipes center" />
    <h1 class="title"   v-bind= "flag" v-show= "!flag" id="results_title" style="color:rgb(25, 157, 180)">No Results &#128532;</h1>
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
    my_recipes:[],
    flag: false
    };
  },
  created() {
    this.axios.get(
      process.env.VUE_APP_ROOT_API+ "/users/myRecipes",
    ).then(res=>{
    this.my_recipes = res.data;
  });
    if(this.my_recipes.length){
      console.log("list has length")
      this.flag = true;
      }
    // this.my_recipes = 
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
.MyRecipes {
  margin: 10px 0 10px;
}
.title{
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  height: 150px;
  align-content: center;
  display: flex;
  margin-left: 36%;
}
#results_title{
  margin-left: 42%;
}
</style>
