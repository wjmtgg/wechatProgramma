// pages/main/home/home.js
var common = require('./common/common.js');
var util = require('../../../utils/util.js');
var qnLocation = require('../../../utils/map');
var qnRequest = require('../../../utils/request.js');
var constants = require('../../../utils/constants.js');
var getOpenId = require('../../../utils/getOpenId.js');
var qnLoading = require('../../component/qnLoading/qnLoading.js')
var app = getApp();
Page({
  data:{
    showEntScreenView:false,
    showMoreDes: true,
    showloadDes: false,
    loadDes: '加载中...',
    showLocationFail:true,
    smallerDistance:'<100米',
    home:{
      // onGoingOrder: {
      //   // entId: '11111',
      //   logo: 'sss',
      //   orderId: '订单号:9213',
      //   entName: '青牛饭店',
      //   orderInfo: '11道菜 5份主食 3份餐具',
      //   payMoney: 0,
      //   totalPrice: 35600,
      //   dishInfo: '红烧肉 麻婆豆腐 芋头泡饼 剁椒鸡蛋 三线米西 啤酒炸鸡',
      //   isSeat: 1,
      //   orderStatus: '等待下单',//订单状态  0 未下单 / 1未就餐[未入座] / 2就餐中 【正在进行中的订单只有这三种状态】
      // },
      takeOrderIconDes: [
        '家常菜',
        '小吃快餐',
        '火锅',
        '烧烤',
        '自助餐',
        '海鲜',
        '清真',
        '西餐'
      ],
      isShowPreferentialView: false,//优惠view
      shopList: [
        // {
        //   logo: 'sss',
        //   shopName: '鸿运天外天烤鸭店',
        //   addressAndFeaturesDish: '西钓鱼台 北京菜',
       
        //   couponMaterialList: [
        //     {
        //       "content": "满1元返1元",    
        //       "couponType": "3",//3返券 、 2满减 、1折扣  /** 「0折／1返券／2每满减 」 */
        //     },
        //     {
        //       "content": "满10元减2元",
        //       "couponType": "2",
        //     },
        //     {
        //       "content": "满2元打1折",
        //       "couponType": "1",
        //     }],
        //   recentConsume: '2天前关顾',
        //   isCollection: true,
        //   distance: 900,//单位为m
        //   entId: '1480484337783'
        // },
        // {
        //   logo: 'ssss',
        //   shopName: '福义轩',
        //   addressAndFeaturesDish: '西钓鱼台 北京菜',
    
        //   recentConsume: '3天前光顾过',
        //   isCollection: true,
        //   distance: 1100,//单位为m
        //   entId: '1480484337900'
        // },
        // {
        //   logo: 'sss',
        //   shopName: '重庆美食',
        //   addressAndFeaturesDish: '航天桥 川菜',
         
        //   recentConsume: '人均 ￥87元',
        //   isCollection: false,
        //   distance: 1500,//单位为m
        //   entId: '1480484331000'
        // }
      ],
    },

    // 远程JSON源数据
    entList:[
      {
        "entId": "1a1a66",
        "entName": "c123",
        "entLogo": "resource/image/defaultPic/logoDF.png",
        "industyName": "北京菜",
        "distance": 5431,
        "privilegeMsg": "",
        "collectionStatus": 0,
        "address": "裕惠大厦",
        "recentConsume": ""
      },
      {
        "entId": "1480484337783",
        "entName": "冰糖sherly2",
        "entLogo": "resource/image/defaultPic/logoDF.png",
        "industyName": "北京菜",
        "distance": 5431,
        "type": "10",
        "privilegeMsg": "每满10元减9.99元",
        "collectionStatus": 1,
        "address": "惠大厦",
        "couponMaterialList": [
          {
            "amount": 1,
            "availableEndTime": "15:00",
            "availableStartTime": "10:00",
            "channelStr": "",
            "className": "CouponMaterial",
            "consumeAmountLimit": 1,
            "content": "满1元返1元",
            "couponDetail": "1",
            "couponId": "33aeed48e2644a98a2678f24fb9e76ca",
            "couponSourceFlag": "1",
            "couponStatus": "2",
            "couponTrade": "",
            "couponType": "3",
            "createTime": "2016-11-30 17:48:52",
            "discountStr": "0.01",
            "editTime": "",
            "endDate": "",
            "entAddress": "",
            "entId": "1480484337783",
            "entityDescription": "",
            "entName": "",
            "id": "ff80808158b4003b0158b4a305550001",
            "imgPath": "resource/image/common/backkey.png",
            "intro": "",
            "isHolidayUse": 1,
            "isWeekendUse": 1,
            "landmark": "",
            "moneyStr": "0.01",
            "objectDescription": "",
            "objectID": "",
            "objectName": "couponMaterial",
            "operator": "",
            "privilegeId": "",
            "privilegeType": "2",
            "publishStatus": "1",
            "showMicroweb": 0,
            "startDate": "",
            "timeType": 1,
            "title": "1元代金券",
            "top": 1,
            "url": ""
          },
          {
            "amount": 2,
            "availableEndTime": "15:00",
            "availableStartTime": "10:00",
            "channelStr": "",
            "className": "CouponMaterial",
            "consumeAmountLimit": 0,
            "content": "满2元返5元",
            "couponDetail": "5",
            "couponId": "8d6421d1fff1477ca53b314516d0e53c",
            "couponSourceFlag": "1",
            "couponStatus": "2",
            "couponTrade": "",
            "couponType": "3",
            "createTime": "2016-11-30 17:48:52",
            "discountStr": "0.05",
            "editTime": "",
            "endDate": "",
            "entAddress": "",
            "entId": "1480484337783",
            "entityDescription": "",
            "entName": "",
            "id": "ff80808158b4003b0158b4a305590002",
            "imgPath": "resource/image/common/backkey.png",
            "intro": "",
            "isHolidayUse": 1,
            "isWeekendUse": 1,
            "landmark": "",
            "moneyStr": "0.02",
            "objectDescription": "",
            "objectID": null,
            "objectName": "couponMaterial",
            "operator": "",
            "privilegeId": "",
            "privilegeType": "1",
            "publishStatus": "1",
            "showMicroweb": 0,
            "startDate": "",
            "timeType": 1,
            "title": "5元代金券",
            "top": 1,
            "url": ""
          }
        ],
        "recentConsume": "光过8次"
      },
      {
        "entId": "1a1ac",
        "entName": "c123",
        "entLogo": "resource/image/defaultPic/logoDF.png",
        "industyName": "北京菜",
        "distance": 5431,
        "privilegeMsg": "",
        "collectionStatus": 0,
        "address": "裕惠大厦",
        "recentConsume": ""
      }
      ],
    // "longitude": "116.3293",
    // "latitude": "39.96383",
     
    //  onGoingOrderInfo:{
    //    orderId:'wangwz',
    //  },
     page:1,
     indexOrder: {
      //  "shopId": "1494249682389850",
      //  "orderId": "1494249682389850",
      //  "totalPrice": 288800,
      //  "specialDiscount": 287800,
      //  "entId": "1483669756662",
      //  "orderStatus": "100",
      //  "dishName": "健康套餐 ",
      //  "dishNum": 1,
      //  "tableNum": 0,
      //  "stapleFoodNum": 0,
      //  "entName": "缤纷小镇（假订单）",
      //  "domainHacks": "colorful",
      //  "entImage": "resource/image/defaultPic/logoDF.png"
     }
  },
  onLoad:function(options){
    console.log('页面初始化');
    common.setUpScreenData();

    // 页面初始化 options为页面跳转所带来的参数
    common.setUpEntListData();
    qnLoading.loading();
    
    qnLocation.QnMap();
    
    this.Map.autoLocation(this.initData);
    this.setUpConstants();
    // wx.getStorageSync('openId');
  
    // this.initData();
    
  },
  /**
   * 请求数据
   */
  initData:function(){
    this.requestEntListInfo(true);
    
    this.requestPopEnt();
  },
  requestOnGoingOrder:function(){
    var that = this;
    qnRequest.request({
      
      url: constants.IP + constants.URL_QueryIndexOrder,
      data: {
        
      },
      success: function (res) {

        if (res.data.returnCode == "00") {
          // 正常结束小牛动画
          // res.data = that.data.indexOrder;//构建假数据
          that.setUpOnGoingOrder(res.data);

          console.log('查询首页正在进行中的订单成功');
        } else {
          // 非正常结束小牛动画
          console.log('查询首页正在进行中的订单失败');

        }
        console.log(res);
      },
      fail: function (res) {
        console.log('查询首页正在进行中的订单数据请求 - fail');
        console.log(res);
      },
      complete: function (res) {

      }
    });
  },
  setUpOnGoingOrder:function(data){

      var indexOrder_chang = data.orderInfo;
      this.setData({ indexOrder: data.orderInfo})
      if (!indexOrder_chang) {
        this.setData({
          'home.onGoingOrder': null,
          onGoingOrderInfo: null
        })
        return;
      }
      /**
       * 构建界面正在进行中的订单
       */
      var onGoingOrder_chang = {};
      onGoingOrder_chang.logo = constants.IP + indexOrder_chang.entImage;
      onGoingOrder_chang.orderId = "订单号：" + data.orderInfo.orderNo;
      onGoingOrder_chang.entName =indexOrder_chang.entName;
      var orderInfo_chang = "";
      if (indexOrder_chang.dishNum > 0) orderInfo_chang += indexOrder_chang.dishNum+"道菜 ";
      if (indexOrder_chang.stapleNum > 0) orderInfo_chang += indexOrder_chang.stapleNum + "份主食 ";
      if (indexOrder_chang.tableWare > 0) orderInfo_chang += indexOrder_chang.tableWare +"份餐位 ";
      if (indexOrder_chang.tableNum > 0) orderInfo_chang += indexOrder_chang.tableNum + "份餐具";
      onGoingOrder_chang.orderInfo =orderInfo_chang;
      onGoingOrder_chang.orderStatus = this.getOrderStatus(indexOrder_chang.orderStatus, indexOrder_chang.submitWay);
      onGoingOrder_chang.payMoney = indexOrder_chang.totalPrice - indexOrder_chang.specialDiscount;
      onGoingOrder_chang.totalPrice = indexOrder_chang.totalPrice;
      onGoingOrder_chang.payPrice = data.orderInfo.payPrice;
      /**
       * 假数据
       */
      onGoingOrder_chang.dishInfo = indexOrder_chang.dishName;
      this.setData({
        'home.onGoingOrder': onGoingOrder_chang,
        onGoingOrderInfo: data.orderInfo
      })
  },
  getOrderStatus: function (orderStatus, submitWay) {
      this.setData({ isSeat: false })
      var formatStr = '';
      if (0 == orderStatus) {
        formatStr = submitWay == '3' ? "等待下单" : "未下单";
      } else if (1 == orderStatus) {
        formatStr = "未就餐";
      } else if (2 == orderStatus) {
        formatStr = "就餐中";
        this.setData({isSeat:true})
      } else if ('100' == orderStatus){//这个时候的扫码入座调用shopId 
        formatStr = "等待下单";
      }
      return formatStr;
  },
  requestPopEnt:function(){
    // 
    var that = this;
   
    wx.request({
      url: constants.IP + constants.URL_QueryMostPopEnt,
      data: {
        longitude: that.data.longitude,//维度
        latitude: that.data.latitude,//纬度
        // longitude: '116.33956436939',
        // latitude: '39.972183867663',
      },
      success: function (res) {
        
        if (res.data.returnCode == "00") {
          // 正常结束小牛动画
          if(res.data.entInfo){
            var hottestEnt = "@"+res.data.entInfo.name+"("+res.data.entInfo.address+")";
            that.setData({
              hottestEnt: hottestEnt,
              entInfo: res.data.entInfo
            })
          }
          console.log('查询最热商铺成功');
        } else {
          // 非正常结束小牛动画
          console.log('查询最热商铺失败');

        }
        console.log(res);
      },
      fail: function (res) {
        console.log('查询最热商铺数据请求 - fail');
        console.log(res);
      },
      complete: function (res) {
        
      }
    });
  },
  /**
   * 首页8个筛选的图标宽度进行适配，
   * 获取适合的宽高
   */
  setUpConstants:function(){
      var res = wx.getSystemInfoSync(); 
      // var containerH=res.windowHeight;
      var containerW = res.windowWidth;
      var scale = 750 / containerW;
      var takeOrderIconW_chang = (containerW - (48 * 4) - (15 * 2 / scale)) / (4 * 2);
      this.setData({ takeOrderIconW : takeOrderIconW_chang});
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    this.requestOnGoingOrder();
    
    var lat = wx.getStorageSync('latitude');
    var lng = wx.getStorageSync('longitude');
    var location = wx.getStorageSync('locationRegion');
    console.log('home首页将要显示')
    console.log('lat : ' + lat + ' lng: ' + lng + ' location: ' + location);
    if(!lat || !lng) return;
    if (lat == this.data.latitude && lng == this.data.longitude) return;
    console.log('home首页经纬度将要设置')

    // 页面显示
    this.setData({
      showLocationFail: false,
      latitude: wx.getStorageSync('latitude'),
      longitude: wx.getStorageSync('longitude'),
      address: wx.getStorageSync('locationRegion')
    });
    /**
     * 当前经纬度更改
     * 重新加载商铺列表
     */
    this.initData();

  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  errorImg:function(event){
      if (event.currentTarget.dataset.entlogo){
        this.setData({
          'home.onGoingOrder.logo': '../../../image/noImgForSmallModel.png',
        });  
        return;
      }
      var shop_index = event.currentTarget.dataset.tapShopIndex;
      var shopList_chang = this.data.home.shopList;
      shopList_chang[shop_index].logo = '../../../image/noImgForSmallModel.png';
      this.setData({
          'home.shopList' : shopList_chang
      });
  },
  /**
   * 下拉
   */
  onPullDownRefresh: function () {
      console.log('下拉');
      this.setData({page:1});
      this.requestEntListInfo(true);
      this.requestOnGoingOrder();
  }, 
  onReachBottom: function(){
      this.data.page ++;
      this.setData({ page: this.data.page})
      // 开启动画
      this.setData({
        showMoreDes: false,
        showloadDes: true
      });
      this.requestEntListInfo(false);
  },

  toLocation :function(){
      var that=this;
      wx.navigateTo({
        url: '../../chooseLocation/chooseLocation?address='+this.data.address,
        success: function(res){
            console.log('跳转chooseLocation成功');
        },
        fail: function(res) {
          // fail
          console.log('跳转chooseLocation失败');
        },
        complete: function(res) {
          
        }
      })
  },
 
  
  toDishDetail:function(e){
    var orderId = this.data.onGoingOrderInfo.orderId;
    var shopId = this.data.onGoingOrderInfo.shopId;
    if(!orderId || !orderId.length){console.log('orderId不正确：'+orderId)};
    /**
     * 公众号下单流程
     */
    if (this.data.onGoingOrderInfo.orderStatus == '100'){
      wx.navigateTo({
        url: '../../order/selectedDishDetail/selectedDishDetail?shopId=' + shopId + '&entId=' + this.data.onGoingOrderInfo.entId,
      })
    } else{
        wx.navigateTo({
          url: '../../order/orderDetail/orderDetail?orderId=' + orderId,
        })
    }
    
    
  },
  /**
   * 点击筛选一级级选项 或者二级选项业态筛选
   */
  querySort:function(e){
      console.log('查询排序');
      var selectIndex = e.currentTarget.dataset.querytype;
      var showQueryToast = e.currentTarget.dataset.showquerytoast;
      var toScreenVC = e.currentTarget.dataset.toscreenvc;
      if (showQueryToast){
        this.setData({ showToastBg: true, selectIndex: selectIndex, showEntScreenView :true});
        
      } else if (toScreenVC){
        var subIndex = e.currentTarget.dataset.subindex;
        wx.navigateTo({
          url: '../home/querySort?selectIndex=' + selectIndex + '&subIndex=' + subIndex,
        })
      } else if (selectIndex !== 'undefined' && selectIndex != this.data.selectIndex){
        this.setData({ selectIndex: selectIndex})
      }
  },
  closeBg: function () {
    this.setData({ showToastBg: false, showEntScreenView: false})
  },
  /**
   *  点击一级筛选下展开选项
   */
  tapOption: function (e) {
    this.closeBg();
    var selectIndex = e.currentTarget.dataset.tapIndex;
    var subIndex = e.currentTarget.dataset.tapSubindex;
    /**
     * 跳页
     */
    // wx.navigateTo({
    //   url: '../home/querySort?selectIndex=' + selectIndex + '&subIndex=' + subIndex,
    // })
    /**
     * 本页筛选
     */
    if (subIndex != 'undefined') {//选中的是 二级筛选条
      var sortZone_chang = this.data.sortZone;
      sortZone_chang[selectIndex].subIndex = subIndex;

      if (selectIndex == 0) {//第一个分区 
        sortZone_chang[selectIndex].optionName = this.data.allQuery[subIndex].optionName;
        this.setData({ industryId: this.data.allQuery[subIndex].optionId })

      }
      else if (selectIndex == 1) {//第二个分区
        sortZone_chang[selectIndex].optionName = this.data.smartSort[subIndex];
        this.setData({ sortType: subIndex})
      }
      else {//第三个分区
        sortZone_chang[selectIndex].optionName = this.data.screening[subIndex];
        this.setData({ privilege: subIndex })
      }
  
    }
    this.setData({ sortZone: sortZone_chang})

    
    this.requestEntListInfo(true);

  },
  reloadData:function(){
      console.log('重新加载');
      this.qnLoading.show();
      this.initData();
  },
  toQueryEnt:function(e){
    wx.navigateTo({
      url: './queryEnt',
    })
  },
  getPageName:function(){
    return "home";
  },
  //扫码入座
  scanToSeat: function () {
    var that = this;
    if (this.data.onGoingOrderInfo.orderStatus === 0){
       wx.navigateTo({
         url: '../../order/commitOrder/commitOrder?shopId=' + this.data.onGoingOrderInfo.orderId,
       })
    } else if (this.data.onGoingOrderInfo.orderStatus === 1 || this.data.onGoingOrderInfo.orderStatus == '100'){
        wx.scanCode({

          success: function (res) {
            // success
            console.log(res);
            var resourceId = util.urlSearch(res.result, 'deskNum');
            console.log(resourceId);

            that.getDeskInfo(resourceId);
          },
          fail: function (res) {
            // 扫码失败
            console.log(res);
          },
          complete: function (res) {
            // complete

          }
        })
    }
   
   

  },
  //获取桌位信息
  getDeskInfo: function (resourceId) {
    var that = this;
    wx.request({
      url: constants.IP + constants.URL_GetDeskInfoById,
      data: {
        entId:that.data.onGoingOrderInfo.entId,
        resourceId: resourceId,
      },
      success: function (res) {
        //获取 桌位类型  桌位号
        var deskType = res.data.deskType;
        var deskNo = res.data.deskNumber;
        
        if (res.data.returnCode === constants.RETURN_OK) {

          console.log('获取桌位信息__成功');
          console.log(res);
          if (that.data.onGoingOrderInfo.entId === res.data.entId) {

            if (deskType && deskNo) {

              if (deskType === "包间" || deskType === "1") {
                that.userArrive(resourceId,"1", deskNo);
              } else if (deskType == "散台" || deskType === "2") {
                that.userArrive(resourceId,"2", deskNo);
              }

            } else if (!deskType && !deskNo) {
              that.userArrive(resourceId,"", "");
            }

          } else {
            console.log("二维码错误!");

          }

        } else {
          console.log('获取桌位信息失败');
          console.log(res);
        }

      },
      fail: function (res) {
        //获取桌位信息失败
        console.log('获取桌位信息失败');
        console.log(res);
      },
    })
  },
  //调用入座接口
  userArrive: function (resourceId,deskType, deskNo) {
    var that = this;
    console.log('start__开始执行入座');
    var deskInfo = that.getDeskInfoToShow(deskType, deskNo);
    wx.request({
      url: constants.IP + (that.data.onGoingOrderInfo.orderStatus == '100' ? constants.URL_SetOrderDeskInfo : constants.URL_UserArrived),
      data: {
        orderId: that.data.onGoingOrderInfo.orderId,
        shopId: that.data.onGoingOrderInfo.shopId,
        deskType: deskType,
        deskNo: deskNo,
      },
      success: function (res) {
        //入座成功 刷新数据
        if (res.data.returnCode === constants.RETURN_OK) {
          that.requestOnGoingOrder();
          console.log('入座__成功');
          that.setData({isSeat:true})
          if(that.data.onGoingOrderInfo.orderStatus == '100'){//公众号的流程
              wx.navigateTo({
                url: '../../order/commitOrder/commitOrder?shopId=' + that.data.onGoingOrderInfo.shopId + "&deskNo=" + resourceId + "&deskInfo=" + deskInfo,
              })
          }

          console.log(res);
        } else {
          //入座失败
          console.log('入座__失败');
          console.log(res);
        }
      },
      fail: function (res) {
        //失败
        console.log('入座__fail()');
        console.log(res);
      }

    });

  },

  getDeskInfoToShow: function (deskType, deskNo){
    var deskInfo = '';
    if (deskType ==1){
      deskInfo = "包间" + deskNo; //包间
    } else if (deskType == 2){
      deskInfo= "" + deskNo; //大厅
    }
    return deskInfo;
  },

  toHotEnt:function(){
    wx.navigateTo({
      url: '../../menu/menu?entId='+this.data.entInfo.entId,
    })
  },

  /**
   * 查询商铺
   */
  searchEnt:function(e){
    var entName = e.detail.value;
    this.setData({ searchValue: entName })
    this.requestEntListInfo(true)
  },
  reset: function (e) {
    this.setData({ searchValue: '' })
    this.requestEntListInfo(true);
  },
  doNothingForCatch:function(e){return}

})