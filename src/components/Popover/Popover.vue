<template>
  <transition :name="transition">
    <div
      v-if="visible"
      class="vue-popover dropdown-position-bottom"
      :data-popover="this.name"
      @click.stop
    >
      <slot name="body" />
    </div>
  </transition>
</template>
<script lang="ts">
import Vue from "vue";
import Component, { mixins } from "vue-class-component";

const Props = Vue.extend({
  props: {
    name: {
      type: String,
      required: false,
    },
    transition: {
      type: String,
    },
  },
});
const MixinsDeclaration = mixins(Props);

@Component
export default class Popover extends MixinsDeclaration {
  /**
   * Show popover or not
   * Default value false, popover not showing
   */
  visible = true;

  mounted(){
   console.log(' Le resultat ');
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
}

.vue-popover.dropdown-position-bottom:before,
.vue-popover.dropdown-position-top:before {
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  left: calc(50% - 10px);
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