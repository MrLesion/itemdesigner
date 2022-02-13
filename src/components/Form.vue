<template>
  <form>
  <div class="border-bottom d-flex justify-content-between">
    <h5>{{ selectedType.label }}</h5>
    <h5>{{ selectedVariant.color.name }} / {{ selectedVariant.size.name }}</h5>
  </div>
  <div class="border-top pt-1 w-100">
    <div class="d-flex justify-content-between border-bottom py-1">
      <span>Base price</span>
      <span>{{ basePrice }}</span>
    </div>
    <div class="d-flex justify-content-between border-bottom py-1">
      <span>Graphics price <small class="text-muted">({{ addedGraphics.length }})</small></span>
      <span>{{ graphicsPrice }}</span>
    </div>
    <div class="d-flex justify-content-between border-bottom py-1">
      <span>Text price <small class="text-muted">({{ addedTexts.length }})</small></span>
      <span>{{ textPrice }}</span>
    </div>
    <div class="d-flex justify-content-between border-bottom border-top py-1">
      <strong>Total price</strong>
      <strong>{{ totalPrice }}</strong>
    </div>
    <div class="d-flex justify-content-end mt-3">
      <button class="btn btn-success" type="button" v-on:click="createOrderLine">Add to cart</button>
    </div>
  </div>
    <hr>
  </form>
</template>

<script>
import { utils } from '@/utils';

export default {
  name: 'Form',
  props:['selectedType', 'selectedVariant', 'variantCombos', 'addedGraphics', 'addedTexts'],
  computed:{
    getBasePrice() {
      let selectedColor = this.selectedVariant.color;
      let selectedSize = this.selectedVariant.size;
      let variantId = [ selectedColor.id, selectedSize.id ].join( '.' );
      return this.variantCombos.find( vc => vc.variantId === variantId ).price;
    },
    getGraphicsPrice() {
      return this.addedGraphics.length * 40;
    },
    getTextPrice() {
      return this.addedTexts.length * 20;
    },
    getTotalPrice(){
      let basePrice = this.getBasePrice;
      let graphicsPrice = this.getGraphicsPrice;
      let textPrice = this.getTextPrice;
      return basePrice + graphicsPrice + textPrice;
    },
    basePrice() {
      let price = this.getBasePrice;
      return utils.formatPrice( price, 'DKK' );
    },
    graphicsPrice() {
      let price = this.getGraphicsPrice;
      return utils.formatPrice( price, 'DKK' );
    },
    textPrice() {
      let price = this.getTextPrice;
      return utils.formatPrice( price, 'DKK' );
    },
    totalPrice() {
      let price = this.getTotalPrice;
      return utils.formatPrice( price, 'DKK' );
    }
  },
  methods:{
    createOrderLine(){
      let selectedColor = this.selectedVariant.color;
      let selectedSize = this.selectedVariant.size;
      let productData = this.$store.getters.productData.find( p => p.type === this.selectedType.value );
      let addedGraphics = this.addedGraphics;
      let addedTexts = this.addedTexts;
      const canvas = this.$store.getters.canvas;
      const bounds = document.querySelector('.canvas-bounds');
      
      canvas.discardActiveObject();
      
      const orderLine = {
        id: 'OL.' +  Math.random(),
        product: productData,
        variantId: [selectedColor.id, selectedSize.id].join('.'),
        productId: productData.id,
        color:selectedColor,
        size: selectedSize,
        graphics: addedGraphics,
        texts: addedTexts,
        price: this.getTotalPrice,
        design: canvas.toDataURL(),
        bounds: bounds.style.cssText,
        _canvas: canvas
      };
      this.$store.commit('addOrderLine', orderLine);
    }
  }
};
</script>
