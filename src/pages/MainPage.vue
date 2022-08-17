<template>
  <div  >

  <b-row id="row1" >
  <b-col sm="5">
       <h1 id= "random_title" class="title_main" style="background-color:  #f5e3c9;" >Explore This Recipes:</h1> 
      <MainRecipePreviewList id="random_list" v-if="random_recipes.length" :recipes_list = "random_recipes" class="RandomRecipes"></MainRecipePreviewList>
      <button id="random_button"  @click="GetNewRandom" >See more</button>
 </b-col>

 <b-col>

      <LoginPage id="login" v-if="!$root.store.username" > </LoginPage>

 </b-col>

 <b-col>
     <h1 id="watched_title" class="title_main"  style="background-color:  #f5e3c9;" v-if="$root.store.username">Last Viewed:</h1>
    <MainRecipePreviewList   id="watched_list" v-if= "last_watched.length && $root.store.username" :recipes_list = "last_watched" class="RandomRecipes center"></MainRecipePreviewList>
    <h1  id="no_results_title" class="title"  v-if="!last_watched.length&&$root.store.username"  style="color:rgb(25, 157, 180)">No Results &#128532;</h1>
   
 </b-col>
 </b-row>
 

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
  mounted(){
    // ===== AXIOS ====
    this.axios.get(
    //this.$root.store.server_domain + "/recipes/random",
    process.env.VUE_APP_ROOT_API+ "/users/lastWatched",
    // "https://test-for-3-2.herokuapp.com/recipes/random"
  ).then(res=>{

    this.last_watched = res.data;
  });
  },
  created() {
  //===== AXIOS ====
    this.axios.get(
    //this.$root.store.server_domain + "/recipes/random",
    process.env.VUE_APP_ROOT_API+ "/recipes/random",
    // "https://test-for-3-2.herokuapp.com/recipes/random"
  ).then(res=>{

    this.random_recipes = res.data;
    console.log( this.random_recipes);
  });

    // ===== AXIOS ====
    this.axios.get(
    //this.$root.store.server_domain + "/recipes/random",
    process.env.VUE_APP_ROOT_API+ "/users/lastWatched",
    // "https://test-for-3-2.herokuapp.com/recipes/random"
  ).then(res=>{

    this.last_watched = res.data;
  });

//     this.random_recipes = 
//     [
//     {
//         "id": 664025,
//         "title": "Turkey Enchilada Bake",
//         "readyInMinutes": 45,
//         "image": "https://spoonacular.com/recipeImages/661121-556x370.jpg",
//         "popularity": 31,
//         "vegan": false,
//         "vegetarian": false,
//         "glutenFree": true,
//         "isFavorite": false,
//         "wasWatched": false
//     },
//     {
//         "id": 648348,
//         "title": "Jalapeno Cornbread Stuffing",
//         "readyInMinutes": 45,
//         "image": "https://spoonacular.com/recipeImages/648348-556x370.jpg",
//         "popularity": 9,
//         "vegan": false,
//         "vegetarian": true,
//         "glutenFree": false,
//         "isFavorite": false,
//         "wasWatched": false
//     },
//     {
//         "id": 661121,
//         "title": "Spicy Lemongrass Soup",
//         "readyInMinutes": 45,
//         "image": "https://spoonacular.com/recipeImages/661121-556x370.jpg",
//         "popularity": 13,
//         "vegan": true,
//         "vegetarian": true,
//         "glutenFree": false,
//         "isFavorite": false,
//         "wasWatched": false
//     }
// ]

    // this.last_watched= this.random_recipes;
    //this.last_watched=[]
},
  methods: {
    GetNewRandom(){
      //===== AXIOS ====
    this.axios.get(
  //   //this.$root.store.server_domain + "/recipes/random",
    process.env.VUE_APP_ROOT_API+ "/recipes/random",
  //   // "https://test-for-3-2.herokuapp.com/recipes/random"
  ).then(res=>{

    this.random_recipes = res.data;
  //   console.log( this.random_recipes);
  });

//     this.random_recipes = 
//     [
//     {
//         "id": 648348,
//         "title": "Jalapeno Cornbread Stuffing",
//         "readyInMinutes": 45,
//         "image": "https://spoonacular.com/recipeImages/648348-556x370.jpg",
//         "popularity": 9,
//         "vegan": false,
//         "vegetarian": true,
//         "glutenFree": false,
//         "isFavorite": false,
//         "wasWatched": false
//     },
//     {
//         "id": 648348,
//         "title": "Jalapeno Cornbread Stuffing",
//         "readyInMinutes": 45,
//         "image": "https://spoonacular.com/recipeImages/648348-556x370.jpg",
//         "popularity": 9,
//         "vegan": false,
//         "vegetarian": true,
//         "glutenFree": false,
//         "isFavorite": false,
//         "wasWatched": false
//     },
//     {
//         "id": 661121,
//         "title": "Spicy Lemongrass Soup",
//         "readyInMinutes": 45,
//         "image": "https://spoonacular.com/recipeImages/661121-556x370.jpg",
//         "popularity": 13,
//         "vegan": true,
//         "vegetarian": true,
//         "glutenFree": false,
//         "isFavorite": false,
//         "wasWatched": false
//     }
// ]
    }
  },
};

</script>

<style lang="scss" scoped>
#row1{
  display: flex;
  background-color:  #f5e3c9;
}
// .RandomRecipes {
//    margin: 10px 0 10px;
  
// }

// .container{

  
//  //background-color:  #f5e3c9;
//  //height:250%;


// }
// .blur {
//   -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
//   filter: blur(2px);
// }
// ::v-deep .blur .recipe-preview {
//   pointer-events: none;
//   cursor: default;

// }


// .title{

//   font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
//   font-weight: bold;
//   height: 150px;
//   align-content: center;
//   display: flex;
//   //margin-left: 36%;

// }

 #watched_title{
  // margin-right:-100px;
    margin-left:100px;
    //margin-left:25%;
    //margin-bottom: -120px;
    margin-top:20px;

     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  font-size: 30px;
}
#random_title{
  margin-left:6%;
  //margin-bottom: -150px;
  margin-top:20px;
   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  font-size: 30px;

 }
// #random_list{
// background-color:  #f5e3c9;
//     margin-left:-500px;
//   margin-bottom: -1850px;
//   //margin-top:-400px;
 
// }

// #watched_list{
// background-color:  #f5e3c9;
// //margin-left:380px;
// margin-right:-700px;
// margin-top:-320px;
// //margin-bottom: -100px;
// //margin-bottom: -1950px;
  
// }
// #randoms{
//     margin-left:-43%;
//     width: 500px;

// }

// #watches{
// margin-left:100%;
// margin-right:-100%;
// margin-top: -192%;
// margin-bottom: -120%;

// }


#random_button{
  margin-top:10px;
  height:70px;
  width:140px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  font-size:25px;
  margin-left:13%;
  //margin-bottom: -50px;
  
  }
 
  
// #login{
//   margin-top: -1700px;
// }

#no_results_title{
  margin-right:100px;
   margin-left:60px;
   margin-bottom: -90px;
   margin-top:30px;
}


</style>
