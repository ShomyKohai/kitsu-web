import Component from '@ember/component';
import { get, set } from '@ember/object';

export default Component.extend({
  isShown: window.explainRedirect,

  actions: {
    dismiss() {
      set(this, 'isShown', false);
    }
  }
});
