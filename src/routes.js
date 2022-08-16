import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/Register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/Login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/searchRecipe",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },


  
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },

  {
    path: "/familyRecipe/:recipeId",
    name: "familyRecipe",
    component: () => import("./pages/FamilyRecipeViewPage"),
  },

  {
    path: "/recipe/myRecipes/:recipeId",
    name: "personalpage",
    component: () => import("./pages/PersonalViewPage"),
  }, 
  
  {
    path: "/recipe/myRecipes",
    name: "personal",
    component: () => import("./pages/PersonalPage"),
  }, 

  {
    path: "/favorites",
    name: "favorites",
    component: () => import("./pages/FavouritePage"),
  },

  {
    path: "/familyRecipes",
    name: "family",
    component: () => import("./pages/MyFamilyPage"),
  },

  {
    path: "/about",
    name: "about",
    component: () => import("./pages/About"),
  },

  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
