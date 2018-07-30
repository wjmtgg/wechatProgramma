// pages/login/login.js
// 验证手机号，绑定手机号
var app = getApp();
var constants = require('../../utils/constants.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      countDown:60,
      isCountDown:false,
      phone:0,
      code:0,
      isProtocalChecked:true,
      isVerifyBtnEnable:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      app.toast();
  },
  //输入手机号
  inputPhone:function(event){
      this.setData({
         phone: event.detail.value,
      });
      this.changeVerifyBtnEnable();
  },
  //输入验证码
  inputCode:function(event){
      this.setData({
          code: event.detail.value,
      });
      this.changeVerifyBtnEnable();
  },
  onFullToast: function (titleDes) {
      this.Toast.showTipAuto({ toastContent: titleDes, toastType: this.Toast.WARN_IMG_TYPE });
  },
  //点击获取验证码
  countDown:function(event){

      //检验手机号
      var phone = this.data.phone;
      if(!phone){
        this.onFullToast('请输入正确的手机号!');
        return;
      }
      if(this.data.isCountDown){
        return; //表示倒计时正在进行
      }
      this.getVerifyCode();

      this.setData({
          countDown:60,
          isCountDown:true,
      });
      var that = this;
      var id = setInterval(function(){
          if (that.data.countDown === 1){
              that.setData({
                  countDown: 60,
                  isCountDown: false,
              });
              clearInterval(that.intervalId);
          }else{
              that.setData({
                  countDown: that.data.countDown-1,
              });
          }
      }, 1000);
      this.intervalId = id;
      
  },
  //获取验证码
    getVerifyCode:function(){
        console.log("start____获取验证码");

        var that = this;
        wx.request({
            url: constants.IP + constants.URL_GetVerifyCode,
            data: { phoneNumber: that.data.phone, action:'11' },
            success:function(res){
              if (res.data.returnCode === constants.RETURN_OK){
                //成功
                console.log("success____获取验证码成功");
                console.log(res);
              }
            },
            fail:function(res){
                console.log("fail____获取验证码失败");
                console.log(res);
            }
        })
    },
    //验证
    verify:function(){
        console.log("start____验证");

        var that = this;

        wx.request({
            url: constants.IP + constants.URL_VerifyCode,
            data: { 
                phoneNumber: that.data.phone,
                code: that.data.code,
                action : '11',
                openId:app.getOpenId(),
            },
            success: function (res) {
                if (res.data.returnCode == 0) {
                    //成功
                    console.log("success____验证成功");
                    wx.setStorageSync("userPhone", that.data.phone);
                    wx.navigateBack({});
                
              }else{
                  wx.showModal({
                    title: '提示',
                    content: '验证码错误',
                    showCancel:false,
                  })
              }
              console.log(res);
            },
            fail: function (res) {
                console.log("fail____验证失败");
                console.log(res);
            }
        })
    },
  
    //用户协议checkbox
    protocalChecked:function(event){
        this.setData({
          isProtocalChecked:!this.data.isProtocalChecked,
        });
        this.changeVerifyBtnEnable();
    },
    //用户协议
    protocalClicked:function(event){
        wx.navigateTo({
          url: './agreement/agreement',
        })
    },
    changeVerifyBtnEnable:function(){
        var phone = this.data.phone;
        var code = this.data.code;
        var isProtocalChecked = this.data.isProtocalChecked;

        if (isProtocalChecked && phone && code){
            this.setData({
                isVerifyBtnEnable:true,
            });
        }else{
            this.setData({
                isVerifyBtnEnable: false,
            });
        }
    }

})