<template>
  <div class="bg-light border h-100">
    <div class="fabric-canvas-container">
      <div class="canvas" v-if="image">
              <img class="canvas-image" :src="image" >
              <div class="canvas-bounds" :style="'width:'+options.bounds.width + '%;height:'+options.bounds.height+'%;top:'+options.bounds.top+'%;left:'+options.bounds.left+'%;'">
                <canvas id="canvas" ref="canvas" />
              </div>
        </div>
    </div>
  </div>
</template>

<script>

import { fabric } from 'fabric';

export default {
  name: 'DesignCanvas',
  props: [ 'options', 'image', 'addedGraphics' ],
  data() {
    return {
      canvas: null,
      imgWidth: 1,
      imgHeight: 1
    };
  },
  methods: {
    loadCanvas(){
      const canvasBounds = document.querySelector( '.canvas-bounds' );
      this.canvas = new fabric.Canvas( this.$refs.canvas, {
            width: canvasBounds.clientWidth,
            height: canvasBounds.clientHeight,
            hoverCursor: 'pointer',
            selection: true,
            selectionBorderColor: 'blue'
          }
      );
      this.canvas.on({
        'object:moving': (event) => {
          event.target.opacity = 0.5;
        },
        'object:modified': (event) => {
          event.target.opacity = 1;
        }
      });
      this.addedGraphics.forEach((graphic) =>{
        this.addGraphic(graphic);
      });
    },
    resize(){
      const canvasBounds = document.querySelector( '.canvas-bounds' );
      const ratio = this.canvas.getWidth() / this.canvas.getHeight();
      const containerWidth   = canvasBounds.clientWidth;
      const scale = containerWidth / this.canvas.getWidth();
      const zoom  = this.canvas.getZoom() * scale;
      this.canvas.setDimensions({width: containerWidth, height: containerWidth / ratio});
      this.canvas.setViewportTransform([zoom, 0, 0, zoom, 0, 0]);
    },
    addGraphic(graphic){
      const _vueInstance = this;
      fabric.Image.fromURL(graphic.image, (img) => {
        img.set({
          left: graphic.x,
          top: graphic.y
        });
        img.scaleToHeight(graphic.height);
        img.scaleToWidth(graphic.width);
        _vueInstance.canvas.add(img);
      });
    }
  },
  watch:{
    addedGraphics(arrGraphics){
      this.canvas.clear();
      arrGraphics.forEach((graphic) =>{
        this.addGraphic(graphic);

      });
      this.canvas.renderAll();
    }
  },
  mounted() {
    this.loadCanvas();
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
      box-shadow: 0 0 2px 1px rgba(0,0,0,.2);
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
</style>