import Component from '@ember/component';
import { get, set } from '@ember/object';

export default Component.extend({
  isShown: true || window.explainRedirect,

  actions: {
    dismiss() {
      set(this, 'isShown', false);
    }
  }
});
