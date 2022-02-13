<template>
  <div class="bg-light p-2 mb-1">
    <strong class="d-block mb-1">Text</strong>
    <div class="input-group mb-3">
      <input type="text" class="form-control border-right-0" placeholder="Insert text" v-model="text">
      <button class="btn btn-outline-secondary rounded-0" type="button" v-on:click="addText">Add</button>
    </div>
    <strong class="d-block mb-1 mt-2">Font</strong>
    <select class="custom-select" v-model="selectedFont" v-on:change="setFont">
      <option :value="font" v-for="(font, index) in textOptions.fonts" :key="'font'+index">
        {{ font }}
      </option>
    </select>
    <div class="form-row mt-2">
      <div class="col-4">
        <input class="form-control" :value="selectedColor" type="color" v-on:change="setColor">
      </div>
      <div class="col-8">
        <input class="form-control" :value="selectedColor" type="text" v-on:input="setColor">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextVariants',
  props:['textOptions'],
  data(){
    return {
      text: '',
      selectedFont: '',
      selectedColor: '#1f1f1f'
    }
  },
  methods:{
    addText(){
      this.$emit('addText', {
        text:this.text,
        font: this.selectedFont
      });
    },
    setFont(event){
      let canvas = this.$store.getters.canvas;
      let activeObj = canvas.getActiveObject();
      this.selectedFont = event.target.value;

      if(activeObj && activeObj.text){
        activeObj.set('fontFamily', this.selectedFont);
        this.$store.commit('updateCanvas', canvas);
        canvas.renderAll();
      }
    },
    setColor(event){
      let canvas = this.$store.getters.canvas;
      let activeObj = canvas.getActiveObject();
      this.selectedColor = event.target.value.indexOf('#') === -1 ? '#' + event.target.value : event.target.value;
      if(activeObj && activeObj.text){
        activeObj.set('fill', this.selectedColor);

        this.$store.commit('updateCanvas', canvas);
        canvas.renderAll();
      }
      
    }
  },
  mounted(){
    this.selectedFont = this.textOptions.fonts[0];
  }
};
</script>