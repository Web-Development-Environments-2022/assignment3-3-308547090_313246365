<template>

  <div class="row my-container">

    
    <div class="col-md-4">
      <!-- <label class="typo__label"
        >Please Select Preferabble Programing Language</label
      > -->
      <multiselect
      style="width:400px"
        v-model="value"
        tag-placeholder="Add this as new tag"
        placeholder="Select Programming Language"
        label="label"
        track-by="id"
        :options="options"
        :multiple="true"
        :taggable="true"
        @select="foo"
      ></multiselect>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
name:'Mselect',
  components: {
    Multiselect,
  },
  props:{
    options:[]
  },
  data() {
    return {
      value: [{ label: "Javascript", id: "1" }],
    };
  },
  methods:{
    foo(v,id){
        console.log(v,id)
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>

/* .my-container{
    justify-content: center;
   
} */
.multiselect__tags{
    min-width: 300px !important;
}
</style>