var CLOUDU = ( function() {
        var _pub_static = function() {
            var _pri = {}, _pub = {};
            var _init = function(spec) {

            };

            _pub["listen"] = function(sType, callback) {
                _pri.listenAct[sType](callback);
            };

            _pub["get"] = function(sCode, callback) {
                var oResp;
                switch(sCode) {
                    case 'z8diz8otlsmi':
                        oResp = {
                            d_name : '大麦牌NB灯LM50',
                            d_code : 'z8diz8otlsmi',
                            d_type : '开关',
                            value : {
                                on : _pri.getRandomOn()
                            }
                        }
                        break;
                    case '3bfswxhz7q2s':
                        oResp = {
                            d_name : '拉拉牌温度计TT83',
                            d_code : '3bfswxhz7q2s',
                            d_type : '开关+显示1',
                            value : {
                                on : true,
                                value1 : _pri.getRandomT()
                            }
                        }
                        break;

                }
                callback({
                    stauts : 1,
                    msg : '获取成功',
                    data : oResp
                });
            };

            _pub["put"] = function(sCode, oValue, callback) {
                var oResp;
                switch(sCode) {
                    case 'z8diz8otlsmi':
                        oResp = {
                            d_name : '大麦牌NB灯LM50',
                            d_code : 'z8diz8otlsmi',
                            d_type : '开关',
                            value : {
                                on : oValue.on
                            }
                        }
                        break;
                    case '3bfswxhz7q2s':
                        oResp = {
                            d_name : '拉拉牌温度计TT83',
                            d_code : '3bfswxhz7q2s',
                            d_type : '开关+显示1',
                            value : {
                                on : true,
                                value1 : oValue.on
                            }
                        }
                        break;

                }
                callback({
                    stauts : 1,
                    msg : '获取成功',
                    data : oResp
                });
            };

            _pub["push"] = function(sAct, sValue, callback) {
                _pri.pushAct[sAct](sValue, callback);
            };

            _pub["pull"] = function(sAct, sValue, callback) {
                _pri.pullAct[sAct](sValue, callback);
            };

            _pri["pushAct"] = {
                "bindingCloudId" : function(sValue, callback) {
                    var cloudId=sValue.cloudId;
                    //查找数据库，发现如果云联id不存在,错误码-1代表不存在
                    if ( typeof cloudu.db.deviceList[cloudId] == "undefined") {
                        callback({
                            errno : -1,
                        });
                    }
                    //如果数据库存在此云联id，错误码0代表绑定成功
                    else {
                        //注意在绑定时要生成code并加入数据库
                        var device=cloudu.db.deviceList[cloudId];
                        callback({
                            errno : 0,
                            data : {
                                deviceName : device.name,//设备型号名
                                deviceCode : device.code,//根据云联id生成的设备code，用于详情页跳转及后续获取数据
                                infoName : device.infoName, //显示在列表页的信息类别，开关或者其他值类型（如温度，湿度等）
                                infoValue : device.infoValue, //显示在列表页的信息的具体值（如果当前是开还是关，温度值具体是多少等）
                                deviceLogo:device.logo//显示在列表页的logo图url
                            }
                        });
                    }
                    //请添加：如果由于code生成失败或者网络或者cookie之类的问题没有绑定成功，也返回一个值，errno为-2

                }
            };

            _pri["pullAct"] = {
                "deviceList" : function(sValue, callback) {
                    callback(_pri.createListData());
                }
            };

            _pri["listenAct"] = {
                "deviceMsg" : function(callback) {
                    var iSI = setInterval(function() {
                        try {
                            callback(_pri.createListData());
                        } catch(e) {
                            alert(e);
                            clearInterval(iSI);
                        }
                    }, 4000);
                }
            };

            _pri["createListData"] = function() {
                return {
                    stauts : 1,
                    msg : '返回成功',
                    data : {
                        list : [{
                            d_name : '大麦牌NB灯LM50',
                            d_code : 'z8diz8otlsmi',
                            d_type : '开关',
                            value : {
                                on : _pri.getRandomOn()
                            }
                        }, {
                            d_name : '拉拉牌温度计TT83',
                            d_code : '3bfswxhz7q2s',
                            d_type : '开关+显示1',
                            value : {
                                on : true,
                                value1 : _pri.getRandomT()
                            }
                        }]
                    }
                };

            };

            _pri["getRandomT"] = function() {
                var iNum = 1 + Math.floor(Math.random() * 20);
                return 5 + iNum;
            };

            _pri["getRandomOn"] = function() {
                var iNum = Math.random();
                return iNum > 0.5;
            };

            _init.apply(_pub, arguments);
            return _pub;
        };

        return _pub_static;
    }());
