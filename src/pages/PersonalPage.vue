<template>
  <div class="container">
    <h1 class="title" v-if="$root.store.username" style= "font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-weight: bold;" >My Recipes</h1>
    <PreviewPersonalList v-if= "my_recipes.length && $root.store.username" :recipes_list = "my_recipes" class="MyRecipes center"> </PreviewPersonalList>
    <h1 class="title"   v-bind= "flag" v-if= "!flag" id="results_title" style="color:rgb(25, 157, 180)">No Results &#128532;</h1>
  </div>
</template>

<script>
import PreviewPersonalList from "../components/PreviewPersonalList";
export default {
  components: {
    PreviewPersonalList
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
    //===== test =====
    // this.my_recipes = 

    // [{
    // "id": 2,
    // "user_id": 1,
    // "title": "Israeli Salad",
    // "readyInMinutes": 10,
    // "image": "https://www.bing.net%2Fth%3Fid%3DOIP.t_w3fLXvz3Y1_hV6yWKZnAHaE8%26pid%3DApi&f=1",
    // "popularity": 0,
    // "vegan": "true",
    // "vegetarian": "true",
    // "glutenFree": "true",
    // "ingredients": "tomato:4, onion:1, cucamber:4",
    // "instructions": "cut and mix all",
    // "servings": 4,
    // "isFavorite": false,
    // "wasWatched": false
    // },
    this.flag = true;
    //==========
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
  margin-left: 36%;
}
</style>
