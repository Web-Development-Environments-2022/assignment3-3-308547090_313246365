<template>
  <div class="container">
    <h1 class="title">Search Recipes</h1>
    <div class="btn-group" role="group" aria-label="Button group with nested dropdown">


      <!-- <div class="btn-group" role="group">
        <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Diet
        </button>
        <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
          <a class="dropdown-item" href="#">Dropdown link</a>
          <a class="dropdown-item" href="#">Dropdown link</a>
        </div>
      </div>

        <div class="btn-group" role="group">
       
        <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Cuisine
        </button>
        <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
          <a class="dropdown-item" href="#">Dropdown link</a>
          <a class="dropdown-item" href="#">Dropdown linkdddd</a>
        </div>
      </div>

      
        <div class="btn-group" role="group">
        <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Intolerances
        </button>
        <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
          <a class="b-dropdown-item" href="#">Dropdown link</a>
          <a class="dropdown-item" href="#">Dropdown link</a>
        </div>
      </div> -->
      <form class="form-inline my-2 my-lg-0" style="padding-left:210px;">
      <img src="../assets/magdelet.png" style="width: 60px; height:60px;padding-right:10px;">
      <input class="form-control mr-sm-2" type="search" placeholder="Search food" aria-label="Search" style="width: 400px; height:57px;">
  
      <button class="btn btn-secondary" type="submit" style="width: 150px; height:57px;font-size:20px;  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">Search!</button>
    
    </form>
      


    </div>
  
  <div>
       <multiselect v-model="value" :options="options" ></multiselect>

   
   
  </div>
  <h1 class="title" style="padding:200px 20px 10px 10px;">Results</h1>
  </div>
</template>


<script>
  import Multiselect from 'vue-multiselect'

  // register globally
  //Vue.component('multiselect', Multiselect)

  export default {
    // OR register locally
    components: { Multiselect },
    data () {
      return {
        value: null,
        options: ['list', 'of', 'options'],

        diet:  [
              "Gluten Free",
              "Ketogenic",
              "Vegetarian",
              "Lacto-Vegetarian",
              "Ovo-Vegetarian",
              "Vegan",
              "Pescetarian",
              "Paleo",
              "Primal",
              "Low FODMAP",
              "Whole30"
              ],
        cuisine:
                [
                "African",
                "American",
                "British",
                "Cajun",
                "Caribbean",
                "Chinese",
                "Eastern European",
                "European",
                "French",
                "German",
                "Greek",
                "Indian",
                "Irish",
                "Italian",
                "Japanese",
                "Jewish",
                "Korean",
                "Latin American",
                "Mediterranean",
                "Mexican",
                "Middle Eastern",
                "Nordic",
                "Southern",
                "Spanish",
                "Thai",
                "Vietnamese"
                ],
        
        intolerances:
        [
          "Dairy",
          "Egg",
          "Gluten",
          "Grain",
          "Peanut",
          "Seafood",
          "Sesame",
          "Shellfish",
          "Soy",
          "Sulfite",
          "Tree Nut",
          "Wheat",
        ]

      }
    }
  }
</script>


<style>
.title{
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  height:150px;
  align-content: center;
}
</style>