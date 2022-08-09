<template>
  <div class="container" >
     <div id="randoms">
    <h1 id= "random_title" class="title" >Explore This Recipes:</h1>
        <!-- <b-button  block variant="outline-primary" id=#see_more_btn @click="GetNewRandom">See more</b-button><br> -->

    <MainRecipePreviewList v-if="random_recipes.length" :recipes_list = "random_recipes" class="RandomRecipes"></MainRecipePreviewList>
    
    <!-- <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link> -->
    <!-- <RecipePreviewList v-if="$root.store.username"
      :class="{
        RandomRecipes: true,
        blur: !$root.store.username,
        center: true
      }"
      disabled
      > -->

      <button id="random_button"  @click="GetNewRandom" >See more</button>

       </div>
 


     
      <div id="watches" v-if="$root.store.username" >
        <h1 id="watched_title" class="title"   v-if="$root.store.username">Last Viewed:</h1>
        <MainRecipePreviewList  v-if= "random_recipes.length && $root.store.username" :recipes_list = "random_recipes" class="RandomRecipes center"></MainRecipePreviewList>
      </div>

  
    <div>
    <LoginPage id="login" v-if="!$root.store.username" > </LoginPage>
  </div>


  
  
      <!-- </RecipePreviewList> -->
       
  </div>
</template>

<script>
import MainRecipePreviewList from "../components/MainRecipePreviewList";
import LoginPage from './LoginPage.vue';
export default {
  components: {
    MainRecipePreviewList,
    LoginPage
  },
  data() {
    return{
    random_recipes:[],
    last_watched: []
    };
  },

  created() {

  //===== AXIOS ====
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
},
  methods: {
    GetNewRandom(){
      //===== AXIOS ====
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
    }
  },
};

</script>

<style lang="scss" scoped>
// .RandomRecipes {
//    margin: 10px 0 10px;
  
// }
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;

}


.title{

  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  height: 150px;
  align-content: center;
  display: flex;
  margin-left: 36%;

}

#watched_title{
  margin-right:100px;
   margin-left:60px;
   margin-bottom: -90px;
   margin-top:30px;
}
#random_title{
  margin-left:14%;
  margin-bottom: -100px;
 

}

#randoms{
    margin-left:-43%;
    width: 500px;

}

#watches{
margin-left:100%;
margin-right:-100%;
margin-top: -198%;

}


#random_button{
  margin-top:10px;
  margin-left:22%;
  height:43px;
  width:120px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  font-size:20px;}
  
#login{
  margin-top: -1950px;
}


</style>
