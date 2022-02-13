<template>
  <div v-if="orderLines.length > 0" class="card mb-3 mt-3">
    <h5 class="card-header d-flex justify-content-between">
      Cart
      <span class="small text-muted">{{ total }}</span>
    </h5>
    <div class=" border-bottom" v-for="orderLine in orderLines" :key="orderLine.id">
      <div class="card-body p-2">
        <div class="row">
      <div class="col-md-4">
        <div class="orderLine-image position-relative">
          <img :src="orderLine.color.image" class="img-fluid rounded-start">
          <img :src="orderLine.design" class="img-fluid rounded-start bounds" :style="orderLine.bounds">
        </div>
      </div>
      <div class="col-md-8">
          <p class="mb-0">{{ orderLine.product.name }}</p>
          <small class="d-block text-muted">{{ orderLine.color.name }} / {{ orderLine.size.name }}</small>
          <small class="d-block text-muted">{{ getOrderLinePrice(orderLine) }}</small>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { utils } from '@/utils';
export default {
  name: 'Cart',
  computed:{
    orderLines(){
      return this.$store.getters.orderLines;
    },
    total(){
      let price = this.orderLines.reduce( (total, orderLine) =>{
        return total + orderLine.price;
      }, 0);
      return utils.formatPrice(price, 'DKK');
    }
  },
  methods:{
    getOrderLinePrice(orderLine){
      return utils.formatPrice(orderLine.price, 'DKK');
    }
  }
};
</script>
<style scoped lang="scss">
.orderLine-image{
  img{
    &.bounds{
      position: absolute;
    }
  }
}
</style>