<template>
  <div class="bg-light p-2 mb-1">
    <strong class="d-block mb-1">Graphics</strong>
    <div class="d-flex flex-wrap">
      <span class="graphic-item" v-for="(gfx, index) in graphics" :key="'gfx'+index" v-on:click="addGraphic(index)" >
        <img :src="gfx" draggable="true">
      </span>
    </div>
    <div class="form-group border-top pt-2">
      <div class="mb-3">
        <label for="uploadGfx" class="form-label">Upload own graphic</label>
        <input class="form-control h-auto" type="file" id="uploadGfx">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GraphicVariants',
  props:['graphics'],
  methods:{
    addGraphic(index){
      this.$emit('addGraphic', index);
    }
  }
}
</script>


<style lang="scss">
.graphic-item{
  flex: 1 1 33%;
  max-width: 33%;
  padding: 1em;
  cursor: pointer;
  img{
    max-width: 100%;
  }
}
</style>