<template>
  <div id="app">
    <div id="nav">
        
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
      
      <b-navbar-brand href="#">By The Cook! &#128214; </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
              <router-link :to="{ name: 'main' }">Home</router-link>
          </b-nav-item>
            <b-nav-item>
              <router-link :to="{ name: 'about' }">About</router-link>
          </b-nav-item>
          <b-nav-item>
              <router-link :to="{ name: 'search' }">Search</router-link>
          </b-nav-item>

          <!-- FOR CONNECTED USER -->
          <b-nav-item-dropdown text="Personal Area" right v-if="$root.store.username">
            <b-dropdown-item>  
              <router-link  :to="{ name: 'favorites' }">My Favourite Recipes </router-link>
            </b-dropdown-item>
            <b-dropdown-item >
              <router-link  :to="{ name: 'personal' }">
              My Recipes
              </router-link>
              </b-dropdown-item>
              <b-dropdown-item >
              <router-link  :to="{ name: 'family' }">
              My Family Recipes
              </router-link>

              </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-b-modal.create v-if="$root.store.username">
            Create Recipe
          </b-nav-item>     
        
        </b-navbar-nav>
        <!-- CREATE RECIPE MODAL -->
        <b-modal id="create"
            title="Create Recipe" 
            scrollable
            size="lg">
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="input-group-1" label="Name/Title of recipe:" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="$v.form.name.$model"
                type="text"
                :state="validateState('name')"
                placeholder="Enter name/title"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Time to make:" label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="$v.form.time.$model"
                type="number"
                :state="validateState('time')"
                placeholder="Enter time in minutes"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Number of servings:" label-for="input-3">
              <b-form-input
                id="input-3"
                v-model="$v.form.servings.$model"
                type="number"
                :state="validateState('servings')"
                placeholder="Enter number of servings"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" label="Ingredients:" label-for="input-4">
              <b-form-input
                id="input-4"
                class="v-b-modal create large-text-box"
                v-model="$v.form.Ingredients.$model"
                :state="validateState('Ingredients')"
                type="text"
                placeholder='Enter list of Ingredients and amounts. Example: "Onion: 4, Tomato: 2"'
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-5" label="Instructions:" label-for="input-5">
              <b-form-input
                id="input-5"
                class="v-b-modal create large-text-box"
                v-model="$v.form.Instructions.$model"
                type="text"
                :state="validateState('Instructions')"
                placeholder="Write instructions to make this recipe as free text"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-6" label="Image of the food:" label-for="input-6">
              <b-form-input
                id="input-6"
                v-model="$v.form.image.$model"
                type="url"
                :state="validateState('image')"
                placeholder="Https://link_to_my_image"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-7">
              <b-form-checkbox
                id="checkbox-vegan"
                v-model="vegan"
                name="checkbox-vegan"
                value=1
                unchecked-value=0
              >Vegan
              </b-form-checkbox>
              <b-form-checkbox
                id="checkbox-vegetarian"
                v-model="vegetarian"
                name="checkbox-vegetarian"
                value=1
                unchecked-value=0
              >Vegetarian
              </b-form-checkbox>
              <b-form-checkbox
                id="checkbox-glutenFree"
                v-model="glutenFree"
                name="checkbox-glutenFree"
                value=1
                unchecked-value=0
              >GlutenFree
              </b-form-checkbox>
              <!-- <b-form-checkbox-group
                v-model="checked"
                id="checkboxes-7"
                :aria-describedby="ariaDescribedby"
              >
                <b-form-checkbox value=1>Vegetarian</b-form-checkbox>
                <b-form-checkbox value=1>Vegan</b-form-checkbox>
                <b-form-checkbox value=1>Gluten Free</b-form-checkbox>
              </b-form-checkbox-group> -->
            </b-form-group>

            <b-button type="submit" variant="primary" style="margin-right: 4px;">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
          <b-alert
            class="mt-2"
            v-if="form.submitError"
            variant="warning"
            dismissible
            show
          >
            Adding new recipe failed: {{ form.submitError }}
          </b-alert>
          <!-- <b-card class="mt-3" header="Form Data Result">
            <pre class="m-0">{{ form }}</pre>
          </b-card> -->
        </b-modal>
        <!-- RIGHT MENU -->
        <b-navbar-nav class="ml-auto" id ="guest_name">
          <span  style="color:#efc58b;" v-if="!$root.store.username" >
            Hello Guest! 
            <router-link  :to="{ name: 'register' }">Register </router-link>
            <router-link  :to="{ name: 'login' }">Login</router-link>
          </span>
          <b-nav-item v-else >
            <span>{{ $root.store.username }}:</span> <span @click="Logout">Logout</span> 
          </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import {
  required,
} from "vuelidate/lib/validators";

export default {
  name: "App",

  data() {
      return {
        vegan: 0,
        vegetarian: 0,
        glutenFree: 0,
        // checked: [],
        form: {
          name: '',
          time: '',
          servings: '',
          Ingredients: '',
          Instructions: '',
          image: '',
          submitError: undefined
        },
        show: true,
        errors: [],
      }
    },
  validations: {
    form: {
      name: {
        required,
      },
      time: {
        required
      },
      servings: {
        required
      },
      Ingredients: {
        required
      },
      Instructions: {
        required
      },
      image: {
        required
      },
    }
  },
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Submit();
    },
    // ToDo: add to DB and add more things to this recipe: IndicationViews, IndicationFavorite, Add to myRecipes page
    async Submit() {
      try {
        const response = await this.axios.post(
          // "https://test-for-3-2.herokuapp.com/users/recipe",
          //this.$root.store.server_domain + "/users/recipe",
          process.env.VUE_APP_ROOT_API + "/users/recipe",
          
          {
            // username: add id of user,
            title: this.form.name,
            readyInMinutes: this.form.time,
            image: this.form.image,
            // vegan: this.checked.includes("Vegan"),
            // vegetarian: this.checked.includes("Vegetarian"),
            // glutenFree: this.checked.includes("GlutenFree"),
            vegan: this.vegan,
            vegetarian: this.vegetarian,
            glutenFree: this.glutenFree,
            ingredients: this.form.Ingredients,
            instructions: this.form.Instructions,
            servings: this.form.servings,
          }
        );
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.name = ''
      this.form.time = ''
      this.form.servings = ''
      this.form.Ingredients = ''
      this.form.Instructions = ''
      this.form.image = ''
      this.form.checked = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vw;
  background-color: #f5e3c9;
  // height:100%;
  display: flex;
  flex-direction: column;

}

#nav {
height:100%;
width:100%;
background-color: #f5e3c9;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 25px;

}

#nav a.router-link-exact-active {
  color: #efc58b;
  
}

#guest_name{
color: #efc58b;

}
.v-b-modal.create.large-text-box{
  height: 300px;
  
}

#guest_name{

  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  font-size: 27px;
  color: #efc58b;

}
</style>
