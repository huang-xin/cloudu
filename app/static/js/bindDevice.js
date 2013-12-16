/**
 * @author yanshasha
 */
$('#openPopboxBtn').on('click', function() {
    if ($('.open-popbox-btn').hasClass('show')) {
        closeBindPop();
    } else {
        openBindPop();
    }
});
$('.bind-device-popbox .bind-btn').on('click', function() {
    var cloudId = $('#cloudIdInput').val(), myUI = CLOUDU();
    if (cloudId) {
        myUI.push('bindingCloudId', {
            cloudId : cloudId
        }, function(oResp) {
            if (oResp.errno == 0) {
                var listStr = "", device = oResp.data, dCode = device.deviceCode, dName = $('#deviceNameInput').val() ? $('#deviceNameInput').val() : device.deviceName;
                listStr += '<a href="' + dCode + '.html" class="device-item"><div class="tile">';
                listStr += '<img src="' + device.deviceLogo + '" alt="' + dName + '" class="tile-image"/>';
                listStr += '<h3 class="tile-title">' + dName + '</h3>';
                listStr += '</div></a>';
                var $newdevice = $(listStr);
                if (device.infoName == "switch") {
                    var sw = new Switch($newdevice.find('.tile'), function() {
                        $newdevice.removeClass('inactive');
                    }, function() {
                        $newdevice.addClass('inactive');
                    });
                    sw.setStatus(device.infoValue)
                } else {
                    $newdevice.find('.tile').append('<div>' + device.infoValue + '</div>');
                }
                $('#deviceList').append($newdevice);
                closeBindPop();
            } else {
                $('.bind-device-popbox .error').text('绑定失败，请检查网络或者云联ID是否输入正确');
                $('#cloudIdInput').addClass('error');
            }

        });
    } else {
        $('.bind-device-popbox .error').text('请输入云联ID');
        $('#cloudIdInput').addClass('error').focus();
    }

    // if (cloudId) {
    // if ( typeof cloudu.deviceList[cloudId] != "undefined") {
    // var listStr = "", device = cloudu.deviceList[cloudId], pagename = device.pageName, devicename = $('#deviceNameInput').val() ? $('#deviceNameInput').val() : device.deviceName;
    // listStr += '<a href="' + pagename + '.html" class="device-item"><div class="tile">';
    // listStr += '<span title="' + devicename + '" class="tile-image i' + pagename + '"></span>';
    // listStr += '<h3 class="tile-title">' + devicename + '</h3>';
    // listStr += '</div></a>';
    // var $newdevice = $(listStr);
    // if (device.infoName == "switch") {
    // var sw = new Switch($newdevice.find('.tile'), function() {
    // $newdevice.removeClass('inactive');
    // }, function() {
    // $newdevice.addClass('inactive');
    // });
    // sw.setStatus(device.infoValue)
    // } else {
    // $newdevice.find('.tile').append('<div>' + device.infoValue + '</div>');
    // }
    // $('#deviceList').append($newdevice);
    // closeBindPop();
    // } else {
    // //$('.bind-device-popbox .error').text('云联ID输入错误');
    // $('#cloudIdInput').addClass('error');
    // }
    // } else {
    // //$('.bind-device-popbox .error').text('请输入云联ID');
    // $('#cloudIdInput').focus();
    // $('#cloudIdInput').addClass('error');
    // }
});
$('.bind-device-popbox .cancel-btn').on('click', function() {
    closeBindPop();
});
$('#cloudIdInput').on('keypress', function() {
    $(this).removeClass('error');
})
var openBindPop = function() {
    $('.open-popbox-btn').addClass('show');
    $('.bind-device-popbox').show();
    cloudu.setMask({
        opacity : 0.5
    });
}
var closeBindPop = function() {
    $('.open-popbox-btn').removeClass('show');
    $('.bind-device-popbox').hide();
    cloudu.hideMask();
}
