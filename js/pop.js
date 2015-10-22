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
         *      content:'text',
         *      cancelText:'cancel',
         *      html:'',
         *      func:func
         *      type:'alert||confirm||tips||diy'
         *  }
         */
        _create:function(config) {
            $(".pop-bg").remove();
            $(".pop-content").remove();
            var _this = this,
                body = $("body");

            this._element_bg = $('<div class="pop-bg"></div>');
            if(config.showbg) {
                body.append(this._element_bg);
            }

            this._element = $("<div class='pop-content'></div>");

            body.append(this._element);

            if(config.close || config.closefunc) {
                body.on('click','.pop-close,.pop-bg',function() {
                    _this.close(config);
                });
            }
        },

        _show:function(config) {
            var conf = config || {},
                html;
            this._create(conf);

            if(config.title && (config.close || config.closefunc)) {
                html = "<h4>"+ config.title +"<span class='pop-close'>X</span></h4>";
            } else if (config.title) {
                html = "<h4>"+ config.title +"</h4>";
            } else if (config.close) {
                html = "<h4><span class='pop-close'>X</span></h4>";
            } else {
                html='';
            }

            if(config.type == "alert" || config.type == 'confirm') {
                html += '<div class="pop-main">'+ config.content +'</div>';
                if(config.type == "alert" && config.okText) {
                    html += '<div><span class="btn-ok">'+ (config.okText? config.okText:'OK') +'</span></div>';
                } else if (config.type == "confirm" && (config.okText || config.cancelText)) {
                    html += '<div><span class="btn-ok">'+ (config.okText? config.okText:'OK') +'</span><span class="btn-cancel">'+ (config.cancelText? config.cancelText:'Cancel') +'</span></div>';
                } else {
                    html += config.text;
                }
            } else if(config.type == 'diy') {
                html += config.html;
            } else {
                html += '<div class="pop-main">'+ config.content +'</div>';
            }


            this._element.append(html);
        },


        alert:function(config) {
            config.type = "alert";
            this._show(config);
        },

        confirm:function(config) {
            config.type = "confirm";
            this._show(config);
        },

        /**
         * text : 'string' or html
         * config
         *  {
         *      closefunc:func,
         *      closeTime:300
         *  }
         */

        tips:function(text,config) {
            var body = $("body"),
                _this = this;
            $(".pop-tips").remove();

            if(text) {
                var html = "<div class='pop-tips'>"+ text +"</div>";
                this._element = $(html);
                body.append(this._element);

                if(config.closeTime) {
                    setTimeout(function(){
                        _this.close(config);
                    },config.closeTime);
                } else {
                    setTimeout(function(){
                        _this.close(config);
                    },2000);
                }
            } else {
                return false;
            }

        },

        diy: function (config) {
            var conf = {
                type :'diy',
                html: config.html,
                func: config.func,
                showbg:config.showbg,
                close:config.close
            };

            this._show(conf);
        },

        close:function(config) {
            if(config.closefunc) {
               config.closefunc();
            }

            this._element.remove();
            if(this._element_bg) {
                this._element_bg.remove();
            }
        }

    };

    window.pop = pop;


})(window,Zepto);