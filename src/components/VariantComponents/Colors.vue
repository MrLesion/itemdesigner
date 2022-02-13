<template>
  <div class="bg-light p-2 mb-1">
    <strong class="d-block mb-1">Colors</strong>
    <div class="d-flex flex-wrap">
      <span :class="getVariantClassList(variant)" 
            v-for="(variant, index) in variants.options" 
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
  props: ['variants', 'selectedVariant'],
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