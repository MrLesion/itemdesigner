<template>
  <div id="app">
    <div class="container" v-if="ready">
      <div class="row">
        <div class="col-3">
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <a :class="openTab === 'config' ? 'nav-link active' : 'nav-link'" href="#"
                 v-on:click="setOptionsTab('config')">
                Configuration
              </a>
            </li>
            <li class="nav-item">
              <a :class="openTab === 'customize' ? 'nav-link active' : 'nav-link'" href="#"
                 v-on:click="setOptionsTab('customize')">
                Customize
              </a>
            </li>
          </ul>
          <div class="border border-top-0 p-2">
            <TypeVariants v-if="openTab === 'config'"
                          :types="types"
                          :selectedType="selectedType"
            />
            <ColorVariants v-if="openTab === 'config'"
                           :variants="variantColors"
                           :selectedVariant="selectedVariant.color"
                           @changeColorVariant="changeColorVariant"
            />
            <SizeVariants v-if="openTab === 'config'"
                          :variants="variantSizes"
                          :selectedVariant="selectedVariant.size"
                          @changeSizeVariant="changeSizeVariant"
            />
            <TextVariants v-if="openTab === 'customize'"
                          :textOptions="textOptions"
                          @addText="addText"

            />

            <GraphicVariants v-if="openTab === 'customize'"
                             :graphics="graphics"
                             @addGraphic="addGraphic"
            />

          </div>
        </div>
        <div class="col-6">
          <Canvas :options="canvasOptions"
                  :image="selectedVariant.color.image"
                  :addedGraphics="addedGraphics"
                  :addedTexts="addedTexts"
                  
          />
        </div>
        <div class="col-3">
          <Form 
          :selectedType="selectedType"
          :selectedVariant="selectedVariant"
          :variantCombos="variantCombos"
          :addedTexts="addedTexts"
          :addedGraphics="addedGraphics"
          />
          <Cart
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ColorVariants from '@/components/VariantComponents/Colors';
import TypeVariants from '@/components/VariantComponents/Types';
import GraphicVariants from '@/components/VariantComponents/Graphics';
import TextVariants from '@/components/VariantComponents/Texts';
import SizeVariants from '@/components/VariantComponents/Sizes';
import Canvas from '@/components/Canvas';
import Form from '@/components/Form';
import Cart from '@/components/Cart';


export default {
  name: 'App',
  components: {
    ColorVariants,
    TypeVariants,
    SizeVariants,
    Canvas,
    Form,
    Cart,
    GraphicVariants,
    TextVariants
  },
  data() {
    return {
      ready: false,
      optionsTab: 'config',
      selectedVariant: {
        color: '',
        size: ''
      },
      selectedType: {},
      canvasOptions: {
        bounds: {}
      },
      types: [],
      product: {},
      variantColors: {},
      variantSizes: {},
      variantCombos: {},
      addedGraphics: [],
      addedTexts: [],
      graphics: [],
      textOptions:{}
    };
  },
  computed: {
    openTab() {
      return this.optionsTab;
    }
  },
  methods: {
    setOptionsTab( value ) {
      this.optionsTab = value;
    },
    changeColorVariant( option ) {
      this.selectedVariant.color = option;
      this.filterSizeVariants();
    },
    changeSizeVariant( option ) {
      this.selectedVariant.size = option;
    },
    addText( objText ) {
      this.addedTexts.push(
          {
            'text': objText.text,
            x: 50,
            y: 50,
            width: 50,
            height: 50,
            options: {
              fontSize: 40,
              fontFamily: objText.font
            }
          }
      );
    },
    addGraphic( index ) {
      this.addedGraphics.push( {
        image: this.graphics[ index ],
        x: 50,
        y: 50,
        width: 50,
        height: 50
      } );
    },
    filterSizeVariants() {
      this.variantSizes.options.forEach( ( size ) => {
        let selectedColor = this.selectedVariant.color;
        let variantId = [ selectedColor.id, size.id ].join( '.' );
        size.active = this.variantCombos.filter( vc => vc.variantId === variantId ).length !== 0;

        if ( this.selectedVariant.size.active === false ) {
          this.selectedVariant.size = this.variantSizes.options.filter( s => s.active === true )[ 0 ];
        }
      } );
    },
    setConfig() {
      let config = this.$store.getters.config;
      this.graphics = config.graphics;
      this.textOptions = config.textOptions;
      this.types = config.types;
      this.selectedType = this.types[ 0 ];
      this.canvasOptions.bounds = config.canvas.bounds[ this.selectedType.value ];
    },
    setProductData() {
      let productData = this.$store.getters.productData;
      this.product = productData.find( p => p.type === this.selectedType.value );
      this.variantColors = this.product.variantGroups.colors;
      this.variantSizes = this.product.variantGroups.sizes;
      this.variantCombos = this.product.variantCombinations;
      let selectedVariantCombo = this.variantCombos.find( vc => vc.isDefault === true );
      let selectedVariantComboVariantId = selectedVariantCombo.variantId.split( '.' );
      this.selectedVariant.color = this.variantColors.options.find( c => c.id === selectedVariantComboVariantId[ 0 ] );
      this.selectedVariant.size = this.variantSizes.options.find( s => s.id === selectedVariantComboVariantId[ 1 ] );
    }
  },
  mounted() {
    this.setConfig();
    this.setProductData();
    this.filterSizeVariants();
    this.ready = true;
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.variant-option {
  width: 25px;
  height: 25px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  text-align: center;
  border-radius: 3px;

  &.active {
    border: 1px solid #5f5f5f;
  }

  &.disabled {
    pointer-events: none;
    opacity: .5;
    position: relative;

    &::after {
      content: '';
      border-bottom: 1px solid #000;
      position: absolute;
      left: 5%;
      right: 5%;
      width: 90%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
