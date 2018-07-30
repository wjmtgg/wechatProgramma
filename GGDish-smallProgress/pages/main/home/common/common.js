var qnRequest = require('../../../../utils/request.js');
var constants = require('../../../../utils/constants.js');
var app = getApp();
var setUpEntListData = function(){
    let pages = getCurrentPages();
    let curPage = pages[pages.length - 1];
    /**
     * isClear 是否分页
     */ 
    curPage.requestEntListInfo = function(isClear) {
        var that = this;
        // console.log('openId: ' + wx.getStorageSync('openId'));
        console.log('请求home商铺列表');
        console.log('industryId : ' + this.data.industryId + ' sortType:' + this.data.sortType + ' privilege:' + this.data.privilege + ' searchValue:' + this.data.searchValue);

       

        qnRequest.request({

          url: constants.IP + constants.URL_QueryEntList,
          data: {
            longitude: wx.getStorageSync('longitude'),//维度
            latitude: wx.getStorageSync('latitude'),//纬度

            userId: app.getOpenId(),
            //userId: wx.getStorageSync('openId'),//用户Id
            page: that.data.page,//页数
            sortType: that.data.sortType || 0,//排序方式
            searchValue: that.data.searchValue || '',//搜索名
            industryId: that.data.industryId || '',//常态Id
            regionName: wx.getStorageSync('currentCity') || '北京市',//城市名
            privilege: that.data.privilege || -1,//优惠类型
            pageSize: 20
          },
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          method: 'POST',
          success: function (res) {
            if (res.data.returnCode == "00") {
              // 正常结束小牛动画
              console.log('商铺请求数据成功');
              
              that.getEntListData(res.data, isClear);
              if (isClear) that.qnLoading.hide();
            } else {
              // 非正常结束小牛动画
              console.log('商铺请求数据异常');
              if (isClear) that.qnLoading.loadError();
            }
            console.log(res);

          },
          fail: function (res) {
            console.log('商铺数据请求 - fail');
            console.log(res);
            if (isClear) that.qnLoading.loadError();
          },
          complete: function (res) {
            wx.stopPullDownRefresh();
          }
        });
    }
     /**
      * 构建界面数据
      */
    curPage.getEntListData=function (data, isClear) {

        var entList_chang = data.entList;
        /**
         * 构造 shopList
         */
        var shopList_chang = [];
        for (var i = 0; i < entList_chang.length; i++) {
          let entObj_chang = entList_chang[i];
          let shop_insert = {};
          shop_insert.shopName = entObj_chang.entName;
          shop_insert.addressAndFeaturesDish = entObj_chang.address.length ? entObj_chang.address + " " + entObj_chang.industyName : entObj_chang.industyName;
          shop_insert.recentConsume = entObj_chang.recentConsume;
          shop_insert.isCollection = entObj_chang.collectionStatus == 0 ? false : true;
          shop_insert.distance = entObj_chang.distance;
          shop_insert.entId = entObj_chang.entId;
          shop_insert.logo = constants.IP + entObj_chang.entLogo;
          /**
           * "content": "满1元返1元 /全天可用",
           *  "couponType": "1"「1返券／10每满减 /11 满减 /其它 折／」
           *  先将List拆分成4 个数组
           */
          shop_insert.couponMaterialList = [];
          if (entObj_chang.couponMaterialList && entObj_chang.couponMaterialList.length) {
            var returnTemp = [];//返券
            var couponTemp = [];//满减
            var everyCouponTemp = [];//每满减
            var discountTemp = [];//折扣

            for (var j = 0; j < entObj_chang.couponMaterialList.length; j++) {
              let couponObj = entObj_chang.couponMaterialList[j];

              /**
               *  后台的content不一定回返，添加一个privilegeDes描述字段自己拼接
               *  consumeAmountLimit
               *  couponDetail
               */
              if (couponObj.privilegeType == 11) {//满减
                couponObj.privilegeDes = '满' + couponObj.consumeAmountLimit / 100 + '元减' + couponObj.couponDetail / 100 + '元';
                couponTemp.push(couponObj);
              } else if (couponObj.privilegeType == 1) {//返券
                couponObj.privilegeDes = '满' + couponObj.moneyStr + '元返' + couponObj.couponDetail / 100 + '元';
                returnTemp.push(couponObj);
              } else if (couponObj.privilegeType == 10) {//每满减
                couponObj.privilegeDes = '每满' + couponObj.consumeAmountLimit / 100 + '元减' + couponObj.couponDetail / 100 + '元';
                everyCouponTemp.push(couponObj);
              } else {//折扣
                couponObj.privilegeDes = '满' + couponObj.consumeAmountLimit / 100 + '元打' + couponObj.couponDetail / 100 + '折';
                discountTemp.push(couponObj);
              }

            }
            /**
                 * 处理界面渲染数据
                 */

            let coupon_insert = this.getJoiningContent(couponTemp);
            let everyCoupon_insert = this.getJoiningContent(everyCouponTemp);
            let discount_insert = this.getJoiningContent(discountTemp);
            let return_insert = this.getJoiningContent(returnTemp);
            if (coupon_insert) { shop_insert.couponMaterialList.push(coupon_insert) }
            if (everyCoupon_insert) { shop_insert.couponMaterialList.push(everyCoupon_insert) }
            if (discount_insert) { shop_insert.couponMaterialList.push(discount_insert) }
            if (return_insert) { shop_insert.couponMaterialList.push(return_insert) }
          }


          if (!isClear) {
            this.data.home.shopList.push(shop_insert);
            this.data.entList.push(entObj_chang);
          } else
            shopList_chang.push(shop_insert);

        }

        if (!isClear) {//分页
          this.setData({
            entList: this.data.entList,
            'home.shopList': this.data.home.shopList,
            showMoreDes: true,
            showloadDes: false
          });
          
        } else {
          this.setData({
            entList: entList_chang,
            'home.shopList': shopList_chang,
          })
        }
      }
      /**
       * 获取拼接后的优惠券描述content
       */
    curPage.getJoiningContent=function(counponList) {
        if (!counponList.length) return null;
        var couponMaterial_chang = {};
        // content": "满1元返1元 / 全天可用",
        // couponType": "1" 
        var content = '';
        for (var i = 0; i < counponList.length; i++) {
          let obj = counponList[i];
          content += i == 0 ? obj.privilegeDes : " " + obj.privilegeDes;
          if (i == counponList.length - 1) {

            var timeType = obj.timeType;//可特价优惠区间
            var isWeekendUse = obj.isWeekendUse;//周末是否可用
            var isHolidayUse = obj.isHolidayUse;//节假日是否可用
            var specialLimit = "";

            if (timeType == 1) {

              specialLimit += "/午市专享";

            } else if (timeType == 2) {
              specialLimit += "/晚市专享";
            }
            if (isWeekendUse == 0 && isHolidayUse == 0) {
              specialLimit += "/周末、法定节假日不特价";
            } else if (isWeekendUse == 0) {
              specialLimit += "/周末不可使用" ;
            } else if (isHolidayUse == 0) {
              specialLimit += "/法定节假日不特价" ;
            }

            content += specialLimit;

          }

        }
        couponMaterial_chang.content = content;
        couponMaterial_chang.couponType = counponList[0].privilegeType;
        return couponMaterial_chang;
    }
    /**
     * 进入点菜页
     */

    curPage.toTakeOrder =function(e) {
        var entId = e.currentTarget.dataset.entid;
        if (!entId || !entId.length) { console.log('entId不正确：' + entId); }
        wx.navigateTo({
          url: '../../menu/menu?entId=' + entId,
        })
    }
}

var setUpScreenData = function(){

    let pages = getCurrentPages();
    let curPage = pages[pages.length - 1];
    this.__page = curPage;
    var containerW = wx.getSystemInfoSync().windowWidth;

    var sortBlockW = (containerW - 10 * 7) / 4;
    

    
    curPage.setData({
      sortBlockW: sortBlockW,
      industryId: '',//常态
      sortType: '',//排序类型
      privilege: '',//优惠类型
      selectIndex: 0,
      showToastBg: false,
      sortZone: [{ optionName: '全部', subIndex: -1 }, { optionName: '智能排序', subIndex: -1 }, { optionName: '筛选', subIndex: -1 }],
      allQuery: [
        { optionName: '全部', optionId: 0 }, { optionName: '小吃快餐', optionId: 20 }, { optionName: '火锅', optionId: 18 }, { optionName: '家常菜', optionId: 2 },
        { optionName: '烧烤', optionId: 13 }, { optionName: '海鲜', optionId: 19 }, { optionName: '清真', optionId: 10 }, { optionName: '自助餐', optionId: 25 },
        { optionName: '西餐', optionId: 24 }, { optionName: '咖啡厅', optionId: 11 }, { optionName: '面包甜点', optionId: 26 }, { optionName: '素菜', optionId: 17 },
        { optionName: '川菜', optionId: 4 }, { optionName: '湘菜', optionId: 5 }, { optionName: '湖北菜', optionId: 6 }, { optionName: '新疆菜', optionId: 12 },
        { optionName: '浙江菜', optionId: 7 }, { optionName: '粤菜', optionId: 8 }, { optionName: '东北菜', optionId: 9 }, { optionName: '北京菜', optionId: 1 },
        { optionName: '日本菜', optionId: 21 }, { optionName: '韩国菜', optionId: 22 }, { optionName: '云南菜', optionId: 15 }, { optionName: '东南亚菜', optionId: 23 },
        { optionName: '鲁菜', optionId: 3 }, { optionName: '西北菜', optionId: 14 }, { optionName: '贵州菜', optionId: 16 }, { optionName: '其他', optionId: 27 }
      ],
      smartSort: ['智能排序', '人气排序', '离我最近'],
      screening: ['点菜优惠', '返券', '优惠券'],// '特价菜' 暂不支持 该系列的查询
    })
  

}
module.exports = {
  setUpEntListData: setUpEntListData,
  setUpScreenData: setUpScreenData
}