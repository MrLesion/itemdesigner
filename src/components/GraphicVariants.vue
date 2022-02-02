<template>
  <div class="bg-light p-2 mb-1">
    <strong class="d-block mb-1">Graphics</strong>
    <div class="d-flex flex-wrap">
      <span class="graphic-item" v-for="(gfx, index) in graphics" :key="'gfx'+index" v-on:click="addGraphic(index)" >
        <img :src="gfx" draggable="true">
      </span>
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
  flex: 1 1 50%;
  max-width: 50%;
  padding: 1em;
  img{
    max-width: 100%;
  }
}
</style>