<template>
  <span class="wrapper_span" :style="getColor">
    <svg :class="svgClass" aria-hidden="true" style="">
      <use :xlink:href="iconName"></use>
     </svg>
  </span>
</template>

<script>
export default {
  name: 'svg-icon',
  props: {
  	size:{
  		type:String,
    },
  	color:{
  		type:String,
    },
    iconClass: {
      type: String,
//      required: true
    },
    className: {
      type: String
    }
  },
  data(){
  	return {
  		styObj:{
  			color:'',
        fontSize:''
      },
    }
  },
  computed: {
  	getColor(){
  		this.styObj.color = this.color;
  		this.styObj.fontSize = this.size;
  		return this.styObj
    },
    iconName() {
  		console.log(this.iconClass)
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style scoped>
  .wrapper_span{

  }
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
