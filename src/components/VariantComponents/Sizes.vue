<template>
  <div class="bg-light p-2 mb-1">
    <strong class="d-block">Sizes</strong>
    <div class="d-flex flex-wrap">
      <span :class="getVariantClassList(variant)"
            v-for="(variant, index) in variants.options"
            :key="'variant-'+index"
            v-on:click="changeVariant(variant)"
      >{{ variant.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SizeVariants',
  props: ['variants', 'selectedVariant'],
  methods:{
    getVariantClassList(option){
      let returnValue = 'variant-option ';
      if(option.active === false){
        returnValue += 'disabled';
        return returnValue;
      }
      return 'variant-option ' +( option.id === this.selectedVariant.id ? 'active' : '');
    },
    changeVariant(option){
      this.$emit('changeSizeVariant', option );
    }
  }
}
</script>