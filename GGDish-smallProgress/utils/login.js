var utils = require('./util');
var constants = require('./constants');
var Session = require('./session');

/***
 * @class
 * 表示登录过程中发生的异常
 */
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

/**
 * 微信登录，获取 code 和 encryptData
 */
var getWxLoginResult = function getLoginCode(callback) {
    wx.login({
        success: function (loginResult) {
            // console.log('获取openId的准备____code');
            // console.log(loginResult);
            wx.getUserInfo({
                success: function (userResult) {
                    // console.log('获取openId的准备____userInfo');
                    // console.log(userResult);
                    callback(null, {
                        code: loginResult.code,
                        encryptedData: userResult.encryptedData,
                        iv: userResult.iv,
                        userInfo: userResult.userInfo,
                    });
                    

                },

                fail: function (userError) {
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

var noop = function noop() {};
var defaultOptions = {
    method: 'GET',
    success: noop,
    fail: noop,
    loginUrl: constants.IP + constants.URL_GetOpenId,
};

/**
 * @method
 * @param {Function} options.success(userInfo) 登录成功后的回调函数，参数 userInfo 微信用户信息
 * @param {Function} options.fail(error) 登录失败后的回调函数，参数 error 错误信息
 */
var login = function login(options) {
    options = utils.extend({}, defaultOptions, options);

    getWxLoginResult(function (wxLoginError, wxLoginResult) {
        if (wxLoginError) { //获取code 和 userInfo 失败了
            // console.log('获取code 和 userInfo 失败了');
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

        console.log('获取openId______start');
        wx.request({
            url: options.loginUrl,
            header: header,
            method: options.method,
            data: options.data,

            success: function (result) {
                var data = result.data;
                if (data && data.returnCode==="00") {
                    console.log('获取openId______success');
                     console.log(data);
                    wx.setStorageSync('openId', data.openId);
                    options.success(data);
                } else {
                    console.log('获取openId______fail');
                    options.fail(data);
                }
            },

            // 响应错误
            fail: function (loginResponseError) {
                console.log('获取openId______fail');
                options.fail(loginResponseError);
            },
        });
    });
};

module.exports = {
   
    login: login,
   
};