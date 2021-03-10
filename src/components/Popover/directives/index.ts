import { DirectiveOptions } from 'vue';
/** v-popover directive */
export const Directive: DirectiveOptions = {
    bind(el, binding) {
      console.log(' element target ', el);
      console.log(' value setting ', binding);
    }
}