;(function() {
    var Util = function() {
    };
    /* *
     * 判断客户端类型及版本号
     * 使用方法：
     * e.g.if(Util.client.system=="android"){//do something for android}
     * */
    Util.client = function() {
        var system = "";
        var version = 0;
        var browser = "";

        var ua = navigator.userAgent;

        if (ua.indexOf("iPhone") > -1 || ua.indexOf("iPod") > -1) {
            system = "ios"
            if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)) {
                version = parseFloat(RegExp.$1.replace("_", "."));
            } else {
                version = 2;
                /*无法真正检测，只能猜测*/
            }
        } else if (/Android (\d+\.\d+)/.test(ua)) {
            system = "android";
            version = parseFloat(RegExp.$1);
        } else {
            system = "others";
        }

        if ($.browser.uc) {
            browser = "uc";
        } else if ($.browser.baidu) {
            browser = "baidu";
        } else if ($.browser.qq) {
            browser = "qq";
        } else if ($.browser.safari) {
            browser = "safari";
        } else if ($.browser.chrome) {
            browser = "chrome";
        } else if ($.browser.firefox) {
            browser = "firefox";
        } else {
            browser = "other";
        }

        return {
            system : system,
            version : version,
            browser : browser
        }

    }();

    /*
     * 检测网络状况(so far,it's not used)
     * Util.network.status= "ONLINE"或"OFFLINE"或"NOTSUPPORT"
     * Util.network.type=连网类型
     * */
    Util.network = (function() {
        var network = {
            'status' : '',
            'type' : ''
        };
        if (navigator.onLine !== undefined) {
            network.status = navigator.onLine ? "ONLINE" : "OFFLINE";
        } else {
            network.status = "NOTSUPPORT";
        }

        if (navigator.connection !== undefined) {
            var connection = navigator.connection;
            switch(connection.type) {
                case connection.CELL_3G:
                    network.type = 'CELL_3G';
                    break;
                case connection.CELL_2G:
                    network.type = 'CELL_2G';
                    break;
                case connection.WIFI:
                    network.type = 'WIFI';
                    break;
                case connection.ETHERNET:
                    network.type = 'ETHERNET';
                    break;
                default:
                    network.type = 'UNKOWN';
                    break;
            }
        } else {
            network.type = "NOTSUPPORT";
        }

        return network;
    })()

    /*
     * 检测浏览器是否支持html5上传
     * (not used yet)
     * */
    Util.uploadSupport = (function() {
        return ( typeof FormData !== 'undefined') && (!!(window.File && window.FileList && window.FileReader));
    })();

    /*自动隐藏地址栏*/
    Util.hideAddressBar = (function() {
        var innerHeight = window.innerHeight, isExtend = true;
        return function() {
            var container = $('body'), initHeight = container.height();
            innerHeight >= initHeight ? container.height(innerHeight + 100, 'px') : ( isExtend = false );
            setTimeout(function() {
                window.scrollTo(0, 1);
                isExtend && container.height(window.innerHeight, 'px')
            }, 300);
        }
    })()

    /*防止一些特殊字符被浏览器自动转码*/
    Util.encodeHTML = function(source) {
        return String(source).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    };
    Util.decodeHTML = function(source) {
        return String(source).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, "\"").replace(/&#39;/g, "'");
    };
    /*获取cookie值*/
    Util.getCookie = function(name) {
        var c_start, c_end;
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(name + "=")
            if (c_start != -1) {
                c_start = c_start + name.length + 1
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1)
                    c_end = document.cookie.length;
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return "";
    };

    /*将B转为KB,MB,GB*/
    Util.formatSize = function(size, ifAddB) {
        var num = new Number(size), addB = ifAddB ? "B" : "";
        if (num >= 1073741824) {
            return ((num / 1073741824).toFixed(2)) * 100 / 100 + "G";
        } else if (num >= 1048576 && num < 1073741824) {
            return ((num / 1048576).toFixed(2)) * 100 / 100 + "M";
        } else if (num >= 1024 && num < 1048576) {
            return ((num / 1024).toFixed(2)) * 100 / 100 + "K";
        } else {
            return num + addB;
        }

    }
    /*格式化时间，参数为ms*/
    Util.formatTime = function(ms) {
        var time = new Date(parseInt(ms));
        var YYYY = time.getFullYear();
        var MM = (( M = time.getMonth() + 1) < 10) ? ("0" + M) : M;
        var DD = (( D = time.getDate()) < 10) ? ("0" + D) : D;
        var hh = (( h = time.getHours()) < 10) ? ("0" + h) : h;
        var mm = ( m = time.getMinutes()) < 10 ? ('0' + m) : m;
        var ss = ( s = time.getSeconds()) < 10 ? ('0' + s) : s;

        var timeStr = YYYY + "-" + MM + "-" + DD + " " + hh + ":" + mm + ":" + ss;
        return timeStr;

    }
    /*格式化日期，参数为ms*/
    Util.formatDate = function(ms) {
        var time = new Date(parseInt(ms));
        var YYYY = time.getFullYear();
        var MM = (( M = time.getMonth() + 1) < 10) ? ("0" + M) : M;
        var DD = (( D = time.getDate()) < 10) ? ("0" + D) : D;
        var timeStr = YYYY + "-" + MM + "-" + DD;
        return timeStr;

    }
    /*格式化时间，参数为时间*/
    Util.formatTimeTitle = function(time) {
        var _time = new Date(time);
        var YYYY = _time.getFullYear();
        var MM = (( M = time.getMonth() + 1) < 10) ? ("0" + M) : M;
        var DD = (( D = time.getDate()) < 10) ? ("0" + D) : D;
        var hh = (( h = time.getHours()) < 10) ? ("0" + h) : h;
        var mm = ( m = time.getMinutes()) < 10 ? ('0' + m) : m;
        var ss = ( s = time.getSeconds()) < 10 ? ('0' + s) : s;

        var timeStr = YYYY + "-" + MM + "-" + DD + " " + hh + mm + ss;
        return timeStr;

    }
    /* *
     * 将文件名后缀转为对应的小图标类名
     * 由于小图标的名称都是i+类型后缀，如图片是ijpg，因此图片类型的文件后缀通过此函数会转为ijpg
     * e.g.Util.category(".ico") = "ijpg"
     * */

    Util.category = function(str) {
        var getClass = function(exName) {
            this[".jpg"] = "jpg";
            this[".jpeg"] = "jpg";
            this[".gif"] = "jpg";
            this[".bmp"] = "jpg";
            this[".png"] = "jpg";
            this[".jpe"] = "jpg";
            this[".cur"] = "jpg";
            this[".svg"] = "jpg";
            this[".svgz"] = "jpg";
            this[".tif"] = "jpg";
            this[".tiff"] = "jpg";
            this[".ico"] = "jpg";

            this['.doc'] = "doc";
            this['.docx'] = "doc";
            this['.wps'] = "doc";

            this['.xls'] = "xls";
            this['.xlsx'] = "xls";

            this['.ppt'] = "ppt";
            this['.pps'] = "ppt";
            this['.pptx'] = "ppt";
            this['.vsd'] = "vsd";

            this['.pdf'] = "pdf";

            this['.apk'] = "apk";

            this['.zip'] = "rar";
            this['.rar'] = "rar";

            this['.txt'] = "txt";

            this['.vcf'] = "vcf";

            this['.html'] = 'html';
            this['.xhtml'] = 'html';
            this['.htm'] = 'html';

            this['.vsd'] = 'vsd';

            this['.video'] = 'mov';
            this['.wmv'] = 'mov';
            this['.rmvb'] = 'mov';
            this['.mpeg4'] = 'mov';
            this['.mpeg2'] = 'mov';
            this['.flv'] = 'mov';
            this['.avi'] = 'mov';
            this['.3gp'] = 'mov';
            this['.mpga'] = 'mov';
            this['.qt'] = 'mov';
            this['.rm'] = 'mov';
            this['.wmz'] = 'mov';
            this['.wmd'] = 'mov';
            this['.wvx'] = 'mov';
            this['.wmx'] = 'mov';
            this['.wm'] = 'mov';
            this['.swf'] = 'mov';
            this['.mpg'] = 'mov';
            this['.mp4'] = 'mov';
            this['.mkv'] = 'mov';
            this['.mpeg'] = 'mov';
            this['.mov'] = 'mov';

            this['.wma'] = "mp3";
            this['.mp3'] = "mp3";
            this['.aac'] = "mp3";
            this['.ra'] = "mp3";
            this['.ram'] = "mp3";
            this['.mp2'] = "mp3";
            this['.ogg'] = "mp3";
            this['.aif'] = "mp3";
            this['.mpega'] = "mp3";
            this['.amr'] = "mp3";
            this['.mid'] = "mp3";
            this['.midi'] = "mp3";
            this['.torrent'] = "bt";

            var getName = this[exName];
            return getName || "default";
        }
        var extensionFileName = str.substring(str.lastIndexOf("."));
        return "i" + getClass(extensionFileName.toLocaleLowerCase());
    }
    /* *根据第三方数字得到图标或名称
     * 通过输入第三方的数字代表和想要的返回类型来得到第三方对应图标或文案
     * e.g. Util.getThirdName({thirdNum:15,returnValue:"thirdName"}) ->"QQ"
     */

    Util.getThirdName = function(obj) {
        var _obj = $.extend({
            thirdNum : 0,
            returnValue : "thirdLogo"/*thirdLogo代表返回的是第三方对应的logo，thirdName返回的是第三方名字，如新浪微博*/
        }, obj);
        var third = parseInt(_obj.thirdNum);
        if (third > 0) {
            var thirdClass = "", thirdName = "";
            switch(third) {
                case 1:
                    thirdClass = 'irenren';
                    thirdName = "人人";
                    break;
                case 2:
                    thirdClass = 'isina';
                    thirdName = "新浪微博";
                    break;
                case 15:
                    thirdClass = 'iqq';
                    thirdName = "QQ";
                    break;
                default:
                    thirdClass = '';
                    thirdName = "第三方";
            }
            if (_obj.returnValue == "thirdLogo") {
                return thirdClass ? ('<i class="' + thirdClass + '"></i>') : '';
            } else if (_obj.returnValue == "thirdName") {
                return thirdName;
            } else {
                return '';
            }
        } else {
            return '';
        }
    }
    /*构建面包屑*/
    Util.createCrumb = function(path, staticurl, rootPath) {
        var staticurl = staticurl + "&page=1";
        /*拼凑前面不变的静态url*/
        var tempRE = encodeURIComponent(rootPath), path = encodeURIComponent(path);
        path = decodeURIComponent( path ? path.replace(tempRE, "") : "");
        /*path用来生成面包屑数组，去除root部分*/
        path = path.replace(/^\/|\/$/g, "");
        var root = rootPath.replace(/\/$/g, "");
        var crumbArr = path.split("/");
        var crumbHtml = '<a href="' + staticurl + '" data-ac="active">全部文件</a><span class="seperator">></span>';
        var crumbHref = "";
        for (var i = 0; i < crumbArr.length - 1; i++) {
            crumbHref += "/" + encodeURIComponent(crumbArr[i]);
            var href = staticurl + "&dir=" + encodeURIComponent(root) + crumbHref;
            crumbHtml += '<a href="' + href + '"  data-ac="active">' + (crumbArr[i] == "apps" ? "我的应用数据" : Util.encodeHTML(crumbArr[i])) + '</a><span class="seperator">></span>';
        }
        if (crumbArr.length > 0) {
            var lastCrumb = Util.encodeHTML(crumbArr[crumbArr.length - 1]);
            crumbHtml += '<span>' + (lastCrumb == "apps" ? "我的应用数据" : lastCrumb) + '</span>';
        }
        return crumbHtml;
    }
    /*文件小图标样式*/

    /*isdir:0文件，1文件夹，2bt，3专辑*/
    Util.getIconClass = function(obj) {
        var _obj = $.extend({
            fileName : "",
            fileisDir : "0"
        }, obj);
        var iconClass, fileName = _obj.fileName.toString();

        if (_obj.fileisDir == "0") {
            iconClass = Util.category(fileName.substring(fileName.lastIndexOf(".")));
        } else if (_obj.fileisDir == "1") {
            if (fileName == "apps") {
                iconClass = "iapps";
            } else {
                iconClass = "ifolder";
            }
        } else if (_obj.fileisDir == "2") {
            //多文件列表
            iconClass = "imultifile";
        } else if (_obj.fileisDir == "3") {
            //专辑文件
            iconClass = "ialbum";
        } else if (_obj.fileisDir == "4") {
            //BT文件
            iconClass = "ibt";
        } else {
            iconClass = "idefault";
        }
        return iconClass;

    };
    /*列表页面，生成截取完后的文件名:输入文件名和文件类型，返回html串*/
    Util.createFileName = function(obj) {
        var _obj = $.extend({
            fileName : "",
            fileisDir : "0"
        }, obj);
        var _str = _obj.fileName.toString(), _isDir = _obj.fileisDir, suffix = _str.substring(_str.lastIndexOf("."));
        /*通过category方法可以处理那些文件无后缀但是带有.的名字*/
        var suffixClass = Util.category(suffix);
        /*当suffixClass为idefault时，说明文件名的后缀是无法识别的，这是就不需要单独处理后缀*/
        if (_isDir == "0" && suffixClass != "idefault") {
            var mw = "83%";
            if (suffix.length <= 3) {
                mw = "90%";
            } else if (suffix.length == 4) {
                mw = "85%";
            } else if (suffix.length == 5) {
                mw = "84%";
            } else {
                mw = "79%";
            }

            return '<span class="fn-main" style="max-width:' + mw + '">' + Util.encodeHTML(_str.substring(0, _str.lastIndexOf("."))) + '</span>' + '<span class="fn-suffix">' + suffix + '</span>';
        } else if (_isDir == "1") {
            if (_isDir == "1" && _str == "apps") {
                _str = "我的应用数据";
            }
            return Util.encodeHTML(_str);
        } else {
            return Util.encodeHTML(_str);
        }

    }
    /*根据字符数截取文件名:参数为原始字符串和想要截取的字符数，返回截取后的字符串*/
    Util.sliceStr = function(obj) {
        var _obj = $.extend({
            fileName : "",
            sliceNum : 0,
            numBeforeSuffix : 5
        }, obj);
        var fn = _obj.fileName.toString(), slicenum = parseInt(_obj.sliceNum), leftnum = parseInt(_obj.numBeforeSuffix);
        if (fn.length > (slicenum + leftnum + 3)) {
            var suffix = fn.slice(fn.lastIndexOf(".") - leftnum), prefn = fn.slice(0, fn.lastIndexOf("."));
            return prefn.slice(0, slicenum) + '...' + suffix;
        } else {
            return fn;
        }

    }
    /*生成页码及翻页*/
    Util.createPages = function(staticpageUrl, curpage, listLen) {
        var pagenumStr;
        if (curpage == 1) {
            $("#pre").addClass("inactive");
        } else {
            $("#pre").removeClass("inactive");
            $("#pre").attr("href", staticpageUrl + (curpage - 1));
        }
        if (listLen < 20) {
            $("#next").addClass("inactive");
        } else {
            $("#next").removeClass("inactive");
            $("#next").attr("href", staticpageUrl + (curpage + 1));
        }
        pagenumStr = curpage == 1 ? '<span>1</span>' : (curpage == 2 ? '<a data-ac="active" href="' + staticpageUrl + 1 + '">1</a><span>2</span>' : ('<a data-ac="active" href="' + staticpageUrl + (curpage - 2) + '">' + (curpage - 2) + '</a><a data-ac="active" href="' + staticpageUrl + (curpage - 1) + '">' + (curpage - 1) + '</a><span>' + curpage + '</span>')
        );
        $("#pagenum").html(pagenumStr);
    }
    /*生成完整页码及翻页*/
    Util.createCompletePages = function(staticpageUrl, start, totalCount, limit) {
        var start = parseInt(start), totalCount = parseInt(totalCount), limit = parseInt(limit);
        var pagenumStr, _start = start ? start : 0, _totalPage = Math.ceil(totalCount / limit), _curPage = parseInt(start / limit) + 1;

        if (_start == 0) {
            $("#pre").addClass("inactive");
            $("#firstPage").addClass("inactive");
        } else {
            $("#pre").removeClass("inactive");
            $("#firstPage").removeClass("inactive");
            $("#pre").attr("href", staticpageUrl + (_start - limit));
            $("#firstPage").attr("href", staticpageUrl + 0);
        }
        if (_curPage == _totalPage) {
            $("#next").addClass("inactive");
            $("#lastPage").addClass("inactive");
        } else {
            $("#next").removeClass("inactive");
            $("#lastPage").removeClass("inactive");
            $("#next").attr("href", staticpageUrl + (_start + limit));
            $("#lastPage").attr("href", staticpageUrl + (_totalPage - 1) * limit);
        }
        pagenumStr = _curPage + "/" + _totalPage;
        $("#pagenum").html(pagenumStr);
    }
    /*设置页面元素的点击态*/
    Util.setDomTouchStatus = function() {
        var isAndroid = /Android/.test(navigator.userAgent), klass, movecount, target;
        function parentIfText(node) {
            return 'tagName' in node ? node : node.parentNode;
        }

        function disactive() {
            target && target.removeClass(klass);
            target = null;
        }


        $(document.body).bind('touchstart', function(e) {
            disactive();
            var el = parentIfText(e.touches[0].target);
            klass = el.getAttribute('data-ac');
            while (el && !klass) {
                el = el.parentNode;
                if (el === document.body || el === document)
                    return;
                klass = el.getAttribute('data-ac');
            }
            movecount = 0;
            target = $(el).addClass(klass);
            setTimeout(disactive, 500);
        }).bind('touchmove', function(e) {
            if (target) {
                isAndroid ? movecount++ > 0 && disactive() : disactive();
            }
        }).bind('touchend', function(e) {
            disactive();
        })
    }
    /*当页面第一次载入时，赋值，然后当页面只渲染没刷新时，刷新页面——用来解除手机返回键不刷新页面的bug*/
    // Util.recordPageStatus = function() {
    // if ($('body').data('pageshow')) {
    // alert('pageshow')
    // window.location.reload();
    // } else {
    // $('body').data('pageshow', '1');
    // }
    // }
    // //某些浏览器回退无法执行js，但是会触发window.onpageshow事件，将需要事件注册在onpageshow中
    // $(window).on("pageshow", function() {
    // Util.recordPageStatus();
    // });
    // //对于不支持onpageshow的浏览器，直接将事件写在js中，如andorid2.1，没pageshow事件，但是回退可以执行页面js代码
    // if ( typeof (window.onpageshow) == "undefined") {
    // Util.recordPageStatus();
    // }

    Util.getQueryString = function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return decodeURIComponent(r[2]);
        return null;
    };

    Util.changeURLArg = function(url, arg, arg_val) {
        var pattern = arg + '=([^&]*)';
        var replaceText = arg + '=' + arg_val;
        if (url.match(pattern)) {
            var tmp = '/(' + arg + '=)([^&]*)/gi';
            tmp = url.replace(eval(tmp), replaceText);
            return tmp;
        } else {
            if (url.match('[\?]')) {
                return url + '&' + replaceText;
            } else {
                return url + '?' + replaceText;
            }

        }
        return url + '\n' + arg + '\n' + arg_val;
    };
    
    Util.triggerUrl=function(url){
         $('<a>').attr('href', url).trigger('click'); 
    };

    /*zepto扩展：固定定位*/
    (function($) {
        var version = parseFloat($.os.version),
        /*根据是否支持fixed属性分别处理，如果不支持，则使用absolute模拟。*/
        doFix = (!version || $.os.ios && version >= 5) && !/htc_sensation_z710e/i.test(navigator.userAgent) ? function($el, opts) {
            opts['position'] = 'fixed';
            $el.css(opts).attr('isFixed', true)
        } : function($el, opts) {
            opts['position'] = 'absolute';
            $el.css(opts);
            if (!$el.attr('isFixed')) {
                $el.attr('isFixed', true);
                $(window).on('scroll', function() {
                    $el.css('top', window.pageYOffset + (opts.bottom !== undefined ? window.innerHeight - $el.height() - opts.bottom : (opts.top || 0)));
                });

            }
        };
        $.extend($.fn, {
            fix : function(options) {
                return this.each(function() {
                    doFix($(this), $.extend({
                        zIndex : 99
                    }, options || {}))
                })
            }
        });
        $(window).on('onorientationchange' in window ? 'orientationchange' : 'resize', function() {
            $(window).trigger('scroll')
        });
    })(Zepto);

    mpan.util = Util;
})();
