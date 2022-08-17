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
                 <div> Is it one of my favorites: {{ recipe.isFavorite }} </div>
                 <div> Did I watch it before:  {{ recipe.wasWatched }} </div>
            </div>
            Ingredients:
            
              <!-- <li
                v-for="s in recipe.ingredients" :key="s.id">
                {{ s.original}}
              </li> -->

            <li v-for="ingredient in recipe.ingredients" :key="ingredient.id">
                {{ ingredient }}
              </li>
            
          </div>
          <div class="wrapped">
            Instructions:
            <br>
            <div style="text-overflow:ellipsis;" > 
            <!-- <pre style="text-overflow:ellipsis;"> -->
            
            {{ recipe.instructions }}
           
            <!-- </pre> -->
          
            </div>
         
          </div>
        </div>
      </div>
      <!-- <pre>
      {{ $route.params }}
      {{ recipe }}
    </pre
      > -->
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
          process.env.VUE_APP_ROOT_API+ "/users/myRecipe",
          
          {
            params: { id: this.$route.params.recipeId }
          }
        );
       //example ={"id":648348,"title":"Jalapeno Cornbread Stuffing","readyInMinutes":45,"image":"https://spoonacular.com/recipeImages/648348-556x370.jpg","popularity":9,"vegan":false,"vegetarian":true,"glutenFree":false,"servings":10,"ingredients":[{"id":1145,"aisle":"Milk, Eggs, Other Dairy","image":"butter-sliced.jpg","consistency":"SOLID","name":"unsalted butter","nameClean":"unsalted butter","original":"2 tablespoons unsalted butter","originalName":"unsalted butter","amount":2,"unit":"tablespoons","meta":["unsalted"],"measures":{"us":{"amount":2,"unitShort":"Tbsps","unitLong":"Tbsps"},"metric":{"amount":2,"unitShort":"Tbsps","unitLong":"Tbsps"}}},{"id":10011282,"aisle":"Produce","image":"red-onion.png","consistency":"SOLID","name":"red onion","nameClean":"red onion","original":"1 cup red onion, chopped","originalName":"red onion, chopped","amount":1,"unit":"cup","meta":["red","chopped"],"measures":{"us":{"amount":1,"unitShort":"cup","unitLong":"cup"},"metric":{"amount":236.588,"unitShort":"ml","unitLong":"milliliters"}}},{"id":11143,"aisle":"Produce","image":"celery.jpg","consistency":"SOLID","name":"celery","nameClean":"celery","original":"1 cup celery, finely chopped","originalName":"celery, finely chopped","amount":1,"unit":"cup","meta":["finely chopped"],"measures":{"us":{"amount":1,"unitShort":"cup","unitLong":"cup"},"metric":{"amount":236.588,"unitShort":"ml","unitLong":"milliliters"}}},{"id":11819,"aisle":"Produce","image":"red-chili.jpg","consistency":"SOLID","name":"chile peppers","nameClean":"chili pepper","original":"3 jalapeno chile peppers, seeded and diced","originalName":"jalapeno chile peppers, seeded and diced","amount":3,"unit":"","meta":["diced","seeded"],"measures":{"us":{"amount":3,"unitShort":"","unitLong":""},"metric":{"amount":3,"unitShort":"","unitLong":""}}},{"id":12142,"aisle":"Nuts;Baking","image":"pecans.jpg","consistency":"SOLID","name":"pecans","nameClean":"pecans","original":"1 cup toasted pecans, coarsely chopped","originalName":"toasted pecans, coarsely chopped","amount":1,"unit":"cup","meta":["toasted","coarsely chopped"],"measures":{"us":{"amount":1,"unitShort":"cup","unitLong":"cup"},"metric":{"amount":236.588,"unitShort":"ml","unitLong":"milliliters"}}},{"id":18023,"aisle":"Bakery/Bread","image":"cornbread.jpg","consistency":"SOLID","name":"cornbread","nameClean":"cornbread","original":"8 cups cornbread, crumbled","originalName":"cornbread, crumbled","amount":8,"unit":"cups","meta":["crumbled"],"measures":{"us":{"amount":8,"unitShort":"cups","unitLong":"cups"},"metric":{"amount":1.893,"unitShort":"l","unitLong":"liters"}}},{"id":11165,"aisle":"Produce;Spices and Seasonings","image":"cilantro.png","consistency":"SOLID","name":"fresh cilantro","nameClean":"cilantro","original":"1/4 cup fresh cilantro, chopped","originalName":"fresh cilantro, chopped","amount":0.25,"unit":"cup","meta":["fresh","chopped"],"measures":{"us":{"amount":0.25,"unitShort":"cups","unitLong":"cups"},"metric":{"amount":59.147,"unitShort":"ml","unitLong":"milliliters"}}},{"id":2047,"aisle":"Spices and Seasonings","image":"salt.jpg","consistency":"SOLID","name":"salt","nameClean":"table salt","original":"1 teaspoon salt","originalName":"salt","amount":1,"unit":"teaspoon","meta":[],"measures":{"us":{"amount":1,"unitShort":"tsp","unitLong":"teaspoon"},"metric":{"amount":1,"unitShort":"tsp","unitLong":"teaspoon"}}},{"id":1002030,"aisle":"Spices and Seasonings","image":"pepper.jpg","consistency":"SOLID","name":"black pepper","nameClean":"black pepper","original":"1 teaspoon black pepper","originalName":"black pepper","amount":1,"unit":"teaspoon","meta":["black"],"measures":{"us":{"amount":1,"unitShort":"tsp","unitLong":"teaspoon"},"metric":{"amount":1,"unitShort":"tsp","unitLong":"teaspoon"}}},{"id":2031,"aisle":"Spices and Seasonings","image":"chili-powder.jpg","consistency":"SOLID","name":"cayenne pepper","nameClean":"ground cayenne pepper","original":"1/4 teaspoon cayenne pepper, optional","originalName":"cayenne pepper, optional","amount":0.25,"unit":"teaspoon","meta":[],"measures":{"us":{"amount":0.25,"unitShort":"tsps","unitLong":"teaspoons"},"metric":{"amount":0.25,"unitShort":"tsps","unitLong":"teaspoons"}}},{"id":6194,"aisle":"Canned and Jarred","image":"chicken-broth.png","consistency":"LIQUID","name":"chicken broth","nameClean":"chicken broth","original":"1 cup chicken broth, or more as needed","originalName":"chicken broth, or more as needed","amount":1,"unit":"cup","meta":["as needed"],"measures":{"us":{"amount":1,"unitShort":"cup","unitLong":"cup"},"metric":{"amount":236.588,"unitShort":"ml","unitLong":"milliliters"}}}],"instructions":"Preheat oven to 350F (175C).\nMelt butter in a large skillet over medium high heat.\nAdd onion, celery, and jalapeno peppers and cook until tender, about 5 minutes.\nAdd pecans and cook for one minute more.\nPlace crumbled cornbread in a large bowl; add onion-pecan mixture, cilantro and seasonings. Toss to mix.\nAdd enough chicken broth to moisten; about 1 cup.\nUse as a stuffing or spoon into a greased baking dish.\nBake until the top has formed a crust and the stuffing is heated through, about 25 to 30 minutes. Serve hot.","isFavorite":false,"wasWatched":false}

        // console.log("response.status", response.status);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      let {
        id,
        title,
        readyInMinutes,
        image,
        popularity,
        vegan,
        vegetarian,
        glutenFree,
        servings,
        ingredients,
        instructions,
        isFavorite,
        wasWatched,
      } = response.data;

      response.data.instructions = removeTags(response.data.instructions);


      // let _ingredients = ingredients
      //   .map(ing => {
      //     ing.original
      //     return ing;
      //   })
       

      let _recipe = {
        //_instructions,
        id,
        title,
        readyInMinutes,
        image,
        popularity,
        vegan,
        vegetarian,
        glutenFree,
        servings,
        ingredients,
        instructions,
        isFavorite,
        wasWatched,
      };

        _recipe.ingredients = _recipe.ingredients.split(',');
      console.log("===ingredients====")
      console.log(_recipe.ingredients)

      console.log("===instructions====")
      console.log(_recipe.instructions)

      
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
