<template>
  <div>
        
        <!-- the photo link -->
    
      <!-- <b-card-img src= "recipe.image" alt="Image" top>
      <router-link style="color: #2c3e50; text-align:center;"
        :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
        class="recipe-preview" 
        >Make this!
        </router-link>

    </b-card-img>  -->

    <b-card id="card"
      :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
      tag="card"
      style="max-width: 20rem; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"
      class="mb-2"
    >
     
      
      <router-link style="color: #2c3e50; text-align:center;"
        :to="{ name: 'personalpage', params: { recipeId: recipe.id } }"
        class="recipe-preview" 
        >
      <b-card-img :src="recipe.image" id="recipe_image" >
      </b-card-img> 

      </router-link>
    
    <br>
    <br>
    <b-card-title :title="recipe.title">  </b-card-title>

    <!-- ================== -->
      <b-card-text class="text">
        Likes: {{ recipe.popularity }} <br>
        Time to make in minutes: {{ recipe.readyInMinutes }}
      </b-card-text>
      <b-card-text>
        <a v-if="recipe.vegan"> 
        <img src="../assets/vegan.png" style="width: 30px; height:30px;">
        Vegan 
        </a>
        <a v-if="recipe.vegetarian"> 
        <img src="../assets/vegeterian.png" style="width: 30px; height:30px;">
        Vegetarian 
        </a>
        <a v-if= "recipe.glutenFree"> 
        <img src="../assets/no-wheat.png" style="width: 30px; height:30px;">
        Gluten Free 
        </a>
      </b-card-text>
      <b-button variant="primary" style="text-align:center; background-color: #efc58b;  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: bold;border-color:black;border:557px;">
        <router-link style="color: #2c3e50; text-align:center;"
        :to="{ name: 'personalpage', params: { recipeId: recipe.id } }"
        class="recipe-preview" 
        >Make this!
        </router-link>
      </b-button>
      <b-row>
      <div  id="star1" class= "star"   style="font-size:300%;color:grey; margin-left:242px;hover:">&starf;</div>
      <!-- <div id="star2" class= "star"  v-show= (recipe.isFavorite||flag) style="font-size:300%;color:orange; margin-left:242px;hover:">&starf;</div> -->
        <!-- <img   src="../assets/visibility2.jpg" style="width: 45px; height:30px;"> -->
        <img src="../assets/notvisibility.png" style="width: 60px; height:60px;">
       </b-row>

       
    </b-card>
  </div>
</template>

<script>
export default {
 // mounted() {
    // this.axios.get(this.recipe.image).then((i) => {
    //   this.image_load = true;
    // });
 // },
  data() {
    return {
      //image_load: false,
      flag: false
    }
  },
  props: {
    recipe: {
      type: Object,
      required: true
    
    }
     },

    // id: {
    //   type: Number,
    //   required: true
    // },
    // title: {
    //   type: String,
    //   required: true
    // },
    // readyInMinutes: {
    //   type: Number,
    //   required: true
    // },
    // image: {
    //   type: String,
    //   required: true
    // },
    // aggregateLikes: {
    //   type: Number,
    //   required: false,
    //   default() {
    //     return undefined;
    //   }
    // }
 
  methods:{


    async MarkAsFavourite(){
    
      //== send response ==
      try {
      
      //====== &  =====
      //if recipe is not in user favourites and he is logged in -> mark as favorite 
      //if(this.recipe.isFavorite==='false' & $root.store.username.length){
        this.flag=true;

      //}
           
        const response = await this.axios.post(
   
           process.env.VUE_APP_ROOT_API+"/users/favorites",
            {
              "recipeId": this.recipe.id,
                
            } 
        );
           //document.getElementById("star1").style.color=yellow;
          console.log("mark as fave is good include axios ")
          console.log(response.data);

         

      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    }
  }
};
</script>

<style scoped>


#card{
  box-shadow: 10px 10px lightblue;
  margin-left: 20px;
  margin-bottom: 100px;
  margin-top: 100px;
}
.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 105%;

  
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: 500px;
  margin-right: 500px;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;

}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
  
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}

.text{

    font-size:20px;
}

.star:hover{
  cursor: pointer;
 
}

#recipe_image{
  margin-left:-19px;
  margin-top:-19px;
  width:318px;
}



</style>