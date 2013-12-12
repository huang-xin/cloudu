/**
 * @author yanshasha
 */
/*弹框*/

;(function() {
    cloudu.pop = function(obj) {
        var _obj = $.extend({
            time : 0, /*若大于0，则在指定时间后自动消失*/
            str : "",
            width : "160",
            closeBtn : "", /*绑定关闭当前弹框的dom元素*/
            confirmBtn : "", /*确认按钮*/
            cancelBtn : "", /*取消按钮*/
            confirmFn : "", /*点击确认按钮后的回调函数*/
            className : "pop pop-toast", /*表示想要使用的样式*/
            mask : {
                opacity : 0,
            }/*遮罩是否透明，0为透明;mask设为false则不添加遮罩*/
        }, obj);

        clearTimeout(cloudu.pop.timer);
        /*判断假如不存在popBox*/
        if ($('#popBox').length > 0) {
            var me = $('#popBox');
        } else {
            var me = $('<div id="popBox"></div>').appendTo("body");
        }
        me.html(_obj.str);
        me.show();
        /*垂直居中：滚动条y的值+（页面高度-弹框高度）/2*/
        var top = window.scrollY + (window.innerHeight - me.height()) / 2;
        me.removeClass().addClass(_obj.className).css({
            top : top,
            left : (window.innerWidth - _obj.width) / 2,
            width : _obj.width
        });
        //me.fix({top:50%,left:50%});

        if (_obj.mask) {
            cloudu.setMask(_obj.mask);
            // cloudu.disableDom(me);
        }
        var closePop = function() {
            me.hide();
            if (_obj.mask) {
                cloudu.hideMask();
                // cloudu.enableDom(me);
            }
        }
        /*若定义了关闭按钮，则点击按钮时执行关闭操作*/
        if (_obj.closeBtn && $(_obj.closeBtn).length) {
            $(_obj.closeBtn).on({
                'touchstart' : closePop,
                'touchmove' : closePop,
                'touchend' : closePop,
                'click':closePop
            });
        }

        /*若定义了确认按钮，则点击按钮时执行回调函数，并关闭弹框*/
        if (_obj.confirmBtn) {
            var confirm = function() {
                if (_obj.confirmFn) {
                    confirmFn();
                }
                closePop();
            }

            $(confirmBtn).on({
                'touchstart' : closePop,
                'touchmove' : closePop,
                'touchend' : closePop
            });
        }

        if (_obj.time > 0) {
            cloudu.pop.timer = setTimeout(function() {
                closePop();
            }, _obj.time);
        }
    }
    /*设置遮罩*/
    cloudu.setMask = function(obj) {
        var _obj = $.extend({
            // bg : 'rgba(0,0,0,0.5)',
            opacity : 0,
            disabled : true,
            container : "#page"
        }, obj);
        var _container = $(_obj.container).length ? _obj.container : "body";
        if ($('#mask').length > 0) {
            var me = $('#mask');
        } else {
            var me = $('<div id="mask"></div>').appendTo(_container);
        }

        me.css({
            backgroundColor : 'rgba(0,0,0,' + _obj.opacity + ')',
            zIndex:9
        });

        if (_obj.container == "body") {
            me.fix({
                top : 0,
                bottom : 0,
                left : 0,
                right : 0
            });
        } else {
            me.css({
                position : "absolute",
                left : 0,
                right : 0,
                top : 0,
                bottom : 0
            });
        }

        if (_obj.disabled == true) {
            cloudu.disableDom('#mask');
            $('html').css({
                overflow : 'hidden'
            });

        }
    }

    cloudu.hideMask = function() {
        var $mask=$('#mask');
        if ($mask.length > 0) {
            $mask.css({opacity:0});
            setTimeout(function() {
                $mask.remove();
            }, 600);
        }

        $('html').css({
            overflow : 'visible'
        });
    }
    cloudu.preventDefault = function(e) {
        e.preventDefault();

    }
    cloudu.disableDom = function(dom) {
        var _dom = dom;
        if ($(dom).length > 0) {
            $(dom).on({
                'touchstart' : cloudu.preventDefault,
                'touchmove' : cloudu.preventDefault
            });

        }

    }

    cloudu.enableDom = function(dom) {
        var _dom = dom;
        if ($(dom).length > 0) {
            $(dom).off({
                'touchstart' : cloudu.preventDefault,
                'touchmove' : cloudu.preventDefault
            });
        }

    }
})();

