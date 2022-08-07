<template>
  <div class="container">
    <h1 class="title"> My Favourite Recipes</h1>
      <RecipePreviewList v-model="fav_list" v-if="fav_list.length" :recipes_list = "fav_list"  />
    <h1 class="title"   v-bind= "flag" v-show= "!flag" id="results_title" style="color:rgb(25, 157, 180)">No Results &#128532;</h1>
  </div>
</template>


<script>

import RecipePreviewList from "../components/RecipePreviewList";

export default {
  components: { RecipePreviewList,},
    data() {
    return {
      fav_list :[],
      flag: false
 
    }
  },


  created(){
    this.getFavRecipes();

},

methods:{

  async getFavRecipes(){
        
      try {
      

        //== send response ==
        // const response = await this.axios.get(
   
        //    process.env.VUE_APP_ROOT_API+"/users/favorites",
          
        //   // {
        //   // }
        // );

        //   console.log("get favorites from server is ok")
        //   console.log(response.data);
        //   this.fav_list  = response.data;

          this.fav_list =[
                    {
                        "id": 645974,
                        "title": "Ground Turkey Meatloaf",
                        "readyInMinutes": 45,
                        "image": "https://spoonacular.com/recipeImages/645974-556x370.jpg",
                        "popularity": 1,
                        "vegan": false,
                        "vegetarian": false,
                        "glutenFree": false,
                        "isFavorite": true,
                        "wasWatched": false
                    },
                    {
                        "id": 645978,
                        "title": "Ground Turkey Stuffed Peppers",
                        "readyInMinutes": 45,
                        "image": "https://spoonacular.com/recipeImages/645978-556x370.jpg",
                        "popularity": 112,
                        "vegan": false,
                        "vegetarian": false,
                        "glutenFree": true,
                        "isFavorite": true,
                        "wasWatched": false
                    }
                ]
          if(this.fav_list.length){

            console.log("list has length")
            this.flag = true;
          }

     

  } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
  }


  }
}
</script>

<style>
.title {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
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
