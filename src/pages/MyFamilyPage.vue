<template>
  <div class="container">
    <h1 class="title" v-if="$root.store.username" style= "font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-weight: bold;" >Family Recipes</h1>
    <FamilyRecipePreviewList v-if= "family_recipes.length && $root.store.username" :recipes_list = "family_recipes" class="FamilyRecipes center" />
    <h1 class="title" v-bind= "flag" v-show= "flag" id="results_title" style="color:rgb(25, 157, 180)">There are no family recipes &#128532;</h1>
  </div>
</template>

<script>
import FamilyRecipePreviewList from "../components/FamilyRecipePreviewList";
export default {
  components: {
    FamilyRecipePreviewList
  },
  data() {
    return{
    family_recipes:[],
    flag: false
    };
  },
  created() {
  //   this.axios.get(
  //     process.env.VUE_APP_ROOT_API+ "/users/familyRecipes",
  //   ).then(res=>{
  //   this.family_recipes = res.data;
  // });

  //   if( this.family_recipes.length){
  //     this.flag = true;

  //   }
  
    this.family_recipes = 
    [
    {
        "id": 1,
        "user_id": 1,
        "creator": "Zoor Faamily",
        "eating_time": "Every day",
        "title": "Olive Pie",
        "readyInMinutes": 40,
        "image": "https://i.pinimg.com/originals/f6/cd/3b/f6cd3b049e1e3c337d8a142605d0816c.jpg",
        "popularity": 10,
        "vegan": "false",
        "vegetarian": "true",
        "glutenFree": "false",
        "ingridients": "olives: 1 cup ,eggs:3 ,yellow cheese:4 slices, wheat flour:1 cup, oil:half cup",
        "instructions": "mix it all and to the oven",
        "servings": 6
    },
    ]
  },
};
</script>

<style lang="scss" scoped>
.FamilyRecipes {
  margin: 10px 0 10px;
  margin-top: -15%
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
