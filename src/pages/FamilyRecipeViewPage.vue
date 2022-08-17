<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
          
            <div class="mb-3">
              <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
                <div>Recipe belongs to: {{ recipe.creator }} </div>
                <div>Usually made at: {{ recipe.eating_time }} </div>
                <div>servings: {{ recipe.servings }} </div>
                <div>Likes: {{ recipe.popularity }} likes</div>
                <div> Is vegan: <img v-if=recipe.vegan src="../assets/vegan.png" style="width: 30px; height:30px;">
                <a v-if=!recipe.vegan>X</a>
                </div>
                 <div> Is vegetarian: <img v-if=recipe.vegetarian src="../assets/vegeterian.png" style="width: 30px; height:30px;">
                <a v-if=!recipe.vegetarian>X</a>
                  </div>
                 <div>Is glutenFree: <img v-if=recipe.glutenFree src="../assets/no-wheat.png" style="width: 30px; height:30px;">
                <a v-if=!recipe.glutenFree>X</a>
                </div>
                <!-- <div> Is it one of my favorites: {{ recipe.isFavorite }} </div>
                <div> Did I watch it before:  {{ recipe.wasWatched }} </div> -->
            </div>
            Ingredients:
            
              <li v-for="ingredient in recipe.ingredients" :key="ingredient.id">
                {{ ingredient }}
              </li>
            
          </div>
          <div class="wrapped">
            <div>
            Instructions:
            <br>
            <div style="text-overflow:ellipsis;" >
            {{recipe.instructions }};
      
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null
    };
  },
  async created() {
    try {
      let response;
      // response = this.$route.params.response;

      try {


        //=====AXIOS======
        response = await this.axios.get(
          // "https://test-for-3-2.herokuapp.com/recipes/info",
          //this.$root.store.server_domain + "/recipes/info",
          process.env.VUE_APP_ROOT_API+ "/users/familyRecipe",
          
          {
            params: { id: this.$route.params.recipeId }
          }
        );

        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      let {
        id,
        creator,
        eating_time,
        title,
        readyInMinutes,
        image,
        popularity,
        vegan,
        vegetarian,
        glutenFree,
        ingredients,
        instructions,
        servings,
        isFavorite,
        wasWatched,
        
      } = response.data;

      let _recipe = {
        id,
        creator,
        eating_time,
        title,
        readyInMinutes,
        image,
        popularity,
        vegan,
        vegetarian,
        glutenFree,
        ingredients,
        instructions,
        servings,
        isFavorite,
        wasWatched,
      };
      
      _recipe.instructions = removeTags(_recipe.instructions);
      _recipe.ingredients = _recipe.ingredients.split(',');

      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
    }
  }
};
function removeTags(str) {
    if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();
          
    // Regular expression to identify HTML tags in 
    // the input string. Replacing the identified 
    // HTML tag with a null string.
    return str.replace( /(<([^>]+)>)/ig, '');
}
</script>


<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
/* .recipe-header{

} */
</style>
