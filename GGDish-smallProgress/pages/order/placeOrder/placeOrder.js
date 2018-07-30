var app = getApp();
var qnRequest = require('../../../utils/request.js');
var constants = require('../../../utils/constants.js');
var qnLoading = require('../../component/qnLoading/qnLoading.js');
Page({
    data:{
        partOforderId:'2445',
        orderState:1,//1下单成功
        takeOrderTip : '6道菜 2份主食 2份餐具假的',
        consumPrice : 15000,
        actualPayPrice: 15000,
        // consumPhoneNumber : '183-3361-8118',
        takeOrderTime : '17:19',
        isShowReceiveWindow:false,
        returnTicketTip : '恭喜你获得2张20元代金券',
        getTicketPhoneNumber : '优惠券已存入账户:136****4652',
        receivePhoneNumber : '',
        returnTickets : [
            // {
            //      content : '30天内有效',
            //      ticketKind : 1,//1 代金券
            //      effectZone : '2015-9-25至2015-10-30',
            //      returnPrice : 2000,
            //      num : 2
            // },
            // {
            //      content : '30天内有效',
            //      ticketKind : 1,//2 折扣券
            //      effectZone : '2015-9-25至2015-10-30',
            //      returnPrice : 850,
            //      num : 3
            // },
            // {
            //      content : '30天内有效',
            //      ticketKind : 1,//2 折扣券
            //      effectZone : '2015-9-25至2015-10-30',
            //      returnPrice : 2000,
            //      num : 2
            // },
        ],
    },
    onLoad : function(options) {
        qnLoading.loading();
        this.setData({
            orderId : options.orderId,
            payId : options.payId,
            entId: options.entId
        });
        /**支付信息反馈 */
        this.returnRemoteServer();

      
      
    },
    returnRemoteServer:function(){
      var that = this;
      wx.request({
        url: constants.IP + constants.URL_QueryPrepayResult,
        data: {
          businessId: that.data.payId,
        },
        success: function (res) {
          if (res.data.returnCode == "00") {
              that.initData();
          } else {
            // 非正常结束小牛动画
              console.log('下单成功页面反馈支付失败');

          }
          console.log(res);
        },
        fail: function (res) {
          console.log('下单成功页面反馈支付信息 - fail');
          console.log(res);
          that.qnLoading.loadError();
        },
        complete: function (res) {

        }
      });
    },
    // 请求数据
    initData : function(){
         var that = this;
         // 获取基本信息
         qnRequest.request({
            url: constants.IP + constants.URL_GetOrderBaseInfo,
            data: {
              orderId:that.data.orderId,
              payId:that.data.payId,
            },
            success:function(res){
                console.log('下单成功页 orderBaseInfo:    ' + res.data.orderInfo);
                if(res.data.returnCode == "00"){
                    that.qnLoading.hide();
                    // 正常结束小牛动画
                    that.setData({
                        orderInfo : res.data.orderInfo,
                    });
                    that.initOrderBaseInfo();
                    
                }else{
                    that.qnLoading.loadError();
                    // 非正常结束小牛动画
                    console.log('请求数据异常');

                }
                console.log(res);
            },
            fail:function(res){
                  console.log('下单成功页面baseInfo数据请求 - fail');
                  console.log(res);
                  that.qnLoading.loadError();
            },
            complete:function(res){
               
            }
        });
         

        //  获取返券信息

         wx.request({
            url: constants.IP + constants.URL_QuerySendReturnCoupon,
            data: {
              domainHacks:that.data.entId,
              paymentId:that.data.payId,
            },
            success:function(res){
                console.log(res);
                console.log('获取返券成功');
                if(res.data.returnCode == '00'){
                    // 正常结束小牛动画
                    that.setData({
                        returnCoupon : res.data.returnCoupon,
                    });
                    that.initReturnCoupon();
                
                }else{
                    // 非正常结束小牛动画
                }
            },
            fail:function(res){
                console.log('下单成功页面returnCoupon数据请求 - fail');
                console.log(res);
            },
            complete:function(res){
                console.log('complete');
            }
        });
//http://v.qncloud.cn/coupon/querySendReturnCoupon.action?paymentId=3c0410bf372f48bdb234e7c6e54fbbc8&addDish=0&domainHacks=1486720134048
       
       

    },
    getTicketPhoneNumber : function(phoneNumber){
        // 优惠券已存入账户:136****4652
        if(!phoneNumber) return;
        var phone= phoneNumber;
        return "优惠券已存入账户:" + phone.substr(0,3) + "****" + phone.substr(7,4);

    },
    getReturnTicketTip : function(returnCouponList){
        if(!returnCouponList) return;
        var str = '';
        for(var i =0 ;i < returnCouponList.length ; i++){
            let obj = returnCouponList[i];
            if (i == 0) {
               str +="恭喜您获得"+obj.num+"张"+obj.content/100+"元代金券";
            }else{
                str += ","+obj.num+"张"+obj.content/100+"元代金券";
            }
        }
        return str;
    },
    getShowTakeOrderTime : function(receiveOrderTime){
        var takeOrderTime = receiveOrderTime;
        return takeOrderTime.substr(11, 5);
    },
    getTakeOrderTip : function(orderInfo_chang){
        var arr=[];
        if (orderInfo_chang.dishNum) {
            arr.push(orderInfo_chang.dishNum +"道菜");
        }
        if(orderInfo_chang.stapleNum){
            arr.push(orderInfo_chang.stapleNum +"道主食");
        }else if(orderInfo_chang.tableware){
            arr.push(orderInfo_chang.tableware+"份餐具");
        }
        return arr.join(" ");
    },
    getShowPhone : function(userPhone) {
        if(!userPhone) return;
        var phone = userPhone;
        return phone.substr(0,3)+ "-" + phone.substr(3,4) +"-"+phone.substr(7,4); 
    },
    receivePhone : function(event){
        this.data.receivePhoneNumber = event.detail.value;
    },
    receiveCounpon :function(){

        // /coupon/receiveReturnCoupons.action
        var receivePhoneNumber = this.data.receivePhoneNumber;
        /**
         * 将手机请求接口 ，成功后刷新界面
         */
        app.toast();
        if(receivePhoneNumber.length < 11){
            this.Toast.showTip("号码有误，请确认");
            return;
        }
        this.data.receivePhoneNumber = receivePhoneNumber;
        var that = this;
        // 领券反馈
        wx.request({
            url: constants.IP + constants.URL_ReceiveReturnCoupons,
            data: {
               paymentId : that.data.payId,
               entId : that.data.entId ,
               phone : receivePhoneNumber
            },
            success:function(res){
               if(res.data.returnCode == '00'){
                    that.Toast.showTip("请求成功");
                    that.setData({
                        isShowReceiveWindow : false,
                        getTicketPhoneNumber : that.data.receivePhoneNumber
                    })
                }else{

                }
            },
            fail:function(res){
                  console.log('fail');
            },
            complete:function(res){
                console.log('complete');
            }
        });

        var phone_chang = this.getTicketPhoneNumber(receivePhoneNumber);
        this.setData({
            getTicketPhoneNumber :phone_chang,
            isShowReceiveWindow : false,
        });
        console.log('xxx');
    },
    initOrderBaseInfo : function(){
         var orderInfo_chang = this.data.orderInfo;
        
        var partOforder_temp = orderInfo_chang.orderId;
        var partOforderId_chang = partOforder_temp.substr(partOforder_temp.length-4);
        var orderState_chang = orderInfo_chang.orderStatus;
        var takeOrderTip_chang = this.getTakeOrderTip(orderInfo_chang);
        var consumPrice_chang = orderInfo_chang.originAmount;
        var actualPayPrice_chang = orderInfo_chang.payAmount;
        // var consumPhoneNumber_chang = this.getShowPhone(orderInfo_chang.userPhone);
        var consumPhoneNumber_chang = wx.getStorageSync('userPhone');
        var takeOrderTime_chang = this.getShowTakeOrderTime(orderInfo_chang.receiveOrderTime);
        this.setData({
            partOforderId : partOforderId_chang,
            orderState : orderState_chang,
            takeOrderTip : takeOrderTip_chang,
            consumPrice : consumPrice_chang,
            actualPayPrice : actualPayPrice_chang,
            consumPhoneNumber : consumPhoneNumber_chang,
            takeOrderTime : takeOrderTime_chang,
        });
    },
    initReturnCoupon : function(){

        var returnCoupon = this.data.returnCoupon;
        this.setData({
            returnCoupon : returnCoupon,
        })
        var isShowReceiveWindow_chang = returnCoupon.isHasPhone != 1;
        var returnTicketTip_chang = this.getReturnTicketTip(returnCoupon.returnCouponList);
        var getTicketPhoneNumber_chang = this.getTicketPhoneNumber(returnCoupon.phoneNumber);
        var returnTickets_chang = [];
        if (returnCoupon.returnCouponList && returnCoupon.returnCouponList.length){
            for(var i = 0 ; i <returnCoupon.returnCouponList.length;i++){
                let listObj = returnCoupon.returnCouponList[i];
                let cotent_chang =listObj.consumeAmountLimit? "满"+listObj.amount+"元可用" : "任意消费可用";
                let effectZone = listObj.startTime +"至"+ listObj.endTime;
                effectZone = effectZone.replace(/\./g,'-');
                let insertObj ={
                     content : cotent_chang,
                     ticketKind : 1,
                     effectZone : effectZone,
                     returnPrice : listObj.content,
                     num : listObj.num
                }
                returnTickets_chang.push(insertObj);
            }
        }
        this.setData({
            isShowReceiveWindow : isShowReceiveWindow_chang,
            returnTicketTip : returnTicketTip_chang,
            getTicketPhoneNumber : getTicketPhoneNumber_chang,
            returnTickets:returnTickets_chang,
        });
    } 

    

});