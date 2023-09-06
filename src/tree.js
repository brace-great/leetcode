
/**
 * @param {HTMLElement} el - element to be wrapped
 */
 function $(el) {
     return {
        css: function (params,val) {
             el.style[params] = val
             return this
        }
    }
  }