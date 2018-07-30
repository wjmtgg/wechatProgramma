var utils = require('./util');
var constants = require('./constants');

var LoginError = (function () {
    function LoginError(type, message) {
        Error.call(this, message);
        this.type = type;
        this.message = message;
    }

    LoginError.prototype = new Error();
    LoginError.prototype.constructor = LoginError;

    return LoginError;
})();
var getWxLoginResult = function getLoginCode(callback) {
    wx.login({
        success: function (loginResult) {
            console.log(loginResult);
            wx.getUserInfo({
                success: function (userResult) {
                    console.log(userResult);
                    callback(null, {
                        code: loginResult.code,
                        encryptedData: userResult.encryptedData,
                        iv: userResult.iv,
                        userInfo: userResult.userInfo,
                    });
                },

                fail: function (userError) {
                    console.log(userError);
                    var error = new LoginError(constants.ERR_WX_GET_USER_INFO, '获取微信用户信息失败，请检查网络状态');
                    error.detail = userError;
                    callback(error, null);
                },
            });
        },

        fail: function (loginError) {
            var error = new LoginError(constants.ERR_WX_LOGIN_FAILED, '微信登录失败，请检查网络状态');
            error.detail = loginError;
            callback(error, null);
        },
    });
};

var defaultOptions = {
    method: 'GET',
    loginUrl: 'https://order2.m.qncloud.cn/mina/order/wxMinaGetOpenId.action',
};
var login = function login(options) {
    options = utils.extend({}, defaultOptions, options);

    if (!options.loginUrl) {//!defaultOptions.loginUrl
        options.fail(new LoginError(constants.ERR_INVALID_PARAMS, '登录错误：缺少登录地址，请通过 setLoginUrl() 方法设置登录地址'));
        return;
    }
    // 
     getWxLoginResult(function (wxLoginError, wxLoginResult) {
        if (wxLoginError) {
            options.fail(wxLoginError);
            return;
        }
        
        var userInfo = wxLoginResult.userInfo;

        // 构造请求头，包含 code、encryptedData 和 iv
        var code = wxLoginResult.code;
        var encryptedData = wxLoginResult.encryptedData;
        var iv = wxLoginResult.iv;
        var header = {};
        // options.data={"code":code};
        header[constants.WX_HEADER_CODE] = code;
        header[constants.WX_HEADER_ENCRYPTED_DATA] = encryptedData;
        header[constants.WX_HEADER_IV] = iv;

        // 请求服务器登录地址，获得会话信息
        wx.request({
            url: options.loginUrl,
            header: header,
            method: options.method,
            data: options.data,

            success: function (result) {
                var data = result.data;
                console.log('获取session');
                console.log(data);
                // 成功地响应会话信息
                if (data && data.returnCode==="00") {//  if (data && data[constants.WX_SESSION_MAGIC_ID]) {
                    if (data.session) {
                        // console.log('openId'+ data.openId);
                        wx.setStorageSync('openId', data.openId);

                        // var id = wx.getStorageSync('openId')
                        // console.log('id'+ id);
                        wx.setStorageSync('openId', data.openId)
                        options.success(userInfo);
                    } else {
                        var errorMessage = '登录失败(' + data.error + ')：' + (data.message || '未知错误');
                        var noSessionError = new LoginError(constants.ERR_LOGIN_SESSION_NOT_RECEIVED, errorMessage);
                        options.fail(noSessionError);
                    }

                // 没有正确响应会话信息
                } else {
                    var errorMessage = '登录请求没有包含会话响应，请确保服务器处理 `' + options.loginUrl + '` 的时候正确使用了 SDK 输出登录结果';
                    var noSessionError = new LoginError(constants.ERR_LOGIN_SESSION_NOT_RECEIVED,errorMessage);
                    options.fail(noSessionError);
                }
            },

            // 响应错误
            fail: function (loginResponseError) {
                console.log('登录获取openId失败');
                console.log(loginResponseError);
                var error = new LoginError(constants.ERR_LOGIN_FAILED, '登录失败，可能是网络错误或者服务器发生异常');
                options.fail(error);
            },
        });
    });
};

module.exports = {
    login: login,
};