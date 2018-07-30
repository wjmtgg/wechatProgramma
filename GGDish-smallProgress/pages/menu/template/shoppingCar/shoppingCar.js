var app = getApp();
var Utils = require('../../../../utils/util.js');
var constants = require('../../../../utils/constants.js');
var qnRequest = require('../../../../utils/request.js');
function shoppingCarInit(){
    let pages = getCurrentPages();
    let curPage = pages[pages.length - 1];

    //点击“选好了” 展示购物车
    curPage.getReady = function(event){

        if(this.data.menu.shoppingCart.totalNum && !this.data.menu.showShoppingCar){
            this.setData({'menu.shoppingCarAnamation':true});
            this.setData({'menu.showShoppingCar':true}); 
        }else if(this.data.menu.showShoppingCar){
            // 确定
            // 构建请求参数
            var temp = Utils.deepCopy(this.data.menu.shoppingCart.addDishes);
            var dishList_chang = [];
            for(var orderId_chang in temp){
                let dishObj =  temp[orderId_chang];
                dishList_chang.push(dishObj);
            }
            var param = {
                submitWay : 1,
                entId : this.data.entId,//正式调用的时候使用界面data中的endId
                totalPrice : this.data.menu.shoppingCart.totalPrice,
                discount : 0,
                payPrice : this.data.menu.shoppingCart.totalPrice,
                orderType : 0,
                orderSource:4,
                memoryStatus : 0,
                deskNo : '',
                activityList : [],
                dishList : dishList_chang
            };
            
            this.saveDishShoppingRecordsParam = JSON.stringify(param);
            var that = this;

            var requestData = {
              orderData: that.saveDishShoppingRecordsParam
            };
            if (curPage.data.orderId){
               requestData.orderId =curPage.data.orderId;
      
            }
            qnRequest.request({
              url: constants.IP + constants.URL_SaveDishShoppingRecordes,
              data: requestData,
              method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              // header: {}, // 设置请求的 header
              success: function(res){
                console.log(res);
                if(res.data.returnCode == '00'){
                    console.log('提交菜品成功');
                    // 进入收银台页
                    // wx.navigateTo({url: '../order/commitOrder/commitOrder?shopId='+res.data.shopId})
                    /**
                     * 原微信公众号的业务逻辑 （进入选好提示页）-> （选好菜品页）-> （收银台页）
                     */
                    that.refreshOnGoingOrder();
                    wx.navigateTo({
                      url: '../order/selectedDishHint/selectedDishHint?shopId=' + res.data.shopId+'&entId='+that.data.entId,
                    })

                }else{
                    console.log('提交菜品失败');
                }
              },
              fail: function(res) {
                  console.log('购物车挂起失败---Fail');
                  console.log(res);
              },
              complete: function(res) {
                
              }
            })
        }
        else{
            //您还没有选择菜哦!
            this.onFullToast("请点菜");
        }
    },
    curPage.refreshOnGoingOrder=function(){
      let pages = getCurrentPages();
      for (var i = 0; i < pages.length; i++) {
        var page = pages[i];
        if (page.getPageName && page.getPageName() == 'home') {
          page.requestOnGoingOrder()
          break;
        }
      }
    },
    //隐藏购物车
    curPage.hintShoppingCart = function(e){
        
        this.setData({'menu.showShoppingCar':false})
        setTimeout(function() {
                this.setData({'menu.shoppingCarAnamation':false});
        }.bind(this), 300);
    },
    //清空购物车
    curPage.clearShoppingCar = function(event){
        app.getShoppingCarManager().clear();
        this.updateData();
        /**刷新界面位置控制数据 */
        this.calculateControlFrames();
        /** 收起购物车 */
        this.hintShoppingCart();
    }
}
module.exports = {
  shoppingCarInit : shoppingCarInit,
}