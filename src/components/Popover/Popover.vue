<template>
    <div
      id="v-popover"
      v-if="__visible"
      class="vue-popover dropdown-position-bottom"
      :style="style"
      @click.stop
    >
      <slot name="body" />
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component, { mixins } from "vue-class-component";

const Props = Vue.extend({
  props: {
    target :{
      type: String
    },
    width: {
      type: Number,
      default: 120
    },
    pointer: {
      type: Boolean,
      default: true
    },
  },
});

const MixinsDeclaration = mixins(Props);

@Component
export default class Popover extends MixinsDeclaration {

  get __visible():boolean{
    return this.visible;
  }

  get style(){
    const { width } = this
       const styles:any = {
        width: `${width}px`,
        ...this.position
      }
      return styles
    }

  set __visible(visible: boolean){
   this.visible = visible
  }

  position = {};

  visible = false;


  created():void{
    this.calculPosition()
  }


  calculPosition(): void{

    let posTarget = document.getElementById(this.target)?.getBoundingClientRect();

     window.addEventListener("resize", (evt)=>{
       posTarget = document.getElementById(this.target)?.getBoundingClientRect();
       let caclLeft = this.width - (Number(posTarget?.width));
       this.position = {
            top: `${Number(posTarget?.top)-10}px`,
            left: `${Number(posTarget?.left)-caclLeft}px`
       }
     });

     window.addEventListener("scroll", (evt)=>{
         posTarget = document.getElementById(this.target)?.getBoundingClientRect();
         const el = document.getElementById('v-popover');
         if(el){
           el.style.position = 'fixed';
           el.style.top= `${Number(posTarget?.height)+Number(posTarget?.top)+10}px`
         }
     });

      window?.addEventListener("click", (e:any)=>{
        posTarget = document.getElementById(this.target)?.getBoundingClientRect();
        if(e.target?.id === this.target || e.target?.offsetParent.parentElement.id === this.target){
           this.$nextTick(() => {
           let caclLeft = this.width - (Number(posTarget?.width));
            this.position = {
            top: `${Number(posTarget?.top)-10}px`,
            left: `${Number(posTarget?.left)-caclLeft}px`
         }
          this.visible = !this.visible;
           });
        }
        else{
          this.visible = false;
        }
     });
  }
}
</script>

<style lang="scss" scoped>
#v-popover .my-12 {
  margin-top: 0px !important;
  margin-bottom: 0px !important;
}
.vue-popover {
  z-index: 500;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: auto;
  border-radius: 6px;
  position: absolute;
  background: white !important;
  padding: 1px !important;
}
.vue-popover.dropdown-position-bottom:before {
  border-bottom: 10px solid #fff;
  top: -9px;
  z-index: 200;
  filter: drop-shadow(0px -1px 0px rgba(0, 0, 0, 0.3));
  left: calc(90% - 10px);
}

.vue-popover.dropdown-position-bottom:before,
.vue-popover.dropdown-position-top:before {
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
}

.vue-popover:before {
  display: block;
  position: absolute;
  width: 0;
  height: 0;
  content: "";
}
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: 0px 0px 0px 0px !important;
}
</style>
