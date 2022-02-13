<template>
  <div class="bg-light border h-100 position-relative">
    <div class="fabric-canvas-container">
      <div class="canvas" v-if="image">
        <img class="canvas-image" :src="image">
        <div class="canvas-bounds"
             :style="'width:'+options.bounds.width + '%;height:'+options.bounds.height+'%;top:'+options.bounds.top+'%;left:'+options.bounds.left+'%;'">
          <canvas id="canvas" ref="canvas"/>
        </div>
      </div>
      
    </div>
    <div class="canvas-toolbar d-flex justify-content-between position-absolute">
      <button class="btn btn-warning" type="button">Reset design</button>
      <button class="btn btn-success" type="button">Save design for later</button>
    </div>
  </div>
</template>

<script>

import { fabric } from 'fabric';

export default {
  name: 'Canvas',
  props: [ 'options', 'image', 'addedGraphics', 'addedTexts' ],
  data() {
    return {
      canvas: null
    };
  },
  methods: {
    createCanvas(){
      const canvasBounds = document.querySelector( '.canvas-bounds' );
      let canvas = new fabric.Canvas( this.$refs.canvas, {
            width: canvasBounds.clientWidth,
            height: canvasBounds.clientHeight,
            hoverCursor: 'pointer',
            selection: true,
            selectionBorderColor: 'blue'
          }
      );
      this.$store.commit('updateCanvas', canvas);
    },
    loadCanvas() {
      let canvas = this.$store.getters.canvas;
      canvas.on( {
        'object:moving': ( event ) => {
          event.target.opacity = 0.5;
        },
        'object:modified': ( event ) => {
          event.target.opacity = 1;
          let ref = event.target.id;
          if ( ref ) {
            let split = ref.split( '.' );
            let id = parseInt( split[ 1 ] );
            if ( split[ 0 ] === 'gfx' ) {
              Object.assign( this.addedGraphics[ id ],
                  {
                    height: event.target.height * event.target.scaleY,
                    width: event.target.width * event.target.scaleX,
                    x: event.target.left,
                    y: event.target.top
                  }
              );
            }
            else if ( split[ 0 ] === 'txt' ) {
              Object.assign( this.addedTexts[ id ],
                  {
                    height: event.target.height * event.target.scaleY,
                    width: event.target.width * event.target.scaleX,
                    x: event.target.left,
                    y: event.target.top
                  }
              );
            }
          }
        }
      } );
      this.render();
      
    },
    update(canvas) {
      this.$store.commit('updateCanvas', canvas);
    },
    resize() {
      let canvas = this.$store.getters.canvas;
      const canvasBounds = document.querySelector( '.canvas-bounds' );
      const ratio = this.canvas.getWidth() / this.canvas.getHeight();
      const containerWidth = canvasBounds.clientWidth;
      const scale = containerWidth / this.canvas.getWidth();
      const zoom = this.canvas.getZoom() * scale;
      canvas.setDimensions( { width: containerWidth, height: containerWidth / ratio } );
      canvas.setViewportTransform( [ zoom, 0, 0, zoom, 0, 0 ] );
    },
    addGraphic( graphic, index ) {
      let canvas = this.$store.getters.canvas;
      fabric.Image.fromURL( graphic.image, ( img ) => {
            img.set( {
              left: graphic.x,
              top: graphic.y
            } );
            img.scaleToHeight( graphic.height );
            img.scaleToWidth( graphic.width );
            img.id = 'gfx.' + index;
            canvas.add( img );
            this.update(canvas);
          },
          { crossOrigin: 'anonymous' } );
    },
    addText( textObj, index ) {
      let canvas = this.$store.getters.canvas;
      const text = new fabric.IText( textObj.text, textObj.options );
      text.id = 'txt.' + index;
      canvas.add( text );
      this.update(canvas);
    },
    render() {
      let canvas = this.$store.getters.canvas;
      canvas.clear();
      this.addedGraphics.forEach( ( graphic, index ) => {
        this.addGraphic( graphic, index );
      } );
      this.addedTexts.forEach( ( text, index ) => {
        this.addText( text, index );
      } );
      canvas.renderAll();
    }
  },
  watch: {
    addedGraphics() {
      this.render();
    },
    addedTexts() {
      this.render();
    }
  },
  mounted() {
    let canvas = this.$store.getters.canvas;
    if(canvas === null){
      this.createCanvas();
    }
    this.loadCanvas();
  },
  created() {
    window.addEventListener( 'resize', this.resize );
  }
};
</script>

<style lang="scss">
.fabric-canvas-container {
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
  
  

  canvas {
    width: 100%;
    height: 100%;
    max-width: 100%;
  }

  .canvas {
    .canvas-image {
      max-width: 100%;
    }

    .canvas-bounds {
      position: absolute;
      border: 1px dashed #fff;
      outline: 1px dashed #000;
      background-color: transparent;
      box-shadow: 0 0 2px 1px rgba(0, 0, 0, .2);
      overflow: hidden;
    }

    .canvas-content {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .canvas-added-gfx {
      position: absolute;
      max-width: 100%;
      transform: translate(-50%, -50%);
      border: 1px dashed transparent;
      display: flex;
      justify-content: center;
      align-content: center;

      img {
        max-height: 100%;
      }

      &.selected {
        border-color: #fff;
        outline: 1px dashed #000;
      }
    }
  }
  
}
.canvas-toolbar{
  bottom:.5em;
  left:.5em;
  right:.5em;
}
</style>