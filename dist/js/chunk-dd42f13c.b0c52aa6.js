(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-dd42f13c"],{3136:function(e,t,s){},"36bc":function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"container"},[s("h1",{staticClass:"title"},[e._v(" My Favourite Recipes")]),e.fav_list.length?s("RecipePreviewList",{attrs:{recipes_list:e.fav_list},model:{value:e.fav_list,callback:function(t){e.fav_list=t},expression:"fav_list"}}):e._e(),e.flag?e._e():s("h1",e._b({staticClass:"title",staticStyle:{color:"rgb(25, 157, 180)"},attrs:{id:"results_title"}},"h1",e.flag,!1),[e._v("No Results 😔")])],1)},n=[],r=(s("96cf"),s("1da1")),a=s("99d8"),c={components:{RecipePreviewList:a["a"]},data:function(){return{fav_list:[],flag:!1}},mounted:function(){this.getFavRecipes()},methods:{getFavRecipes:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.axios.get("https://RecipesProjBGU.cs.bgu.ac.il/users/favorites");case 3:s=t.sent,console.log("get favorites from server is ok"),console.log(s.data),e.fav_list=s.data,e.fav_list.length&&(console.log("list has length"),e.flag=!0),t.next=14;break;case 10:t.prev=10,t.t0=t["catch"](0),console.log(t.t0.response),e.form.submitError=t.t0.response.data.message;case 14:case"end":return t.stop()}}),t,null,[[0,10]])})))()}}},o=c,l=(s("5b75"),s("2877")),u=Object(l["a"])(o,i,n,!1,null,null,null);t["default"]=u.exports},"5b75":function(e,t,s){"use strict";var i=s("8041"),n=s.n(i);n.a},"5d0c":function(e,t,s){"use strict";var i=s("3136"),n=s.n(i);n.a},8041:function(e,t,s){},"99d8":function(e,t,s){"use strict";var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("b-container",[s("b-row",e._l(e.recipes_list,(function(e){return s("b-row",{key:e.id},[s("b-col",[s("RecipePreview",{staticClass:"recipePreview",attrs:{recipe:e}})],1),s("br")],1)})),1)],1)},n=[],r=s("832a"),a={name:"RecipePreviewList",components:{RecipePreview:r["a"]},props:{recipes_list:[]},data:function(){return{}}},c=a,o=(s("5d0c"),s("2877")),l=Object(o["a"])(c,i,n,!1,null,"c5b28eee",null);t["a"]=l.exports}}]);
//# sourceMappingURL=chunk-dd42f13c.b0c52aa6.js.map