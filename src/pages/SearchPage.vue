<template>
  <div class="cont">
    <h1 class="title1" >Search Recipes</h1>
    <div
      class="btn-group"
      role="group"
      aria-label="Button group with nested dropdown"
    >
      <form class="form-inline my-2 my-lg-0" style="padding-left:210px;">
        <img
          src="../assets/magdelet.png"
          style="width: 60px; height:60px;padding-right:10px;"
        />

        <!-- == SEARCH TEXT == -->
        <input
          class="form-control mr-sm-2" 
          type="search"
    
          v-model="form.search_filter"
          placeholder="Search food"
          aria-label="Search"
          style="width: 400px; height:57px;"
        />

        <button
          class="btn btn-secondary"
          type="submit"
          style="width: 150px; height:57px;font-size:20px;  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"
          @click="onSubmit"        
        >
          Search!
        </button>
      </form>
    <!-- v-model="$v.form.intolerances_filter.$model" -->
    <div class="row my-container">
      <div class="col-md-4">
        <label class="typo__label"> Choose Intolerances:</label>
        <multiselect
        style="width:400px"
          v-model="form.intolerances_filter"
          tag-placeholder="Add this as new tag"
          placeholder="Choose Intolerances"
          label="label"
          track-by="id"
          :options="intolerances_list"
          :multiple="true"
          :taggable="true"
        ></multiselect>
      </div>
    </div>
<!-- v-model="$v.form.cuisines_filter.$model" -->
    <div class="row my-container">
      <div class="col-md-4">
        <label class="typo__label"> Choose Cusines:</label>
        <multiselect
        style="width:400px"
          v-model="form.cuisines_filter"
          tag-placeholder="Add this as new tag"
          placeholder= "Choose Cusines"
          label="label"
          track-by="id"
          :options="cuisines_list"
          :multiple="true"
          :taggable="true"
        ></multiselect>

      </div>
    </div>
    <!-- v-model="$v.form.diets_filter.$model" -->
    <div class="row my-container">
      <div class="col-md-4">
        <label class="typo__label"> Choose Diet:</label>
        <multiselect
        style="width:400px"
          v-model="form.diets_filter"
          tag-placeholder="Add this as new tag"
          placeholder="Choose Diet"
          label="label"
          track-by="id"
          :options="diets_list"
          :multiple="false"
          :taggable="false"
        ></multiselect>
      </div>
    </div>
<!-- v-model="$v.form.results_num.$model" -->
    <div class="row my-container">
      <div class="col-md-4">
        <label class="typo__label"> Choose Results Number:</label>
        <multiselect
        style="width:400px"
          v-model="form.results_num"
          tag-placeholder="Add this as new tag"
          placeholder="Choose Results Number"
          label="label"
          track-by="id"
          :options="results_list"
          :multiple="false"
          :taggable="false"
          :allowEmpty="false"
        ></multiselect>
      </div>

    </div>
  </div>



  <br>
  <br>
  <br>
 
    <h1 class="title1"  v-show="!flag" >Results</h1>
     <div>
    <div class="form-check form-check-inline" v-show="search_results.length">
  <input class="form-check-input" @change="sortByTime" type="checkbox" id="inlineCheckbox1" value="option1" />
  <label class="form-check-label" for="inlineCheckbox1"> Sort by preperation time</label>
  </div>

<div class="form-check form-check-inline" v-show="search_results.length">
  <input class="form-check-input" @change="sortByPopularity" type="checkbox" id="inlineCheckbox2" value="option2" />
  <label class="form-check-label" for="inlineCheckbox2">Sort by popularity</label>
</div>
</div>
    <RecipePreviewList  v-if="search_results.length" :recipes_list = "search_results"  />
    <h1 class="title"  v-if="flag" id="results_title" style="color:rgb(25, 157, 180)">No Results &#128532;</h1>
  </div>
</template>

<script>
// import Mselect from "../components/multiselect.vue";

// register globally
//Vue.component('multiselect', Multiselect)

import Multiselect from "vue-multiselect";
import RecipePreviewList from "../components/RecipePreviewList";



export default {
  //name:"Search",
   components: { Multiselect, RecipePreviewList,},

  data() {
    return {

      form:{
        results_num: { label: "5", id: "1" },
        diets_filter: [],
        cuisines_filter: [],
        intolerances_filter: [],
        diets_param: "",
        cuisines_param: "",
        intolerances_param: "",
        search_filter:"",
        submitError: undefined,
        results_num_param:"",

      },
      search_results: [],
      //===== save search ======
      searches_list: [],
      search_id: 1,
      flag: false,
      errors: [],
        // ====== helper lists ====
        results_list: [
          { label: "5", id: "1" },
          { label: "10", id: "2" },
          { label: "15", id: "3" },
        ],
        diets_list: [
          { label: "Gluten Free", id: "1" },
          { label: "Ketogenic", id: "2" },
          { label: "Vegetarian", id: "3" },
          { label: "Lacto-Vegetarian", id: "4" },
          { label: "Ovo-Vegetarian", id: "5" },
          { label: "Vegan", id: "6" },
          { label: "Pescetarian", id: "7" },
          { label: "Paleo", id: "8" },
          { label: "Primal", id: "9" },
          { label: "Low FODMAP", id: "10" },
          { label: "Whole30", id: "11" },
        ],
        cuisines_list: [
            { label: "African", id: "1" },
            { label: "American", id: "2" },
            { label: "British", id: "3" },
            { label: "Cajun", id: "4" },
            { label: "Caribbean", id: "5" },
            { label: "European", id: "6" }, 
            { label: "French", id: "7" },
            { label: "German", id: "8" },
            { label: "Greek", id: "9" },
            { label: "Indian", id: "10" },
            { label: "Irish", id: "11" },
            { label: "Italian", id: "12" },
            { label: "Japanese", id: "13" },
            { label: "Jewish", id: "14" },
            { label: "Korean", id: "15" },
            { label: "Latin American", id: "16" },
            { label: "Mediterranean", id: "17" },
            { label: "Mexican", id: "18" },
            { label: "Middle Eastern", id: "19" },
            { label: "Nordic", id: "20" },
            { label: "Southern", id: "21" },
            { label: "Spanish", id: "22" },
            { label: "Thai", id: "23" },
            { label: "Vietnamese", id: "24" }
        ],
        intolerances_list: [
          { label: "Dairy", id: "1" },
          { label: "Egg", id: "2" },
          { label: "Gluten", id: "3" },
          { label: "Grain", id: "4" },
          { label: "Peanut", id: "5" },
          { label: "Seafood", id: "6" },
          { label: "Sesame", id: "7" },
          { label: "Shellfish", id: "8" },
          { label: "Soy", id: "9" },
          { label: "Sulfite", id: "10" },
          { label: "Tree Nut", id: "11" },
          { label: "Wheat", id: "12" },
        ],
    };


    },

  //   validations: {
  //     form: {
  //       intolerances_filter: {},
  //       diets_filter: {},
  //       cuisines_filter: {},
  //       search_filter: {},
  //       results_num: {}
  //     }

  // },
  created(){
    //show  last search 
    // if(this.$root.username & sessionStorage.getItem('last_search').length ){
    //     this.search_results = sessionStorage.getItem('last_search');
    // }


    if(this.$root.store.username.length & this.$root.store.last_search.length ){
        this.search_results = this.$root.store.last_search;
    }

  },

  methods: {
 
      sortByTime(){
               
           this.search_results.sort((a, b) => a.readyInMinutes - b.readyInMinutes );

      },

      sortByPopularity(){
        
            this.search_results.sort((a, b) => -(a.popularity - b.popularity) );
      },

      async onSearch() {
      try {
      

        //== send response ==
        const response = await this.axios.get(
   
           process.env.VUE_APP_ROOT_API+"/recipes/searchRecipe",
          
          {params:{
            query: this.form.search_filter,
            titleMatch: this.form.search_filter,
            number: this.form.results_num_param,
            cusine: this.form.cuisines_param,
            diet: this.form.diets_param,
            intolerances: this.form.intolerances_param}
          }
        );

          console.log("search ok")
          console.log(response.data);
          this.search_results = response.data;

        //constant list TO DELETE 
//         this.search_results = [
//     {
//         "id": 637876,
//         "title": "Chicken 65",
//         "readyInMinutes": 45,
//         "image": "https://spoonacular.com/recipeImages/637876-556x370.jpg",
//         "popularity": 6,
//         "vegan": false,
//         "vegetarian": false,
//         "glutenFree": true,
//         "servings": 6,
//         "cuisines": [],
//         "diets": [
//             "gluten free"
//         ],
//         "instructions": [
//             {
//                 "name": "",
//                 "steps": [
//                     {
//                         "number": 1,
//                         "step": "Take a large bowl mix in the ginger and garlic paste, yogurt, red chilly powder, turmeric powder, and salt.",
//                         "ingredients": [
//                             {
//                                 "id": 2043,
//                                 "name": "turmeric",
//                                 "localizedName": "turmeric",
//                                 "image": "turmeric.jpg"
//                             },
//                             {
//                                 "id": 2009,
//                                 "name": "chili powder",
//                                 "localizedName": "chili powder",
//                                 "image": "chili-powder.jpg"
//                             },
//                             {
//                                 "id": 10111215,
//                                 "name": "garlic paste",
//                                 "localizedName": "garlic paste",
//                                 "image": "garlic-paste.png"
//                             },
//                             {
//                                 "id": 11216,
//                                 "name": "ginger",
//                                 "localizedName": "ginger",
//                                 "image": "ginger.png"
//                             },
//                             {
//                                 "id": 1116,
//                                 "name": "yogurt",
//                                 "localizedName": "yogurt",
//                                 "image": "plain-yogurt.jpg"
//                             },
//                             {
//                                 "id": 2047,
//                                 "name": "salt",
//                                 "localizedName": "salt",
//                                 "image": "salt.jpg"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404783,
//                                 "name": "bowl",
//                                 "localizedName": "bowl",
//                                 "image": "bowl.jpg"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 2,
//                         "step": "Mix well to from smooth and thick paste, add the chicken pieces to the masala paste and  marinaded for 4 hours.",
//                         "ingredients": [
//                             {
//                                 "id": 1005006,
//                                 "name": "chicken pieces",
//                                 "localizedName": "chicken pieces",
//                                 "image": "chicken-parts.jpg"
//                             }
//                         ],
//                         "equipment": [],
//                         "length": {
//                             "number": 240,
//                             "unit": "minutes"
//                         }
//                     },
//                     {
//                         "number": 3,
//                         "step": "Heat enough oil in a pan to deep fry the marinaded chicken pieces. Deep fry the chicken pieces in batches till crisp and golden color.Note: The taste of the Chicken 65 depends mainly on the amount of time it gets marinated in the masala, it is best to marinate the chicken pieces the day before.",
//                         "ingredients": [
//                             {
//                                 "id": 1005006,
//                                 "name": "chicken pieces",
//                                 "localizedName": "chicken pieces",
//                                 "image": "chicken-parts.jpg"
//                             },
//                             {
//                                 "id": 5006,
//                                 "name": "whole chicken",
//                                 "localizedName": "whole chicken",
//                                 "image": "whole-chicken.jpg"
//                             },
//                             {
//                                 "id": 4582,
//                                 "name": "cooking oil",
//                                 "localizedName": "cooking oil",
//                                 "image": "vegetable-oil.jpg"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404645,
//                                 "name": "frying pan",
//                                 "localizedName": "frying pan",
//                                 "image": "pan.png"
//                             }
//                         ]
//                     }
//                 ]
//             }
//         ],
//         "isFavorite": false,
//         "wasWatched": false
//     },
//     {
//         "id": 716342,
//         "title": "Chicken Suya",
//         "readyInMinutes": 45,
//         "image": "https://spoonacular.com/recipeImages/716342-556x370.jpg",
//         "popularity": 56,
//         "vegan": false,
//         "vegetarian": false,
//         "glutenFree": true,
//         "servings": 1,
//         "cuisines": [],
//         "diets": [
//             "gluten free",
//             "dairy free",
//             "whole 30",
//             "ketogenic"
//         ],
//         "instructions": [
//             {
//                 "name": "",
//                 "steps": [
//                     {
//                         "number": 1,
//                         "step": "Heat the oven to 500 F.Wash and season the chicken with the Suya spice, chilli powder, seasoning cubes, salt and drizzle the oil over it.",
//                         "ingredients": [
//                             {
//                                 "id": 0,
//                                 "name": "seasoning cube",
//                                 "localizedName": "seasoning cube",
//                                 "image": "stock-cube.jpg"
//                             },
//                             {
//                                 "id": 2009,
//                                 "name": "chili powder",
//                                 "localizedName": "chili powder",
//                                 "image": "chili-powder.jpg"
//                             },
//                             {
//                                 "id": 5006,
//                                 "name": "whole chicken",
//                                 "localizedName": "whole chicken",
//                                 "image": "whole-chicken.jpg"
//                             },
//                             {
//                                 "id": 2047,
//                                 "name": "salt",
//                                 "localizedName": "salt",
//                                 "image": "salt.jpg"
//                             },
//                             {
//                                 "id": 4582,
//                                 "name": "cooking oil",
//                                 "localizedName": "cooking oil",
//                                 "image": "vegetable-oil.jpg"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404784,
//                                 "name": "oven",
//                                 "localizedName": "oven",
//                                 "image": "oven.jpg",
//                                 "temperature": {
//                                     "number": 500,
//                                     "unit": "Fahrenheit"
//                                 }
//                             }
//                         ]
//                     },
//                     {
//                         "number": 2,
//                         "step": "Place the chicken in the oven and grill for 40 minutes. Check the chicken occasionally and flip on both sides so it can cook properly.",
//                         "ingredients": [
//                             {
//                                 "id": 5006,
//                                 "name": "whole chicken",
//                                 "localizedName": "whole chicken",
//                                 "image": "whole-chicken.jpg"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404706,
//                                 "name": "grill",
//                                 "localizedName": "grill",
//                                 "image": "grill.jpg"
//                             },
//                             {
//                                 "id": 404784,
//                                 "name": "oven",
//                                 "localizedName": "oven",
//                                 "image": "oven.jpg"
//                             }
//                         ],
//                         "length": {
//                             "number": 40,
//                             "unit": "minutes"
//                         }
//                     },
//                     {
//                         "number": 3,
//                         "step": "Serve hot garnished with the onions and tomato and a bit of suya spice sprinkled over the chicken.",
//                         "ingredients": [
//                             {
//                                 "id": 5006,
//                                 "name": "whole chicken",
//                                 "localizedName": "whole chicken",
//                                 "image": "whole-chicken.jpg"
//                             },
//                             {
//                                 "id": 11282,
//                                 "name": "onion",
//                                 "localizedName": "onion",
//                                 "image": "brown-onion.png"
//                             },
//                             {
//                                 "id": 11529,
//                                 "name": "tomato",
//                                 "localizedName": "tomato",
//                                 "image": "tomato.png"
//                             }
//                         ],
//                         "equipment": []
//                     }
//                 ]
//             }
//         ],
//         "isFavorite": false,
//         "wasWatched": false
//     },
//     {
//         "id": 638420,
//         "title": "Chicken Wings",
//         "readyInMinutes": 45,
//         "image": "https://spoonacular.com/recipeImages/638420-556x370.jpg",
//         "popularity": 2,
//         "vegan": false,
//         "vegetarian": false,
//         "glutenFree": true,
//         "servings": 30,
//         "cuisines": [],
//         "diets": [
//             "gluten free"
//         ],
//         "instructions": [
//             {
//                 "name": "For the Chicken Wing Drummettes",
//                 "steps": [
//                     {
//                         "number": 1,
//                         "step": "Add chicken into a large glass or stainless steel bowl, toss all the seasonings and brown sugar over the chicken.Cover with plastic wrap and refrigerate for an hour or two.Preheat the oven temperature to 400 degrees F.",
//                         "ingredients": [
//                             {
//                                 "id": 19334,
//                                 "name": "brown sugar",
//                                 "localizedName": "brown sugar",
//                                 "image": "dark-brown-sugar.png"
//                             },
//                             {
//                                 "id": 1042027,
//                                 "name": "seasoning",
//                                 "localizedName": "seasoning",
//                                 "image": "seasoning.png"
//                             },
//                             {
//                                 "id": 5006,
//                                 "name": "whole chicken",
//                                 "localizedName": "whole chicken",
//                                 "image": "whole-chicken.jpg"
//                             },
//                             {
//                                 "id": 10018364,
//                                 "name": "wrap",
//                                 "localizedName": "wrap",
//                                 "image": "flour-tortilla.jpg"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404730,
//                                 "name": "plastic wrap",
//                                 "localizedName": "plastic wrap",
//                                 "image": "plastic-wrap.jpg"
//                             },
//                             {
//                                 "id": 404783,
//                                 "name": "bowl",
//                                 "localizedName": "bowl",
//                                 "image": "bowl.jpg"
//                             },
//                             {
//                                 "id": 404784,
//                                 "name": "oven",
//                                 "localizedName": "oven",
//                                 "image": "oven.jpg",
//                                 "temperature": {
//                                     "number": 400,
//                                     "unit": "Fahrenheit"
//                                 }
//                             }
//                         ]
//                     },
//                     {
//                         "number": 2,
//                         "step": "Place all the seasoned chicken onto a parchment lined baking sheet spread out so that they don't touch.  If you are doubling the recipe use two pans.",
//                         "ingredients": [
//                             {
//                                 "id": 5006,
//                                 "name": "whole chicken",
//                                 "localizedName": "whole chicken",
//                                 "image": "whole-chicken.jpg"
//                             },
//                             {
//                                 "id": 0,
//                                 "name": "spread",
//                                 "localizedName": "spread",
//                                 "image": ""
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404727,
//                                 "name": "baking sheet",
//                                 "localizedName": "baking sheet",
//                                 "image": "baking-sheet.jpg"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 3,
//                         "step": "Bake for 35 minutes.In a large bowl, add about 2 tablespoons of honey (or more if you like) and a few splashes of tabasco sauce (less or more to your liking).",
//                         "ingredients": [
//                             {
//                                 "id": 1026168,
//                                 "name": "tabasco sauce",
//                                 "localizedName": "tabasco sauce",
//                                 "image": "hot-sauce-or-tabasco.png"
//                             },
//                             {
//                                 "id": 19296,
//                                 "name": "honey",
//                                 "localizedName": "honey",
//                                 "image": "honey.png"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404784,
//                                 "name": "oven",
//                                 "localizedName": "oven",
//                                 "image": "oven.jpg"
//                             },
//                             {
//                                 "id": 404783,
//                                 "name": "bowl",
//                                 "localizedName": "bowl",
//                                 "image": "bowl.jpg"
//                             }
//                         ],
//                         "length": {
//                             "number": 35,
//                             "unit": "minutes"
//                         }
//                     },
//                     {
//                         "number": 4,
//                         "step": "Add the chicken, if it feels to hot to toss, wait a few minutes or use two spoons to coat the chicken.",
//                         "ingredients": [
//                             {
//                                 "id": 5006,
//                                 "name": "whole chicken",
//                                 "localizedName": "whole chicken",
//                                 "image": "whole-chicken.jpg"
//                             }
//                         ],
//                         "equipment": []
//                     }
//                 ]
//             },
//             {
//                 "name": "Serve hot or warm.To prepare \"Ranch\" Dip",
//                 "steps": [
//                     {
//                         "number": 1,
//                         "step": "Add chive and garlic vegan cream cheese to the coconut milk yogurt in a small bowl and mix well.",
//                         "ingredients": [
//                             {
//                                 "id": 0,
//                                 "name": "coconut milk yogurt",
//                                 "localizedName": "coconut milk yogurt",
//                                 "image": "plain-yogurt.jpg"
//                             },
//                             {
//                                 "id": 93634,
//                                 "name": "vegan cream cheese",
//                                 "localizedName": "vegan cream cheese",
//                                 "image": "cream-cheese.jpg"
//                             },
//                             {
//                                 "id": 11215,
//                                 "name": "garlic",
//                                 "localizedName": "garlic",
//                                 "image": "garlic.png"
//                             },
//                             {
//                                 "id": 11156,
//                                 "name": "chives",
//                                 "localizedName": "chives",
//                                 "image": "fresh-chives.jpg"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404783,
//                                 "name": "bowl",
//                                 "localizedName": "bowl",
//                                 "image": "bowl.jpg"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 2,
//                         "step": "Serve chilled with celery sticks and chicken wings.",
//                         "ingredients": [
//                             {
//                                 "id": 10111143,
//                                 "name": "celery rib",
//                                 "localizedName": "celery sticks",
//                                 "image": "celery.jpg"
//                             },
//                             {
//                                 "id": 5100,
//                                 "name": "chicken wings",
//                                 "localizedName": "chicken wings",
//                                 "image": "chicken-wings.png"
//                             }
//                         ],
//                         "equipment": []
//                     }
//                 ]
//             }
//         ],
//         "isFavorite": false,
//         "wasWatched": false
//     },
//     {
//         "id": 638308,
//         "title": "Chicken Satay",
//         "readyInMinutes": 45,
//         "image": "https://spoonacular.com/recipeImages/638308-556x370.jpg",
//         "popularity": 1,
//         "vegan": false,
//         "vegetarian": false,
//         "glutenFree": false,
//         "servings": 4,
//         "cuisines": [],
//         "diets": [
//             "dairy free"
//         ],
//         "instructions": [
//             {
//                 "name": "",
//                 "steps": [
//                     {
//                         "number": 1,
//                         "step": "Soak 20 bamboo skewers for at least 2 hours in a glass of water. This is to prevent the sticks from burning and breaking when placed under the grill or over the coals.",
//                         "ingredients": [
//                             {
//                                 "id": 14412,
//                                 "name": "water",
//                                 "localizedName": "water",
//                                 "image": "water.png"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 3065,
//                                 "name": "skewers",
//                                 "localizedName": "skewers",
//                                 "image": "wooden-skewers.jpg"
//                             },
//                             {
//                                 "id": 404706,
//                                 "name": "grill",
//                                 "localizedName": "grill",
//                                 "image": "grill.jpg"
//                             }
//                         ],
//                         "length": {
//                             "number": 120,
//                             "unit": "minutes"
//                         }
//                     },
//                     {
//                         "number": 2,
//                         "step": "Add the ground coriander, ground cumin, turmeric powder, chilli powder, salt, saugar, coconut cream and vegetable oil in a large bowl.",
//                         "ingredients": [
//                             {
//                                 "id": 1002013,
//                                 "name": "ground coriander",
//                                 "localizedName": "ground coriander",
//                                 "image": "ground-coriander.jpg"
//                             },
//                             {
//                                 "id": 2043,
//                                 "name": "turmeric",
//                                 "localizedName": "turmeric",
//                                 "image": "turmeric.jpg"
//                             },
//                             {
//                                 "id": 2009,
//                                 "name": "chili powder",
//                                 "localizedName": "chili powder",
//                                 "image": "chili-powder.jpg"
//                             },
//                             {
//                                 "id": 12115,
//                                 "name": "coconut cream",
//                                 "localizedName": "coconut cream",
//                                 "image": "coconut-cream.jpg"
//                             },
//                             {
//                                 "id": 4669,
//                                 "name": "vegetable oil",
//                                 "localizedName": "vegetable oil",
//                                 "image": "vegetable-oil.jpg"
//                             },
//                             {
//                                 "id": 1012014,
//                                 "name": "ground cumin",
//                                 "localizedName": "ground cumin",
//                                 "image": "ground-cumin.jpg"
//                             },
//                             {
//                                 "id": 2047,
//                                 "name": "salt",
//                                 "localizedName": "salt",
//                                 "image": "salt.jpg"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404783,
//                                 "name": "bowl",
//                                 "localizedName": "bowl",
//                                 "image": "bowl.jpg"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 3,
//                         "step": "Mix well.",
//                         "ingredients": [],
//                         "equipment": []
//                     },
//                     {
//                         "number": 4,
//                         "step": "Cut the chicken into long thin strips.Marinate the chicken in the sauce. Ensure the chicken are well coated.Tightly seal the bowl with cling wrap and place in the fridge. Leave to marinade for at least 4 hours. The longer, the better.In the meantime, prepare the sauce.Look for a reputable brand of satay sauce. I always use Lee Kum Kee.",
//                         "ingredients": [
//                             {
//                                 "id": 0,
//                                 "name": "marinade",
//                                 "localizedName": "marinade",
//                                 "image": "seasoning.png"
//                             },
//                             {
//                                 "id": 5006,
//                                 "name": "whole chicken",
//                                 "localizedName": "whole chicken",
//                                 "image": "whole-chicken.jpg"
//                             },
//                             {
//                                 "id": 0,
//                                 "name": "sauce",
//                                 "localizedName": "sauce",
//                                 "image": ""
//                             },
//                             {
//                                 "id": 10018364,
//                                 "name": "wrap",
//                                 "localizedName": "wrap",
//                                 "image": "flour-tortilla.jpg"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404783,
//                                 "name": "bowl",
//                                 "localizedName": "bowl",
//                                 "image": "bowl.jpg"
//                             }
//                         ],
//                         "length": {
//                             "number": 240,
//                             "unit": "minutes"
//                         }
//                     },
//                     {
//                         "number": 5,
//                         "step": "Add about 6 tablespoons of the satay sauce into a bowl.The rest of these steps are to be done, subject to taste. I like to taste as I add the other condiments.",
//                         "ingredients": [
//                             {
//                                 "id": 0,
//                                 "name": "sauce",
//                                 "localizedName": "sauce",
//                                 "image": ""
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404783,
//                                 "name": "bowl",
//                                 "localizedName": "bowl",
//                                 "image": "bowl.jpg"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 6,
//                         "step": "Add the crunchy peanut butter, coconut cream and water. If the sauce is too thick, thin it down with a little more water.",
//                         "ingredients": [
//                             {
//                                 "id": 16097,
//                                 "name": "crunchy peanut butter",
//                                 "localizedName": "crunchy peanut butter",
//                                 "image": "peanut-butter.png"
//                             },
//                             {
//                                 "id": 12115,
//                                 "name": "coconut cream",
//                                 "localizedName": "coconut cream",
//                                 "image": "coconut-cream.jpg"
//                             },
//                             {
//                                 "id": 0,
//                                 "name": "sauce",
//                                 "localizedName": "sauce",
//                                 "image": ""
//                             },
//                             {
//                                 "id": 14412,
//                                 "name": "water",
//                                 "localizedName": "water",
//                                 "image": "water.png"
//                             }
//                         ],
//                         "equipment": []
//                     },
//                     {
//                         "number": 7,
//                         "step": "Add the dark soy sauce, sugar and ground peanuts",
//                         "ingredients": [
//                             {
//                                 "id": 0,
//                                 "name": "dark soy sauce",
//                                 "localizedName": "dark soy sauce",
//                                 "image": "soy-sauce.jpg"
//                             },
//                             {
//                                 "id": 16091,
//                                 "name": "peanuts",
//                                 "localizedName": "peanuts",
//                                 "image": "peanuts.png"
//                             },
//                             {
//                                 "id": 19335,
//                                 "name": "sugar",
//                                 "localizedName": "sugar",
//                                 "image": "sugar-in-bowl.png"
//                             }
//                         ],
//                         "equipment": []
//                     },
//                     {
//                         "number": 8,
//                         "step": "Seal the bowl with cling wrap and set aside until ready to serve. Before serving, warm the satay sauce in the microwave oven, covered slightly, for approximately 1.5 to 2mins.When you are ready to grill the chicken, start forming satays by piercing the chicken through the bamboo skewers. I find it alot easier to pierce the meat into the sticks when they are long strips and I pierce through in an undulating manner.  Set aside until ready to use.Preheat your oven to 200 deg Celsius at GRILL.",
//                         "ingredients": [
//                             {
//                                 "id": 5006,
//                                 "name": "whole chicken",
//                                 "localizedName": "whole chicken",
//                                 "image": "whole-chicken.jpg"
//                             },
//                             {
//                                 "id": 0,
//                                 "name": "sauce",
//                                 "localizedName": "sauce",
//                                 "image": ""
//                             },
//                             {
//                                 "id": 1065062,
//                                 "name": "meat",
//                                 "localizedName": "meat",
//                                 "image": "whole-chicken.jpg"
//                             },
//                             {
//                                 "id": 10018364,
//                                 "name": "wrap",
//                                 "localizedName": "wrap",
//                                 "image": "flour-tortilla.jpg"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404762,
//                                 "name": "microwave",
//                                 "localizedName": "microwave",
//                                 "image": "microwave.jpg"
//                             },
//                             {
//                                 "id": 3065,
//                                 "name": "skewers",
//                                 "localizedName": "skewers",
//                                 "image": "wooden-skewers.jpg"
//                             },
//                             {
//                                 "id": 404706,
//                                 "name": "grill",
//                                 "localizedName": "grill",
//                                 "image": "grill.jpg"
//                             },
//                             {
//                                 "id": 404783,
//                                 "name": "bowl",
//                                 "localizedName": "bowl",
//                                 "image": "bowl.jpg"
//                             },
//                             {
//                                 "id": 404784,
//                                 "name": "oven",
//                                 "localizedName": "oven",
//                                 "image": "oven.jpg"
//                             }
//                         ],
//                         "length": {
//                             "number": 2,
//                             "unit": "minutes"
//                         }
//                     },
//                     {
//                         "number": 9,
//                         "step": "Place your oven shelf higher and closer to the top too.",
//                         "ingredients": [],
//                         "equipment": [
//                             {
//                                 "id": 404784,
//                                 "name": "oven",
//                                 "localizedName": "oven",
//                                 "image": "oven.jpg"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 10,
//                         "step": "Lay the satay sticks on a cooling mesh sitting over a flat baking sheet to collect drippings.",
//                         "ingredients": [],
//                         "equipment": [
//                             {
//                                 "id": 404727,
//                                 "name": "baking sheet",
//                                 "localizedName": "baking sheet",
//                                 "image": "baking-sheet.jpg"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 11,
//                         "step": "Place the tray of satay under the grill. And grill for 10 to 20 mins. It really depends on how thick your chicken sticks are.",
//                         "ingredients": [
//                             {
//                                 "id": 5006,
//                                 "name": "whole chicken",
//                                 "localizedName": "whole chicken",
//                                 "image": "whole-chicken.jpg"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404706,
//                                 "name": "grill",
//                                 "localizedName": "grill",
//                                 "image": "grill.jpg"
//                             }
//                         ],
//                         "length": {
//                             "number": 10,
//                             "unit": "minutes"
//                         }
//                     },
//                     {
//                         "number": 12,
//                         "step": "Remove the tray from the oven when one side of the satay is a golden brown (not dark brown!). Turn over the satay to the other side. And continue to grill till it has a nice dark golden brown. I like it a little burnt.",
//                         "ingredients": [],
//                         "equipment": [
//                             {
//                                 "id": 404706,
//                                 "name": "grill",
//                                 "localizedName": "grill",
//                                 "image": "grill.jpg"
//                             },
//                             {
//                                 "id": 404784,
//                                 "name": "oven",
//                                 "localizedName": "oven",
//                                 "image": "oven.jpg"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 13,
//                         "step": "Serve warm with satay sauce and sliced cucumber.",
//                         "ingredients": [
//                             {
//                                 "id": 11206,
//                                 "name": "cucumber",
//                                 "localizedName": "cucumber",
//                                 "image": "cucumber.jpg"
//                             },
//                             {
//                                 "id": 0,
//                                 "name": "sauce",
//                                 "localizedName": "sauce",
//                                 "image": ""
//                             }
//                         ],
//                         "equipment": []
//                     }
//                 ]
//             }
//         ],
//         "isFavorite": false,
//         "wasWatched": false
//     },
//     {
//         "id": 638174,
//         "title": "Chicken Lo Mein",
//         "readyInMinutes": 45,
//         "image": "https://spoonacular.com/recipeImages/638174-556x370.jpg",
//         "popularity": 2,
//         "vegan": false,
//         "vegetarian": false,
//         "glutenFree": false,
//         "servings": 2,
//         "cuisines": [],
//         "diets": [
//             "dairy free"
//         ],
//         "instructions": [
//             {
//                 "name": "",
//                 "steps": [
//                     {
//                         "number": 1,
//                         "step": "In a large nonstick skillet, heat oil; add ginger and garlic and cook over medium heat for 1 minute.",
//                         "ingredients": [
//                             {
//                                 "id": 11215,
//                                 "name": "garlic",
//                                 "localizedName": "garlic",
//                                 "image": "garlic.png"
//                             },
//                             {
//                                 "id": 11216,
//                                 "name": "ginger",
//                                 "localizedName": "ginger",
//                                 "image": "ginger.png"
//                             },
//                             {
//                                 "id": 4582,
//                                 "name": "cooking oil",
//                                 "localizedName": "cooking oil",
//                                 "image": "vegetable-oil.jpg"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404645,
//                                 "name": "frying pan",
//                                 "localizedName": "frying pan",
//                                 "image": "pan.png"
//                             }
//                         ],
//                         "length": {
//                             "number": 1,
//                             "unit": "minutes"
//                         }
//                     },
//                     {
//                         "number": 2,
//                         "step": "Add chicken and carrot; cook over medium-high heat, stirring occasionally, until chicken is lightly browned, about 2 minutes.",
//                         "ingredients": [
//                             {
//                                 "id": 5006,
//                                 "name": "whole chicken",
//                                 "localizedName": "whole chicken",
//                                 "image": "whole-chicken.jpg"
//                             },
//                             {
//                                 "id": 11124,
//                                 "name": "carrot",
//                                 "localizedName": "carrot",
//                                 "image": "sliced-carrot.png"
//                             }
//                         ],
//                         "equipment": [],
//                         "length": {
//                             "number": 2,
//                             "unit": "minutes"
//                         }
//                     },
//                     {
//                         "number": 3,
//                         "step": "Add remaining ingredients except noodles; cook, stirring constantly, until carrot is tender-crisp, about 3 minutes.  Stir in noodles and cook until heated through, about 1 minute.",
//                         "ingredients": [
//                             {
//                                 "id": 20420,
//                                 "name": "pasta",
//                                 "localizedName": "pasta",
//                                 "image": "fusilli.jpg"
//                             },
//                             {
//                                 "id": 11124,
//                                 "name": "carrot",
//                                 "localizedName": "carrot",
//                                 "image": "sliced-carrot.png"
//                             }
//                         ],
//                         "equipment": [],
//                         "length": {
//                             "number": 4,
//                             "unit": "minutes"
//                         }
//                     }
//                 ]
//             }
//         ],
//         "isFavorite": false,
//         "wasWatched": false
//     },
//     {
//         "id": 638125,
//         "title": "Chicken In A Pot",
//         "readyInMinutes": 45,
//         "image": "https://spoonacular.com/recipeImages/638125-556x370.jpg",
//         "popularity": 1,
//         "vegan": false,
//         "vegetarian": false,
//         "glutenFree": true,
//         "servings": 4,
//         "cuisines": [],
//         "diets": [
//             "gluten free",
//             "dairy free",
//             "paleolithic",
//             "primal",
//             "whole 30",
//             "ketogenic"
//         ],
//         "instructions": [
//             {
//                 "name": "",
//                 "steps": [
//                     {
//                         "number": 1,
//                         "step": "Adjust oven rack to lowest position and pre- heat oven to 250 degrees",
//                         "ingredients": [],
//                         "equipment": [
//                             {
//                                 "id": 404784,
//                                 "name": "oven",
//                                 "localizedName": "oven",
//                                 "image": "oven.jpg"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 2,
//                         "step": "Rinse chicken under cold water and pat dry. Season well with salt and pepper on each side",
//                         "ingredients": [
//                             {
//                                 "id": 1102047,
//                                 "name": "salt and pepper",
//                                 "localizedName": "salt and pepper",
//                                 "image": "salt-and-pepper.jpg"
//                             },
//                             {
//                                 "id": 5006,
//                                 "name": "whole chicken",
//                                 "localizedName": "whole chicken",
//                                 "image": "whole-chicken.jpg"
//                             },
//                             {
//                                 "id": 14412,
//                                 "name": "water",
//                                 "localizedName": "water",
//                                 "image": "water.png"
//                             }
//                         ],
//                         "equipment": []
//                     },
//                     {
//                         "number": 3,
//                         "step": "Heat olive oil in large Dutch Oven (9 quarts), over medium heat. Do not allow oil to smoke",
//                         "ingredients": [
//                             {
//                                 "id": 4053,
//                                 "name": "olive oil",
//                                 "localizedName": "olive oil",
//                                 "image": "olive-oil.jpg"
//                             },
//                             {
//                                 "id": 4582,
//                                 "name": "cooking oil",
//                                 "localizedName": "cooking oil",
//                                 "image": "vegetable-oil.jpg"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404667,
//                                 "name": "dutch oven",
//                                 "localizedName": "dutch oven",
//                                 "image": "dutch-oven.jpg"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 4,
//                         "step": "Place chicken breast side down. Cook until breast is lightly browned, about 5 minutes",
//                         "ingredients": [
//                             {
//                                 "id": 5062,
//                                 "name": "chicken breast",
//                                 "localizedName": "chicken breast",
//                                 "image": "chicken-breasts.png"
//                             }
//                         ],
//                         "equipment": []
//                     },
//                     {
//                         "number": 5,
//                         "step": "Using a wooden spoon inserted into cavity of the bird and flip chicken breast side up, add remaining ingredients except lemon juice, and cook about 6 to 8 minutes",
//                         "ingredients": [
//                             {
//                                 "id": 5062,
//                                 "name": "chicken breast",
//                                 "localizedName": "chicken breast",
//                                 "image": "chicken-breasts.png"
//                             },
//                             {
//                                 "id": 9152,
//                                 "name": "lemon juice",
//                                 "localizedName": "lemon juice",
//                                 "image": "lemon-juice.jpg"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404732,
//                                 "name": "wooden spoon",
//                                 "localizedName": "wooden spoon",
//                                 "image": "wooden-spoon.jpg"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 6,
//                         "step": "Remove from heat.",
//                         "ingredients": [],
//                         "equipment": []
//                     },
//                     {
//                         "number": 7,
//                         "step": "Place a large aluminum sheet over the pot, place the lid on top. This is to ensure a tight seal, so that no vapors escape during the cooking process",
//                         "ingredients": [],
//                         "equipment": [
//                             {
//                                 "id": 404752,
//                                 "name": "pot",
//                                 "localizedName": "pot",
//                                 "image": "stock-pot.jpg"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 8,
//                         "step": "Transfer the Dutch Oven in your pre heated oven. Cook approximately 1:30 minutes",
//                         "ingredients": [],
//                         "equipment": [
//                             {
//                                 "id": 404667,
//                                 "name": "dutch oven",
//                                 "localizedName": "dutch oven",
//                                 "image": "dutch-oven.jpg"
//                             },
//                             {
//                                 "id": 404784,
//                                 "name": "oven",
//                                 "localizedName": "oven",
//                                 "image": "oven.jpg"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 9,
//                         "step": "Removed pot from the oven and check the chicken internal temperature (must be at least 160 degrees)",
//                         "ingredients": [
//                             {
//                                 "id": 5006,
//                                 "name": "whole chicken",
//                                 "localizedName": "whole chicken",
//                                 "image": "whole-chicken.jpg"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404784,
//                                 "name": "oven",
//                                 "localizedName": "oven",
//                                 "image": "oven.jpg"
//                             },
//                             {
//                                 "id": 404752,
//                                 "name": "pot",
//                                 "localizedName": "pot",
//                                 "image": "stock-pot.jpg"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 10,
//                         "step": "Remove chicken and place onto a carving board, tent with foil and allow to rest about 20 minutes",
//                         "ingredients": [
//                             {
//                                 "id": 5006,
//                                 "name": "whole chicken",
//                                 "localizedName": "whole chicken",
//                                 "image": "whole-chicken.jpg"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404765,
//                                 "name": "aluminum foil",
//                                 "localizedName": "aluminum foil",
//                                 "image": "aluminum-foil.png"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 11,
//                         "step": "Strain chicken juices from the pot through a fine mesh.",
//                         "ingredients": [
//                             {
//                                 "id": 5006,
//                                 "name": "whole chicken",
//                                 "localizedName": "whole chicken",
//                                 "image": "whole-chicken.jpg"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404752,
//                                 "name": "pot",
//                                 "localizedName": "pot",
//                                 "image": "stock-pot.jpg"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 12,
//                         "step": "Place the juices into a fat separator",
//                         "ingredients": [],
//                         "equipment": []
//                     },
//                     {
//                         "number": 13,
//                         "step": "Pour the juices into a saucepan (discard any of the fat left in the separator), add lemon juice and any juices from the carving board.  Cook approximately 5 minutes and serve!",
//                         "ingredients": [
//                             {
//                                 "id": 9152,
//                                 "name": "lemon juice",
//                                 "localizedName": "lemon juice",
//                                 "image": "lemon-juice.jpg"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404669,
//                                 "name": "sauce pan",
//                                 "localizedName": "sauce pan",
//                                 "image": "sauce-pan.jpg"
//                             }
//                         ],
//                         "length": {
//                             "number": 5,
//                             "unit": "minutes"
//                         }
//                     }
//                 ]
//             }
//         ],
//         "isFavorite": false,
//         "wasWatched": false
//     },
//     {
//         "id": 667707,
//         "title": "chicken marbella",
//         "readyInMinutes": 75,
//         "image": "https://spoonacular.com/recipeImages/667707-556x370.jpg",
//         "popularity": 1,
//         "vegan": false,
//         "vegetarian": false,
//         "glutenFree": true,
//         "servings": 5,
//         "cuisines": [],
//         "diets": [
//             "gluten free",
//             "dairy free"
//         ],
//         "instructions": [
//             {
//                 "name": "",
//                 "steps": [
//                     {
//                         "number": 1,
//                         "step": "1 In a large bowl combine garlic, oregano, salt and pepper to taste, vinegar, olive oil, prunes, olives, capers with caper juice, and bay leaves.",
//                         "ingredients": [
//                             {
//                                 "id": 1102047,
//                                 "name": "salt and pepper",
//                                 "localizedName": "salt and pepper",
//                                 "image": "salt-and-pepper.jpg"
//                             },
//                             {
//                                 "id": 2004,
//                                 "name": "bay leaves",
//                                 "localizedName": "bay leaves",
//                                 "image": "bay-leaves.jpg"
//                             },
//                             {
//                                 "id": 4053,
//                                 "name": "olive oil",
//                                 "localizedName": "olive oil",
//                                 "image": "olive-oil.jpg"
//                             },
//                             {
//                                 "id": 2027,
//                                 "name": "oregano",
//                                 "localizedName": "oregano",
//                                 "image": "oregano.jpg"
//                             },
//                             {
//                                 "id": 2053,
//                                 "name": "vinegar",
//                                 "localizedName": "vinegar",
//                                 "image": "vinegar-(white).jpg"
//                             },
//                             {
//                                 "id": 2054,
//                                 "name": "capers",
//                                 "localizedName": "capers",
//                                 "image": "capers.jpg"
//                             },
//                             {
//                                 "id": 11215,
//                                 "name": "garlic",
//                                 "localizedName": "garlic",
//                                 "image": "garlic.png"
//                             },
//                             {
//                                 "id": 9195,
//                                 "name": "olives",
//                                 "localizedName": "olives",
//                                 "image": "olives-mixed.jpg"
//                             },
//                             {
//                                 "id": 9291,
//                                 "name": "prunes",
//                                 "localizedName": "prunes",
//                                 "image": "prunes.jpg"
//                             },
//                             {
//                                 "id": 1019016,
//                                 "name": "juice",
//                                 "localizedName": "juice",
//                                 "image": "apple-juice.jpg"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404783,
//                                 "name": "bowl",
//                                 "localizedName": "bowl",
//                                 "image": "bowl.jpg"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 2,
//                         "step": "Add the chicken pieces and coat completely with the marinade. Cover and let marinate, refrigerated, several hours or overnight.2 Preheat oven to 350°F. Arrange chicken in a single layer in one or two large, shallow baking pans and spoon marinade over it evenly.",
//                         "ingredients": [
//                             {
//                                 "id": 1005006,
//                                 "name": "chicken pieces",
//                                 "localizedName": "chicken pieces",
//                                 "image": "chicken-parts.jpg"
//                             },
//                             {
//                                 "id": 0,
//                                 "name": "marinade",
//                                 "localizedName": "marinade",
//                                 "image": "seasoning.png"
//                             },
//                             {
//                                 "id": 5006,
//                                 "name": "whole chicken",
//                                 "localizedName": "whole chicken",
//                                 "image": "whole-chicken.jpg"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404646,
//                                 "name": "baking pan",
//                                 "localizedName": "baking pan",
//                                 "image": "roasting-pan.jpg"
//                             },
//                             {
//                                 "id": 404784,
//                                 "name": "oven",
//                                 "localizedName": "oven",
//                                 "image": "oven.jpg",
//                                 "temperature": {
//                                     "number": 350,
//                                     "unit": "Fahrenheit"
//                                 }
//                             }
//                         ]
//                     },
//                     {
//                         "number": 3,
//                         "step": "Sprinkle brown sugar over the chicken pieces and pour white wine around them.3",
//                         "ingredients": [
//                             {
//                                 "id": 1005006,
//                                 "name": "chicken pieces",
//                                 "localizedName": "chicken pieces",
//                                 "image": "chicken-parts.jpg"
//                             },
//                             {
//                                 "id": 19334,
//                                 "name": "brown sugar",
//                                 "localizedName": "brown sugar",
//                                 "image": "dark-brown-sugar.png"
//                             },
//                             {
//                                 "id": 14106,
//                                 "name": "white wine",
//                                 "localizedName": "white wine",
//                                 "image": "white-wine.jpg"
//                             }
//                         ],
//                         "equipment": []
//                     },
//                     {
//                         "number": 4,
//                         "step": "Bake for 50 minutes to 1 hour, basting frequently with the pan juices. Chicken is done when a sharp knife inserted into the thigh pieces, at their thickest point, run with clear yellow juices (not pink).4 With a slotted spoon, move the chicken, prunes, olives, and capers to a serving platter.",
//                         "ingredients": [
//                             {
//                                 "id": 5006,
//                                 "name": "whole chicken",
//                                 "localizedName": "whole chicken",
//                                 "image": "whole-chicken.jpg"
//                             },
//                             {
//                                 "id": 2054,
//                                 "name": "capers",
//                                 "localizedName": "capers",
//                                 "image": "capers.jpg"
//                             },
//                             {
//                                 "id": 9195,
//                                 "name": "olives",
//                                 "localizedName": "olives",
//                                 "image": "olives-mixed.jpg"
//                             },
//                             {
//                                 "id": 9291,
//                                 "name": "prunes",
//                                 "localizedName": "prunes",
//                                 "image": "prunes.jpg"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404636,
//                                 "name": "slotted spoon",
//                                 "localizedName": "slotted spoon",
//                                 "image": "slotted-spoon.jpg"
//                             },
//                             {
//                                 "id": 404784,
//                                 "name": "oven",
//                                 "localizedName": "oven",
//                                 "image": "oven.jpg"
//                             },
//                             {
//                                 "id": 404745,
//                                 "name": "knife",
//                                 "localizedName": "knife",
//                                 "image": "chefs-knife.jpg"
//                             },
//                             {
//                                 "id": 404645,
//                                 "name": "frying pan",
//                                 "localizedName": "frying pan",
//                                 "image": "pan.png"
//                             }
//                         ],
//                         "length": {
//                             "number": 110,
//                             "unit": "minutes"
//                         }
//                     },
//                     {
//                         "number": 5,
//                         "step": "Pour some of the pan juices over the chicken and sprinkle generously with parsley.",
//                         "ingredients": [
//                             {
//                                 "id": 5006,
//                                 "name": "whole chicken",
//                                 "localizedName": "whole chicken",
//                                 "image": "whole-chicken.jpg"
//                             },
//                             {
//                                 "id": 11297,
//                                 "name": "parsley",
//                                 "localizedName": "parsley",
//                                 "image": "parsley.jpg"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404645,
//                                 "name": "frying pan",
//                                 "localizedName": "frying pan",
//                                 "image": "pan.png"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 6,
//                         "step": "Serve remaining juices in a gravy boat.",
//                         "ingredients": [
//                             {
//                                 "id": 6997,
//                                 "name": "gravy",
//                                 "localizedName": "gravy",
//                                 "image": "gravy.jpg"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 405912,
//                                 "name": "gravy boat",
//                                 "localizedName": "gravy boat",
//                                 "image": "gravy-boat.jpg"
//                             }
//                         ]
//                     }
//                 ]
//             }
//         ],
//         "isFavorite": false,
//         "wasWatched": false
//     },
//     {
//         "id": 638257,
//         "title": "Chicken Porridge",
//         "readyInMinutes": 45,
//         "image": "https://spoonacular.com/recipeImages/638257-556x370.jpg",
//         "popularity": 19,
//         "vegan": false,
//         "vegetarian": false,
//         "glutenFree": true,
//         "servings": 4,
//         "cuisines": [],
//         "diets": [
//             "gluten free",
//             "dairy free"
//         ],
//         "instructions": [
//             {
//                 "name": "",
//                 "steps": [
//                     {
//                         "number": 1,
//                         "step": "Deep fry shallot till golden brown, drain oil and set aside.  Retain the oil for later use.Wash rice and add oil.",
//                         "ingredients": [
//                             {
//                                 "id": 11677,
//                                 "name": "shallot",
//                                 "localizedName": "shallot",
//                                 "image": "shallots.jpg"
//                             },
//                             {
//                                 "id": 20444,
//                                 "name": "rice",
//                                 "localizedName": "rice",
//                                 "image": "uncooked-white-rice.png"
//                             },
//                             {
//                                 "id": 4582,
//                                 "name": "cooking oil",
//                                 "localizedName": "cooking oil",
//                                 "image": "vegetable-oil.jpg"
//                             }
//                         ],
//                         "equipment": []
//                     },
//                     {
//                         "number": 2,
//                         "step": "Mix rice and oil well.",
//                         "ingredients": [
//                             {
//                                 "id": 20444,
//                                 "name": "rice",
//                                 "localizedName": "rice",
//                                 "image": "uncooked-white-rice.png"
//                             },
//                             {
//                                 "id": 4582,
//                                 "name": "cooking oil",
//                                 "localizedName": "cooking oil",
//                                 "image": "vegetable-oil.jpg"
//                             }
//                         ],
//                         "equipment": []
//                     },
//                     {
//                         "number": 3,
//                         "step": "Add chicken stock, chicken breast and carrots and bring to boil.  Turn heat to low and simmer for about 1 hour.  Stir now and then.  When porridge is thicken, turn of heat and dish out the chicken breast and shred it.",
//                         "ingredients": [
//                             {
//                                 "id": 5062,
//                                 "name": "chicken breast",
//                                 "localizedName": "chicken breast",
//                                 "image": "chicken-breasts.png"
//                             },
//                             {
//                                 "id": 6172,
//                                 "name": "chicken stock",
//                                 "localizedName": "chicken stock",
//                                 "image": "chicken-broth.png"
//                             },
//                             {
//                                 "id": 0,
//                                 "name": "hot cereal",
//                                 "localizedName": "hot cereal",
//                                 "image": ""
//                             },
//                             {
//                                 "id": 11124,
//                                 "name": "carrot",
//                                 "localizedName": "carrot",
//                                 "image": "sliced-carrot.png"
//                             }
//                         ],
//                         "equipment": [],
//                         "length": {
//                             "number": 60,
//                             "unit": "minutes"
//                         }
//                     },
//                     {
//                         "number": 4,
//                         "step": "Put the shredded chicken meat back into the porridge.  Warm it before serving and garnish with spring onion, parsley, ginger and fried shallots and a few drops of shallot's oil.",
//                         "ingredients": [
//                             {
//                                 "id": 1005114,
//                                 "name": "shredded chicken",
//                                 "localizedName": "shredded chicken",
//                                 "image": "rotisserie-chicken.png"
//                             },
//                             {
//                                 "id": 11291,
//                                 "name": "spring onions",
//                                 "localizedName": "spring onions",
//                                 "image": "spring-onions.jpg"
//                             },
//                             {
//                                 "id": 0,
//                                 "name": "hot cereal",
//                                 "localizedName": "hot cereal",
//                                 "image": ""
//                             },
//                             {
//                                 "id": 11677,
//                                 "name": "shallot",
//                                 "localizedName": "shallot",
//                                 "image": "shallots.jpg"
//                             },
//                             {
//                                 "id": 11297,
//                                 "name": "parsley",
//                                 "localizedName": "parsley",
//                                 "image": "parsley.jpg"
//                             },
//                             {
//                                 "id": 11216,
//                                 "name": "ginger",
//                                 "localizedName": "ginger",
//                                 "image": "ginger.png"
//                             },
//                             {
//                                 "id": 1065062,
//                                 "name": "meat",
//                                 "localizedName": "meat",
//                                 "image": "whole-chicken.jpg"
//                             },
//                             {
//                                 "id": 4582,
//                                 "name": "cooking oil",
//                                 "localizedName": "cooking oil",
//                                 "image": "vegetable-oil.jpg"
//                             }
//                         ],
//                         "equipment": []
//                     }
//                 ]
//             }
//         ],
//         "isFavorite": false,
//         "wasWatched": false
//     },
//     {
//         "id": 637999,
//         "title": "Chicken Burritos",
//         "readyInMinutes": 45,
//         "image": "https://spoonacular.com/recipeImages/637999-556x370.jpg",
//         "popularity": 2,
//         "vegan": false,
//         "vegetarian": false,
//         "glutenFree": false,
//         "servings": 4,
//         "cuisines": [],
//         "diets": [
//             "dairy free"
//         ],
//         "instructions": [
//             {
//                 "name": "",
//                 "steps": [
//                     {
//                         "number": 1,
//                         "step": "Cut the chicken thighs into one inch sized pieces.",
//                         "ingredients": [
//                             {
//                                 "id": 5091,
//                                 "name": "chicken thighs",
//                                 "localizedName": "chicken thighs",
//                                 "image": "chicken-thigh.jpg"
//                             }
//                         ],
//                         "equipment": []
//                     },
//                     {
//                         "number": 2,
//                         "step": "Add about 2 teaspoons of salt and 2 teaspoons of pepper. Or do what I always do for dishes that call for salt and pepper. I use Masterfoods Garlic Pepper. Give it a good sprinkle, about 1 tablespoon of it. Set aside to marinate for a couple of hours.Slice the top of the tomatoes off.Using a small spoon, scoop out the soft insides of the tomatoes. This reduces the moisture in the dish and prevents sogginess.Chop the tomatoes up into small bits.Chop the onions into small bits.",
//                         "ingredients": [
//                             {
//                                 "id": 1102047,
//                                 "name": "salt and pepper",
//                                 "localizedName": "salt and pepper",
//                                 "image": "salt-and-pepper.jpg"
//                             },
//                             {
//                                 "id": 11529,
//                                 "name": "tomato",
//                                 "localizedName": "tomato",
//                                 "image": "tomato.png"
//                             },
//                             {
//                                 "id": 11215,
//                                 "name": "garlic",
//                                 "localizedName": "garlic",
//                                 "image": "garlic.png"
//                             },
//                             {
//                                 "id": 11282,
//                                 "name": "onion",
//                                 "localizedName": "onion",
//                                 "image": "brown-onion.png"
//                             },
//                             {
//                                 "id": 1002030,
//                                 "name": "pepper",
//                                 "localizedName": "pepper",
//                                 "image": "pepper.jpg"
//                             },
//                             {
//                                 "id": 2047,
//                                 "name": "salt",
//                                 "localizedName": "salt",
//                                 "image": "salt.jpg"
//                             }
//                         ],
//                         "equipment": []
//                     },
//                     {
//                         "number": 3,
//                         "step": "Place the onions and tomatoes in a large bowl.Chop up a bunch of cilantro. Use as much or as little as you like.",
//                         "ingredients": [
//                             {
//                                 "id": 11165,
//                                 "name": "cilantro",
//                                 "localizedName": "cilantro",
//                                 "image": "cilantro.png"
//                             },
//                             {
//                                 "id": 11529,
//                                 "name": "tomato",
//                                 "localizedName": "tomato",
//                                 "image": "tomato.png"
//                             },
//                             {
//                                 "id": 11282,
//                                 "name": "onion",
//                                 "localizedName": "onion",
//                                 "image": "brown-onion.png"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404783,
//                                 "name": "bowl",
//                                 "localizedName": "bowl",
//                                 "image": "bowl.jpg"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 4,
//                         "step": "Add the cilantro to the onions-tomatoes mixture. Toss together and set aside.",
//                         "ingredients": [
//                             {
//                                 "id": 11165,
//                                 "name": "cilantro",
//                                 "localizedName": "cilantro",
//                                 "image": "cilantro.png"
//                             },
//                             {
//                                 "id": 11529,
//                                 "name": "tomato",
//                                 "localizedName": "tomato",
//                                 "image": "tomato.png"
//                             },
//                             {
//                                 "id": 11282,
//                                 "name": "onion",
//                                 "localizedName": "onion",
//                                 "image": "brown-onion.png"
//                             }
//                         ],
//                         "equipment": []
//                     },
//                     {
//                         "number": 5,
//                         "step": "Cut a slit round an avocado, against its seed.Holding each side of the cut avocado, twist the avocado open to reveal the seed.",
//                         "ingredients": [
//                             {
//                                 "id": 9037,
//                                 "name": "avocado",
//                                 "localizedName": "avocado",
//                                 "image": "avocado.jpg"
//                             }
//                         ],
//                         "equipment": []
//                     },
//                     {
//                         "number": 6,
//                         "step": "Remove the seed and scoop out the flesh.",
//                         "ingredients": [],
//                         "equipment": []
//                     },
//                     {
//                         "number": 7,
//                         "step": "Place the avocado flesh in a large bowl and mash it up evenly till it becomes creamy.",
//                         "ingredients": [
//                             {
//                                 "id": 9037,
//                                 "name": "avocado",
//                                 "localizedName": "avocado",
//                                 "image": "avocado.jpg"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404783,
//                                 "name": "bowl",
//                                 "localizedName": "bowl",
//                                 "image": "bowl.jpg"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 8,
//                         "step": "Add the tomatoes mixture to the avocados.",
//                         "ingredients": [
//                             {
//                                 "id": 9037,
//                                 "name": "avocado",
//                                 "localizedName": "avocado",
//                                 "image": "avocado.jpg"
//                             },
//                             {
//                                 "id": 11529,
//                                 "name": "tomato",
//                                 "localizedName": "tomato",
//                                 "image": "tomato.png"
//                             }
//                         ],
//                         "equipment": []
//                     },
//                     {
//                         "number": 9,
//                         "step": "Combine well.Squeeze in juice from one lemon.",
//                         "ingredients": [
//                             {
//                                 "id": 1019016,
//                                 "name": "juice",
//                                 "localizedName": "juice",
//                                 "image": "apple-juice.jpg"
//                             },
//                             {
//                                 "id": 9150,
//                                 "name": "lemon",
//                                 "localizedName": "lemon",
//                                 "image": "lemon.png"
//                             }
//                         ],
//                         "equipment": []
//                     },
//                     {
//                         "number": 10,
//                         "step": "Add a generous portion of salt to taste. About 1 to 2 teaspoons.At this point, youll have guacamole. If you like, dish it up in a serving bowl and serve it with chips.Now cook the chicken.",
//                         "ingredients": [
//                             {
//                                 "id": 1009037,
//                                 "name": "guacamole",
//                                 "localizedName": "guacamole",
//                                 "image": "guacamole.jpg"
//                             },
//                             {
//                                 "id": 5006,
//                                 "name": "whole chicken",
//                                 "localizedName": "whole chicken",
//                                 "image": "whole-chicken.jpg"
//                             },
//                             {
//                                 "id": 11408,
//                                 "name": "french fries",
//                                 "localizedName": "french fries",
//                                 "image": "french-fries-isolated.jpg"
//                             },
//                             {
//                                 "id": 2047,
//                                 "name": "salt",
//                                 "localizedName": "salt",
//                                 "image": "salt.jpg"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404783,
//                                 "name": "bowl",
//                                 "localizedName": "bowl",
//                                 "image": "bowl.jpg"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 11,
//                         "step": "Heat a pan with a few tablespoons of cooking oil till its very hot. It has to be very hot or the chicken wont brown.",
//                         "ingredients": [
//                             {
//                                 "id": 4582,
//                                 "name": "cooking oil",
//                                 "localizedName": "cooking oil",
//                                 "image": "vegetable-oil.jpg"
//                             },
//                             {
//                                 "id": 5006,
//                                 "name": "whole chicken",
//                                 "localizedName": "whole chicken",
//                                 "image": "whole-chicken.jpg"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404645,
//                                 "name": "frying pan",
//                                 "localizedName": "frying pan",
//                                 "image": "pan.png"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 12,
//                         "step": "Add the chicken to the pan. Be careful! Itll sizzle and splatter.Turn the pieces over to brown the other side after a few minutes.When the chicken are browned, remove them from the pan and set aside at a warm place.Using a clean, dry pan, toast the tortillas one at a time on each side.They are ready to be used when they are soft and warm.",
//                         "ingredients": [
//                             {
//                                 "id": 18364,
//                                 "name": "tortilla",
//                                 "localizedName": "tortilla",
//                                 "image": "flour-tortilla.jpg"
//                             },
//                             {
//                                 "id": 5006,
//                                 "name": "whole chicken",
//                                 "localizedName": "whole chicken",
//                                 "image": "whole-chicken.jpg"
//                             },
//                             {
//                                 "id": 18070,
//                                 "name": "toast",
//                                 "localizedName": "toast",
//                                 "image": "toast"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404645,
//                                 "name": "frying pan",
//                                 "localizedName": "frying pan",
//                                 "image": "pan.png"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 13,
//                         "step": "Add a serving of the guacamole mixture.",
//                         "ingredients": [
//                             {
//                                 "id": 1009037,
//                                 "name": "guacamole",
//                                 "localizedName": "guacamole",
//                                 "image": "guacamole.jpg"
//                             }
//                         ],
//                         "equipment": []
//                     },
//                     {
//                         "number": 14,
//                         "step": "Add a serving of the chicken.Quickly wrap the burrito up. If it cools, the tortilla will crack and it would be impossible to roll it up.",
//                         "ingredients": [
//                             {
//                                 "id": 18364,
//                                 "name": "tortilla",
//                                 "localizedName": "tortilla",
//                                 "image": "flour-tortilla.jpg"
//                             },
//                             {
//                                 "id": 5006,
//                                 "name": "whole chicken",
//                                 "localizedName": "whole chicken",
//                                 "image": "whole-chicken.jpg"
//                             },
//                             {
//                                 "id": 0,
//                                 "name": "roll",
//                                 "localizedName": "roll",
//                                 "image": "dinner-yeast-rolls.jpg"
//                             },
//                             {
//                                 "id": 10018364,
//                                 "name": "wrap",
//                                 "localizedName": "wrap",
//                                 "image": "flour-tortilla.jpg"
//                             }
//                         ],
//                         "equipment": []
//                     },
//                     {
//                         "number": 15,
//                         "step": "Roll over once. Fold in the sides, and roll over again till its fully wrapped.",
//                         "ingredients": [
//                             {
//                                 "id": 0,
//                                 "name": "roll",
//                                 "localizedName": "roll",
//                                 "image": "dinner-yeast-rolls.jpg"
//                             }
//                         ],
//                         "equipment": []
//                     },
//                     {
//                         "number": 16,
//                         "step": "Serve immediately or wrap in aluminum foil and keep them in the oven till ready to eat.",
//                         "ingredients": [
//                             {
//                                 "id": 10018364,
//                                 "name": "wrap",
//                                 "localizedName": "wrap",
//                                 "image": "flour-tortilla.jpg"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404765,
//                                 "name": "aluminum foil",
//                                 "localizedName": "aluminum foil",
//                                 "image": "aluminum-foil.png"
//                             },
//                             {
//                                 "id": 404784,
//                                 "name": "oven",
//                                 "localizedName": "oven",
//                                 "image": "oven.jpg"
//                             }
//                         ]
//                     }
//                 ]
//             }
//         ],
//         "isFavorite": false,
//         "wasWatched": false
//     },
//     {
//         "id": 638148,
//         "title": "Chicken Kale Bake",
//         "readyInMinutes": 45,
//         "image": "https://spoonacular.com/recipeImages/638148-556x370.jpg",
//         "popularity": 1,
//         "vegan": false,
//         "vegetarian": false,
//         "glutenFree": true,
//         "servings": 6,
//         "cuisines": [],
//         "diets": [
//             "gluten free"
//         ],
//         "instructions": [
//             {
//                 "name": "",
//                 "steps": [
//                     {
//                         "number": 1,
//                         "step": "Combine first seven ingredients in a dutch oven",
//                         "ingredients": [],
//                         "equipment": [
//                             {
//                                 "id": 404667,
//                                 "name": "dutch oven",
//                                 "localizedName": "dutch oven",
//                                 "image": "dutch-oven.jpg"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 2,
//                         "step": "Bake at 350 degrees for 1 hour",
//                         "ingredients": [],
//                         "equipment": [
//                             {
//                                 "id": 404784,
//                                 "name": "oven",
//                                 "localizedName": "oven",
//                                 "image": "oven.jpg"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 3,
//                         "step": "While the chicken and rice is in the oven finely chop the kale.After the chiken and rice has been cooking for about an hour take the chicken out of the pot and reserve on a platter under tin foil",
//                         "ingredients": [
//                             {
//                                 "id": 5006,
//                                 "name": "whole chicken",
//                                 "localizedName": "whole chicken",
//                                 "image": "whole-chicken.jpg"
//                             },
//                             {
//                                 "id": 11233,
//                                 "name": "kale",
//                                 "localizedName": "kale",
//                                 "image": "kale.jpg"
//                             },
//                             {
//                                 "id": 20444,
//                                 "name": "rice",
//                                 "localizedName": "rice",
//                                 "image": "uncooked-white-rice.png"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404765,
//                                 "name": "aluminum foil",
//                                 "localizedName": "aluminum foil",
//                                 "image": "aluminum-foil.png"
//                             },
//                             {
//                                 "id": 404784,
//                                 "name": "oven",
//                                 "localizedName": "oven",
//                                 "image": "oven.jpg"
//                             },
//                             {
//                                 "id": 404752,
//                                 "name": "pot",
//                                 "localizedName": "pot",
//                                 "image": "stock-pot.jpg"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 4,
//                         "step": "Mix the kale into the rice and add a little more hot water and replace in the oven for another 10 min.Heap the rice on the center of a platter and place chicken on top.Squeeze lemon juice over the top and serve.",
//                         "ingredients": [
//                             {
//                                 "id": 9152,
//                                 "name": "lemon juice",
//                                 "localizedName": "lemon juice",
//                                 "image": "lemon-juice.jpg"
//                             },
//                             {
//                                 "id": 5006,
//                                 "name": "whole chicken",
//                                 "localizedName": "whole chicken",
//                                 "image": "whole-chicken.jpg"
//                             },
//                             {
//                                 "id": 14412,
//                                 "name": "water",
//                                 "localizedName": "water",
//                                 "image": "water.png"
//                             },
//                             {
//                                 "id": 11233,
//                                 "name": "kale",
//                                 "localizedName": "kale",
//                                 "image": "kale.jpg"
//                             },
//                             {
//                                 "id": 20444,
//                                 "name": "rice",
//                                 "localizedName": "rice",
//                                 "image": "uncooked-white-rice.png"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404784,
//                                 "name": "oven",
//                                 "localizedName": "oven",
//                                 "image": "oven.jpg"
//                             }
//                         ],
//                         "length": {
//                             "number": 10,
//                             "unit": "minutes"
//                         }
//                     }
//                 ]
//             }
//         ],
//         "isFavorite": false,
//         "wasWatched": false
//     },
//     {
//         "id": 638002,
//         "title": "Chicken Cacciatore",
//         "readyInMinutes": 45,
//         "image": "https://spoonacular.com/recipeImages/638002-556x370.jpg",
//         "popularity": 1,
//         "vegan": false,
//         "vegetarian": false,
//         "glutenFree": false,
//         "servings": 6,
//         "cuisines": [
//             "Mediterranean",
//             "Italian",
//             "European"
//         ],
//         "diets": [],
//         "instructions": [
//             {
//                 "name": "",
//                 "steps": [
//                     {
//                         "number": 1,
//                         "step": "In a medium-sized bowl, mix salt, pepper and flour together.",
//                         "ingredients": [
//                             {
//                                 "id": 1002030,
//                                 "name": "pepper",
//                                 "localizedName": "pepper",
//                                 "image": "pepper.jpg"
//                             },
//                             {
//                                 "id": 20081,
//                                 "name": "all purpose flour",
//                                 "localizedName": "all purpose flour",
//                                 "image": "flour.png"
//                             },
//                             {
//                                 "id": 2047,
//                                 "name": "salt",
//                                 "localizedName": "salt",
//                                 "image": "salt.jpg"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404783,
//                                 "name": "bowl",
//                                 "localizedName": "bowl",
//                                 "image": "bowl.jpg"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 2,
//                         "step": "Wash chicken and remove excess skin. Dredge in flour mixture and shake off excess.",
//                         "ingredients": [
//                             {
//                                 "id": 5006,
//                                 "name": "whole chicken",
//                                 "localizedName": "whole chicken",
//                                 "image": "whole-chicken.jpg"
//                             },
//                             {
//                                 "id": 20081,
//                                 "name": "all purpose flour",
//                                 "localizedName": "all purpose flour",
//                                 "image": "flour.png"
//                             },
//                             {
//                                 "id": 0,
//                                 "name": "shake",
//                                 "localizedName": "shake",
//                                 "image": ""
//                             }
//                         ],
//                         "equipment": []
//                     },
//                     {
//                         "number": 3,
//                         "step": "Heat oil is a large non-stick skillet over medium-high heat.",
//                         "ingredients": [
//                             {
//                                 "id": 4582,
//                                 "name": "cooking oil",
//                                 "localizedName": "cooking oil",
//                                 "image": "vegetable-oil.jpg"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404645,
//                                 "name": "frying pan",
//                                 "localizedName": "frying pan",
//                                 "image": "pan.png"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 4,
//                         "step": "Add chicken and brown on all sides.",
//                         "ingredients": [
//                             {
//                                 "id": 5006,
//                                 "name": "whole chicken",
//                                 "localizedName": "whole chicken",
//                                 "image": "whole-chicken.jpg"
//                             }
//                         ],
//                         "equipment": []
//                     },
//                     {
//                         "number": 5,
//                         "step": "Remove from the pan and drain on paper towels.",
//                         "ingredients": [],
//                         "equipment": [
//                             {
//                                 "id": 405895,
//                                 "name": "paper towels",
//                                 "localizedName": "paper towels",
//                                 "image": "paper-towels.jpg"
//                             },
//                             {
//                                 "id": 404645,
//                                 "name": "frying pan",
//                                 "localizedName": "frying pan",
//                                 "image": "pan.png"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 6,
//                         "step": "To the same skillet add the onion and garlic and stir until onion is soft, but not browned. Next, add red pepper and mushrooms; cook, stirring occasionally until softened.",
//                         "ingredients": [
//                             {
//                                 "id": 11821,
//                                 "name": "red pepper",
//                                 "localizedName": "red pepper",
//                                 "image": "red-pepper.jpg"
//                             },
//                             {
//                                 "id": 11260,
//                                 "name": "mushrooms",
//                                 "localizedName": "mushrooms",
//                                 "image": "mushrooms.png"
//                             },
//                             {
//                                 "id": 11215,
//                                 "name": "garlic",
//                                 "localizedName": "garlic",
//                                 "image": "garlic.png"
//                             },
//                             {
//                                 "id": 11282,
//                                 "name": "onion",
//                                 "localizedName": "onion",
//                                 "image": "brown-onion.png"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404645,
//                                 "name": "frying pan",
//                                 "localizedName": "frying pan",
//                                 "image": "pan.png"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 7,
//                         "step": "Add tomatoes, white wine and oregano and cook until alcohol has burned off; 3-5 minutes.",
//                         "ingredients": [
//                             {
//                                 "id": 14106,
//                                 "name": "white wine",
//                                 "localizedName": "white wine",
//                                 "image": "white-wine.jpg"
//                             },
//                             {
//                                 "id": 11529,
//                                 "name": "tomato",
//                                 "localizedName": "tomato",
//                                 "image": "tomato.png"
//                             },
//                             {
//                                 "id": 14037,
//                                 "name": "alcohol",
//                                 "localizedName": "alcohol",
//                                 "image": "rum-dark.jpg"
//                             },
//                             {
//                                 "id": 2027,
//                                 "name": "oregano",
//                                 "localizedName": "oregano",
//                                 "image": "oregano.jpg"
//                             }
//                         ],
//                         "equipment": [],
//                         "length": {
//                             "number": 5,
//                             "unit": "minutes"
//                         }
//                     },
//                     {
//                         "number": 8,
//                         "step": "Return chicken to skillet, cover and simmer on low for one hour.",
//                         "ingredients": [
//                             {
//                                 "id": 5006,
//                                 "name": "whole chicken",
//                                 "localizedName": "whole chicken",
//                                 "image": "whole-chicken.jpg"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404645,
//                                 "name": "frying pan",
//                                 "localizedName": "frying pan",
//                                 "image": "pan.png"
//                             }
//                         ],
//                         "length": {
//                             "number": 60,
//                             "unit": "minutes"
//                         }
//                     }
//                 ]
//             }
//         ],
//         "isFavorite": false,
//         "wasWatched": false
//     },
//     {
//         "id": 638263,
//         "title": "Chicken Pita Fajita",
//         "readyInMinutes": 45,
//         "image": "https://spoonacular.com/recipeImages/638263-556x370.jpg",
//         "popularity": 1,
//         "vegan": false,
//         "vegetarian": false,
//         "glutenFree": false,
//         "servings": 4,
//         "cuisines": [],
//         "diets": [],
//         "instructions": [
//             {
//                 "name": "",
//                 "steps": [
//                     {
//                         "number": 1,
//                         "step": "In a small pan, put in the chicken stock and bring to a boil.",
//                         "ingredients": [
//                             {
//                                 "id": 6172,
//                                 "name": "chicken stock",
//                                 "localizedName": "chicken stock",
//                                 "image": "chicken-broth.png"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404645,
//                                 "name": "frying pan",
//                                 "localizedName": "frying pan",
//                                 "image": "pan.png"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 2,
//                         "step": "Add in a touch of salt to flavor, and stir in the rice. Keep on medium heat and stir occasionally while the rice cooks. Once the rice has absorbed all of the chicken broth, stir in the black beans.",
//                         "ingredients": [
//                             {
//                                 "id": 6194,
//                                 "name": "chicken broth",
//                                 "localizedName": "chicken broth",
//                                 "image": "chicken-broth.png"
//                             },
//                             {
//                                 "id": 16015,
//                                 "name": "black beans",
//                                 "localizedName": "black beans",
//                                 "image": "black-beans.jpg"
//                             },
//                             {
//                                 "id": 20444,
//                                 "name": "rice",
//                                 "localizedName": "rice",
//                                 "image": "uncooked-white-rice.png"
//                             },
//                             {
//                                 "id": 2047,
//                                 "name": "salt",
//                                 "localizedName": "salt",
//                                 "image": "salt.jpg"
//                             }
//                         ],
//                         "equipment": []
//                     },
//                     {
//                         "number": 3,
//                         "step": "Bring a small skillet up to medium heat, add in the Tyson Grilled & Ready strips, and allow to cook about 3-5 minutes per side.",
//                         "ingredients": [],
//                         "equipment": [
//                             {
//                                 "id": 404645,
//                                 "name": "frying pan",
//                                 "localizedName": "frying pan",
//                                 "image": "pan.png"
//                             }
//                         ],
//                         "length": {
//                             "number": 5,
//                             "unit": "minutes"
//                         }
//                     },
//                     {
//                         "number": 4,
//                         "step": "For folks who want an extra \"POW!\" this is the perfect time to dice up some green pepper and onion and add to the skillet. Watch until they are golden on the outside. I take them off of the heat and mix them in with the rice and bean mixture.",
//                         "ingredients": [
//                             {
//                                 "id": 11333,
//                                 "name": "green pepper",
//                                 "localizedName": "green pepper",
//                                 "image": "green-pepper.jpg"
//                             },
//                             {
//                                 "id": 11282,
//                                 "name": "onion",
//                                 "localizedName": "onion",
//                                 "image": "brown-onion.png"
//                             },
//                             {
//                                 "id": 20444,
//                                 "name": "rice",
//                                 "localizedName": "rice",
//                                 "image": "uncooked-white-rice.png"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404645,
//                                 "name": "frying pan",
//                                 "localizedName": "frying pan",
//                                 "image": "pan.png"
//                             }
//                         ]
//                     }
//                 ]
//             }
//         ],
//         "isFavorite": false,
//         "wasWatched": false
//     },
//     {
//         "id": 638166,
//         "title": "Chicken Liver Salad",
//         "readyInMinutes": 45,
//         "image": "https://spoonacular.com/recipeImages/638166-556x370.jpg",
//         "popularity": 4,
//         "vegan": false,
//         "vegetarian": false,
//         "glutenFree": true,
//         "servings": 2,
//         "cuisines": [],
//         "diets": [
//             "gluten free",
//             "dairy free",
//             "paleolithic",
//             "primal",
//             "whole 30",
//             "ketogenic"
//         ],
//         "instructions": [
//             {
//                 "name": "",
//                 "steps": [
//                     {
//                         "number": 1,
//                         "step": "Saut` the onion and the bacon with the olive oil in a large skillet, over medium high heat.When the bacon is slightly crisp add the chicken livers. Stir well.",
//                         "ingredients": [
//                             {
//                                 "id": 5027,
//                                 "name": "chicken liver",
//                                 "localizedName": "chicken liver",
//                                 "image": "chicken-liver.jpg"
//                             },
//                             {
//                                 "id": 4053,
//                                 "name": "olive oil",
//                                 "localizedName": "olive oil",
//                                 "image": "olive-oil.jpg"
//                             },
//                             {
//                                 "id": 10123,
//                                 "name": "bacon",
//                                 "localizedName": "bacon",
//                                 "image": "raw-bacon.png"
//                             },
//                             {
//                                 "id": 11282,
//                                 "name": "onion",
//                                 "localizedName": "onion",
//                                 "image": "brown-onion.png"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404645,
//                                 "name": "frying pan",
//                                 "localizedName": "frying pan",
//                                 "image": "pan.png"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 2,
//                         "step": "Add the balsamic vinegar and continue to cook slowly.",
//                         "ingredients": [
//                             {
//                                 "id": 2069,
//                                 "name": "balsamic vinegar",
//                                 "localizedName": "balsamic vinegar",
//                                 "image": "balsamic-vinegar.jpg"
//                             }
//                         ],
//                         "equipment": []
//                     },
//                     {
//                         "number": 3,
//                         "step": "Add more vinegar if necessary.",
//                         "ingredients": [
//                             {
//                                 "id": 2053,
//                                 "name": "vinegar",
//                                 "localizedName": "vinegar",
//                                 "image": "vinegar-(white).jpg"
//                             }
//                         ],
//                         "equipment": []
//                     },
//                     {
//                         "number": 4,
//                         "step": "Serve warm over a bed of lettuce.",
//                         "ingredients": [
//                             {
//                                 "id": 11252,
//                                 "name": "lettuce",
//                                 "localizedName": "lettuce",
//                                 "image": "iceberg-lettuce.jpg"
//                             }
//                         ],
//                         "equipment": []
//                     }
//                 ]
//             }
//         ],
//         "isFavorite": false,
//         "wasWatched": false
//     },
//     {
//         "id": 636682,
//         "title": "Chicken Caesar Salad",
//         "readyInMinutes": 45,
//         "image": "https://spoonacular.com/recipeImages/636682-556x370.jpg",
//         "popularity": 1,
//         "vegan": false,
//         "vegetarian": false,
//         "glutenFree": true,
//         "servings": 2,
//         "cuisines": [
//             "American"
//         ],
//         "diets": [
//             "gluten free"
//         ],
//         "instructions": [
//             {
//                 "name": "",
//                 "steps": [
//                     {
//                         "number": 1,
//                         "step": "Rub a medium wooden bowl with cut side of garlic clove and discard garlic; add lemon juice, mayonnaise, and cheese to bowl and stir to combine.",
//                         "ingredients": [
//                             {
//                                 "id": 10211215,
//                                 "name": "whole garlic cloves",
//                                 "localizedName": "whole garlic cloves",
//                                 "image": "garlic.jpg"
//                             },
//                             {
//                                 "id": 9152,
//                                 "name": "lemon juice",
//                                 "localizedName": "lemon juice",
//                                 "image": "lemon-juice.jpg"
//                             },
//                             {
//                                 "id": 4025,
//                                 "name": "mayonnaise",
//                                 "localizedName": "mayonnaise",
//                                 "image": "mayonnaise.png"
//                             },
//                             {
//                                 "id": 1041009,
//                                 "name": "cheese",
//                                 "localizedName": "cheese",
//                                 "image": "cheddar-cheese.png"
//                             },
//                             {
//                                 "id": 11215,
//                                 "name": "garlic",
//                                 "localizedName": "garlic",
//                                 "image": "garlic.png"
//                             },
//                             {
//                                 "id": 1012034,
//                                 "name": "dry seasoning rub",
//                                 "localizedName": "dry seasoning rub",
//                                 "image": "seasoning.png"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404783,
//                                 "name": "bowl",
//                                 "localizedName": "bowl",
//                                 "image": "bowl.jpg"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 2,
//                         "step": "Add remaining ingredients except lettuce and mix well; line serving platter with lettuce and top with chicken mixture.",
//                         "ingredients": [
//                             {
//                                 "id": 5006,
//                                 "name": "whole chicken",
//                                 "localizedName": "whole chicken",
//                                 "image": "whole-chicken.jpg"
//                             },
//                             {
//                                 "id": 11252,
//                                 "name": "lettuce",
//                                 "localizedName": "lettuce",
//                                 "image": "iceberg-lettuce.jpg"
//                             }
//                         ],
//                         "equipment": []
//                     }
//                 ]
//             }
//         ],
//         "isFavorite": false,
//         "wasWatched": false
//     },
//     {
//         "id": 630484,
//         "title": "Chicken shish kabobs",
//         "readyInMinutes": 50,
//         "image": "https://spoonacular.com/recipeImages/630484-556x370.jpg",
//         "popularity": 1,
//         "vegan": false,
//         "vegetarian": false,
//         "glutenFree": true,
//         "servings": 2,
//         "cuisines": [],
//         "diets": [
//             "gluten free",
//             "dairy free"
//         ],
//         "instructions": [
//             {
//                 "name": "",
//                 "steps": [
//                     {
//                         "number": 1,
//                         "step": "Mix the ingredients for the marinade in a bowl.Wash the chicken breast fillets, cut them in bite-sized cubs and put them in the marinade bowl. Marinate the meat at least 1 hour before cooking in refrigerator.Preheat the oven to 190°C/375°F. Soak the wooden kabob skewers in water, while you are preparing the vegetables.Right before the grilling, wash the vegetables and chop them into uniform sized pieces (1 inch slices).",
//                         "ingredients": [
//                             {
//                                 "id": 1055062,
//                                 "name": "boneless skinless chicken breast",
//                                 "localizedName": "boneless skinless chicken breast",
//                                 "image": "chicken-breasts.png"
//                             },
//                             {
//                                 "id": 11583,
//                                 "name": "vegetable",
//                                 "localizedName": "vegetable",
//                                 "image": "mixed-vegetables.png"
//                             },
//                             {
//                                 "id": 0,
//                                 "name": "marinade",
//                                 "localizedName": "marinade",
//                                 "image": "seasoning.png"
//                             },
//                             {
//                                 "id": 14412,
//                                 "name": "water",
//                                 "localizedName": "water",
//                                 "image": "water.png"
//                             },
//                             {
//                                 "id": 1065062,
//                                 "name": "meat",
//                                 "localizedName": "meat",
//                                 "image": "whole-chicken.jpg"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 3065,
//                                 "name": "skewers",
//                                 "localizedName": "skewers",
//                                 "image": "wooden-skewers.jpg"
//                             },
//                             {
//                                 "id": 404783,
//                                 "name": "bowl",
//                                 "localizedName": "bowl",
//                                 "image": "bowl.jpg"
//                             },
//                             {
//                                 "id": 404784,
//                                 "name": "oven",
//                                 "localizedName": "oven",
//                                 "image": "oven.jpg",
//                                 "temperature": {
//                                     "number": 190,
//                                     "unit": "Celsius"
//                                 }
//                             }
//                         ],
//                         "length": {
//                             "number": 60,
//                             "unit": "minutes"
//                         }
//                     },
//                     {
//                         "number": 2,
//                         "step": "Cut the smocked sausage in thin slices.Thread the marinated chicken breast cubs, sausage slices and the vegetables onto soaked wooden skewers, alternating the meat and vegetables. Feel free to arrange the kabobs as you want. Leave about 1 inch /3 cm of skewer at one and, so you can hold on them and flip them.",
//                         "ingredients": [
//                             {
//                                 "id": 5062,
//                                 "name": "chicken breast",
//                                 "localizedName": "chicken breast",
//                                 "image": "chicken-breasts.png"
//                             },
//                             {
//                                 "id": 11583,
//                                 "name": "vegetable",
//                                 "localizedName": "vegetable",
//                                 "image": "mixed-vegetables.png"
//                             },
//                             {
//                                 "id": 1017063,
//                                 "name": "sausage",
//                                 "localizedName": "sausage",
//                                 "image": "raw-pork-sausage.png"
//                             },
//                             {
//                                 "id": 1065062,
//                                 "name": "meat",
//                                 "localizedName": "meat",
//                                 "image": "whole-chicken.jpg"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 405601,
//                                 "name": "wooden skewers",
//                                 "localizedName": "wooden skewers",
//                                 "image": "wooden-skewers.jpg"
//                             },
//                             {
//                                 "id": 3065,
//                                 "name": "skewers",
//                                 "localizedName": "skewers",
//                                 "image": "wooden-skewers.jpg"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 3,
//                         "step": "Place the chicken shish kabobs on a baking tray and put them in the oven.",
//                         "ingredients": [
//                             {
//                                 "id": 5006,
//                                 "name": "whole chicken",
//                                 "localizedName": "whole chicken",
//                                 "image": "whole-chicken.jpg"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404646,
//                                 "name": "baking pan",
//                                 "localizedName": "baking pan",
//                                 "image": "roasting-pan.jpg"
//                             },
//                             {
//                                 "id": 404784,
//                                 "name": "oven",
//                                 "localizedName": "oven",
//                                 "image": "oven.jpg"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 4,
//                         "step": "Bake for 10 minutes, then flip them, and bake for 10 minutes, until the chicken is cooked through and vegetables are tender.",
//                         "ingredients": [
//                             {
//                                 "id": 11583,
//                                 "name": "vegetable",
//                                 "localizedName": "vegetable",
//                                 "image": "mixed-vegetables.png"
//                             },
//                             {
//                                 "id": 5006,
//                                 "name": "whole chicken",
//                                 "localizedName": "whole chicken",
//                                 "image": "whole-chicken.jpg"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 404784,
//                                 "name": "oven",
//                                 "localizedName": "oven",
//                                 "image": "oven.jpg"
//                             }
//                         ],
//                         "length": {
//                             "number": 20,
//                             "unit": "minutes"
//                         }
//                     },
//                     {
//                         "number": 5,
//                         "step": "Transfer the skewers to a plate.",
//                         "ingredients": [],
//                         "equipment": [
//                             {
//                                 "id": 3065,
//                                 "name": "skewers",
//                                 "localizedName": "skewers",
//                                 "image": "wooden-skewers.jpg"
//                             }
//                         ]
//                     },
//                     {
//                         "number": 6,
//                         "step": "Serve the kabobs warm with baked potato and sauce.If you grill the kabobs on BBQ, the meat and the vegetables will have a better smocked flavor. The way of grilling the kabobs is the same as the baking them in oven, you just have to flip them frequently, careful to not break the skewers.Enjoy!",
//                         "ingredients": [
//                             {
//                                 "id": 11583,
//                                 "name": "vegetable",
//                                 "localizedName": "vegetable",
//                                 "image": "mixed-vegetables.png"
//                             },
//                             {
//                                 "id": 11352,
//                                 "name": "potato",
//                                 "localizedName": "potato",
//                                 "image": "potatoes-yukon-gold.png"
//                             },
//                             {
//                                 "id": 0,
//                                 "name": "sauce",
//                                 "localizedName": "sauce",
//                                 "image": ""
//                             },
//                             {
//                                 "id": 1065062,
//                                 "name": "meat",
//                                 "localizedName": "meat",
//                                 "image": "whole-chicken.jpg"
//                             }
//                         ],
//                         "equipment": [
//                             {
//                                 "id": 3065,
//                                 "name": "skewers",
//                                 "localizedName": "skewers",
//                                 "image": "wooden-skewers.jpg"
//                             },
//                             {
//                                 "id": 404706,
//                                 "name": "grill",
//                                 "localizedName": "grill",
//                                 "image": "grill.jpg"
//                             },
//                             {
//                                 "id": 404784,
//                                 "name": "oven",
//                                 "localizedName": "oven",
//                                 "image": "oven.jpg"
//                             }
//                         ]
//                     }
//                 ]
//             }
//         ],
//         "isFavorite": false,
//         "wasWatched": false
//     }
// ]
      //test
      //this.search_results = [];
      if(!this.search_results.length){
        this.flag=true;
      }

      //id user is logged in and we have results so keep the last search:
      
      if(this.search_results.length & this.$root.store.username.length){
          //sessionStorage.setItem('last_search',this.search_results);
          this.$root.store.updateSearch(this.search_results)
      }

          
      console.log(this.search_results)
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },


    onSubmit(){

        this.flag = false;
        console.log(this.form.intolerances_filter)
        console.log(this.form.diets_filter)
        console.log(this.form.cuisines_filter)
         //fixing the form of the filters

        this.form.cuisines_param = this.form.cuisines_filter.map(({ id, label }) => {return label;}).join(', ');
        this.form.diets_param = this.form.diets_filter.label;
        this.form.intolerances_param = this.form.intolerances_filter.map(({ id, label }) => {return label;}).join(', ');
        this.form.results_num_param = this.form.results_num.label;
        
        //testing:
        //this.form.cuisines_param =  "Europian";
        //this.form.diets_param = "Ketogenic";
        //this.form.intolerances_param ="Peanut";


        //conctinate to strings"
        console.log("after map print");
        console.log(this.form.intolerances_param)
        console.log(this.form.diets_param)
        console.log(this.form.cuisines_param)
        console.log(this.form.cuisines_param)
      this.onSearch();
     },

    



  }
}

;
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style >
.cont{
    background-color:  #f5e3c9;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.btn-group {
  display: flex;
  flex-direction: column;
}
.title1 {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  height: 150px;
  /* align-content: center; */
  /* display: flex; */
  /* margin-left: 20%; */
    /* align-items: center; */
}



.e-checkbox-wrapper {
  margin-top: 18px;
}


</style>

