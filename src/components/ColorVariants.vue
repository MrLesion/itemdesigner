<template>
  <div class="bg-light p-2 mb-1">
    <strong class="d-block mb-1">Colors</strong>
    <div class="d-flex flex-wrap">
      <span :class="getVariantClassList(variant)" 
            v-for="(variant, index) in variants[selectedType.value]" 
            :key="'variant-'+index" 
            :style="'background-image:url('+variant.image+');'"
            v-on:click="changeVariant(variant)"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColorVariants',
  props: ['variants', 'selectedVariant', 'selectedType'],
  methods:{
    getVariantClassList(option){
      return 'variant-option ' +( option.id === this.selectedVariant.id ? 'active' : '');
    },
    changeVariant(option){
      this.$emit('changeColorVariant', option );
    }
  }
}
</script>

<style lang="scss">
.variant-option{
  width: 25px;
  height: 25px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  &.active{
    border: 1px solid #5f5f5f;
  }
}
</style>