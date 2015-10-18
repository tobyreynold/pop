/**
 * pop.js
 *
 *
 * @return  pop
 */

;(function (window,$) {
    'use strict';

    var pop = {

        _element:null,

        _element_bg:null,


        /**
         * config
         *  {
         *      showbg:true,
         *      close:true,
         *      closefunc:func,
         *      okText:'ok',
         *      okfunc:func,
         *
         *
         *  }
         *
         *
         */
        _create:function(config) {

            var _this = this;

            this._element_bg = $('<div class="pop-bg"></div>');
            if(config.showbg) {
                $("body").append(this._element_bg);
            }

            if(config.close) {
                this._element = $("<div class='pop-content'><span class='pop-close'>X</span></div>");
            } else {
                this._element = $("<div class='pop-content'></div>");
            }

            $("body").append(this._element);

            if(config.closefunc) {
                $("body").on('click','.pop-close,.pop-bg',function() {
                    _this.close(config);
                });
            }

        },

        show:function(config) {
          var conf = config || {};
          this._create(conf);
        },




        alert:function() {},

        confirm:function() {},

        tips:function() {},

        close:function(config) {
            if(config.closefunc) {
               config.closefunc();
            }

            this._element.remove();
            this._element_bg.remove();
        }


    };


    window.pop = pop;


})(window,Zepto);