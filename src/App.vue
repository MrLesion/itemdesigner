<template>
  <div id="app">
    <div class="container" v-if="ready">
      <div class="row">
        <div class="col-3">
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <a :class="openColorTab === 'options' ? 'nav-link active' : 'nav-link'" href="#" v-on:click="setOptionsTab('options')">
                Options
              </a>
            </li>
            <li class="nav-item">
              <a :class="openColorTab === 'graphics' ? 'nav-link active' : 'nav-link'" href="#" v-on:click="setOptionsTab('graphics')">
                Graphics
              </a>
            </li>
          </ul>
          <div class="border border-top-0 p-2">
            <TypeVariants v-if="openColorTab === 'options'"
                          :types="types"
                          :selectedType="selectedType"
            />
            <ColorVariants v-if="openColorTab === 'options'" 
                           :variants="variants"
                           :selectedVariant="selectedVariant"
                           :selectedType="selectedType"
                           @changeColorVariant="changeColorVariant"
            />
            <TextVariants v-if="openColorTab === 'graphics'" />
            
            <GraphicVariants v-if="openColorTab === 'graphics'"
                             :graphics="graphics"
                             @addGraphic="addGraphic"
                             
            />
            
          </div>
        </div>
        <div class="col-6">
          <DesignCanvas :options="canvasOptions" 
                        :image="selectedVariant.image" 
                        :addedGraphics="addedGraphics"
          />
        </div>
        <div class="col-3">
          <SizeVariants />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ColorVariants from '@/components/ColorVariants';
import TypeVariants from '@/components/TypeVariants';
import GraphicVariants from '@/components/GraphicVariants';
import TextVariants from '@/components/TextVariants';
import SizeVariants from '@/components/SizeVariants';
import DesignCanvas from '@/components/DesignCanvas';
export default {
  name: 'App',
  components: {
    ColorVariants,
    TypeVariants,
    SizeVariants,
    DesignCanvas,
    GraphicVariants,
    TextVariants
  },
  data(){
    return {
      ready: false,
      optionsTab: 'options',
      selectedVariant: {},
      selectedType: {},
      canvasOptions: {
        bounds: {
          width: 36,
          height: 36,
          left: 32.5,
          top: 25,
          fillColor: 'rgba(255,255,255, .2)'
        }
      },
      types: [
        {
          label: 'T-shirts',
          value: 'tshirt'
        }
      ],
      variants: {
        tshirt:[
          {
            id: 'xyz1',
            name: 'Dark',
            image: 'https://id.dk/admin/public/getimage.ashx?Image=%2fimages%2fproducts%2fID%2fid_40552_790_front_p.jpg&Width=600&Height=0&Format=jpg&Quality=75&Crop=0',
            sizes: [1,2,3]
          },
          {
            id: 'xyz2',
            name: 'Orange',
            image: 'https://id.dk/admin/public/getimage.ashx?Image=%2fimages%2fproducts%2fID%2fid_40552_315_front_p.jpg&Width=960&Height=0&Format=jpg&Quality=75&Crop=0',
            sizes: [1,2,3]
          },
          {
            id: 'xyz3',
            name: 'Blue',
            image: 'https://id.dk/admin/public/getimage.ashx?Image=%2fimages%2fproducts%2fID%2fid_40552_392_front_p.jpg&Width=960&Height=0&Format=jpg&Quality=75&Crop=0',
            sizes: [1,2,3]
          }
        ]
      },
      addedGraphics:[],
      graphics:[
          'https://cdn.pixabay.com/photo/2013/07/12/18/20/santa-claus-153309_1280.png',
          'https://cdn.pixabay.com/photo/2013/07/13/10/51/football-157930_1280.png',
          'https://cdn.pixabay.com/photo/2013/07/12/15/36/fingerprint-150159_1280.png',
          'https://cdn.pixabay.com/photo/2012/04/18/14/50/pencil-37254_1280.png',
          'https://cdn.pixabay.com/photo/2013/07/13/12/21/biceps-159681_1280.png',
          'https://cdn.pixabay.com/photo/2017/08/28/17/39/poster-2690541_1280.png'
      ]
    }
  },
  computed:{
    openColorTab(){
      return this.optionsTab;
    }
  },
  methods: {
    setOptionsTab(value){
      this.optionsTab = value;
    },
    changeColorVariant(option){
      this.selectedVariant = option;
    },
    addGraphic(index){
      this.addedGraphics.push({
        image: this.graphics[index],
        x: 50,
        y: 50,
        width: 50,
        height: 50
      });
    }
  },
  mounted() {
    this.selectedType = this.types[0];
    this.selectedVariant = this.variants[this.selectedType.value][0];
    this.ready = true;
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
