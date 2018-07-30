var MD5 = require('../../utils/md5.js');
var Utils = require('../../utils/util.js');
var mode = require('template/mode.js');
var secondMenuMethodInit = require('template/secondMenu/secondMenu.js');
var shoppingCarMethedInit = require('template/shoppingCar/shoppingCar.js');
var dishDetailMethedInit = require('template/dishDetail/dishDetail.js');
var constants = require('../../utils/constants.js');
var qnLoading = require('../component/qnLoading/qnLoading.js')
var app = getApp();


var shoppingCarManager;
Page({
  data: {
       entId:'',
       orderId:'',//如果是加菜 此字段不为空
       isApplyCollect:false, //是否正在进行收藏操作（防止一直点收藏）
       entInfo:{
         entName:'小牛牛',
         entLogo:'',
         startTime:'9:00',
         endTime:'21:00',
         address:'就不告诉你就不告诉你就不午告诉你',
         isCollection:false,
         phone:'18610773772',
       },
        menu:{
            animationData:{}, //购物车弹出的动画
            ip: constants.IP,
            entId : '1480484337783',//1483669756662
            entPhone:'18610773772',
            hasTakeOrderPreferential :true,
            dishDiscountBarH:25,//点菜优惠提示的高度
            showSecondMenu : false, //二级菜品弹窗
            showDishDetail : false, //展示菜品详情
            showShoppingCar:false, //展示购物车
            shoppingCarAnamation:false, //true:正在播放动画
            optionNameW:0,//二级菜单属性按钮宽度
            isCollection:true, //是否收藏
            noImgControl:{
                isOperation :false,
                showDropBoard : false,//箭头是否旋转
                controlFrames:[],//各分类触发的高度  
            },
            smallImgControl:{
                controlFrames:[],
                
            },
            superImgControl:{
                left:0,
            },

            menuModel:1,//菜单模式 1大图/3小图/4超大图
            originalModel:1,//服务器原数据

            viewHeight:0,      
            headTranslateY:100, //商家信息   
            curGroupIndex:0,//当前分组
            curDishInfo:{
                // "sideDishComboStr":'土豆x5牛肉x3',//已选配菜组合字符串
                // "dishId": "1ac4a51042054c4e910cbad33915b29f",
                // "dishMd5":"",
                // "dishName": "草鱼",
                // "price": 5800,//价格   
                // "originalPrice":6000,//原价      
                // "soldOut": 0,//是否售光 0否 1是
                // "dishType": 0,//菜品类型0菜品1套餐           
                // "isSpecial":1,//是特价菜
                // "hasSpecialAttr":true,//是否包含特价属性
                // "dishInfo": "",//菜品描述                     
                // "dishUnit": "份",//单位
                // "comboDishName": "",//套餐明细
                // "attrComboStr":"大 麻辣",//已选属性描述
                // "hasSlideDish":true,//是否含有配菜
                // "hasOption":true,//是否有规格属性            
                // "dishPic": "Picture_Resource/1483669756662/ME_4d29a0a1-29c3-417e-9964-1b9b90bffd39.s200.jpg",//小图
                // "dishMidPic": "Picture_Resource/1483669756662/ME_4d29a0a1-29c3-417e-9964-1b9b90bffd39.s400.jpg",//中图
                // "dishBigPic": "Picture_Resource/1483669756662/ME_4d29a0a1-29c3-417e-9964-1b9b90bffd39.s600.jpg",//大图        
                // "dishAttrData": [
                //     {
                //         "attrName": "小料（可不选或多选）",//属性名称                      
                //         "option": [{
                //             "name":"葱",
                //             "status":0//0未选中 1已选 -1禁止选中
                //             }],//选项
                //         "influencePrice": 0,//是否影响价格 0否 1是
                //         "multiSelect": 1,//是否多选 0否 1是
                //     }
                // ],
                // "dishAttrDataHasInf": [//影响价格属性
                //     {
                //         "attrName": "规格",
                //         "option": [{
                //             "name":"大",
                //             "status":0//0未选中 1已选 -1禁止选中
                //             }],//选项
                //         "influencePrice": 1,
                //         "multiSelect": 0//是否多选 0否 1是
                //     }
                // ],
                // "sideDishData": [//配菜
                //     {
                //         "dishName": "豆皮",
                //         "price": 800,
                //         "dishUnit": "份",
                //         "selNum":0//已选数量
                //     }
                // ]
                
            },
            dishMenu:[
                
            ],
            shoppingCart:{
                // "totalNum":4,
                // "totalPrice":5000,
                // "originalPrice":5000,
                // "dishNum":1,
                // "stapleNum":1,//主食份数
                // "tableWare":1,//餐具
                // "tableNum":1,//桌位
                // "addDishes":{//已选菜品
                //     "dishMd5":{                        
                //         "dishType":0,
                //         "dishId":"59874bb9ee614f469c18ce12fa528011",
                //         "dishName":"乌江鱼",
                //         "price":5800,
                //         "dishUnit":"份",
                //         "comboDishName":"",//套餐名称
                //         "sideDishData":[
                //             {
                //                 "dishName":"香菇",
                //                 "price":1000,
                //                 "num":1
                //             }
                //         ],
                //         "groupType":0,
                //         "isSpecial":1,   //是否为特价菜                     
                //         "originalPrice":7800,
                //         "presentPrice":5800,                        
                //         "totalPrice":11000,
                //         "sideDishStr":"香菇、金针菇、土豆片、豆皮x3",
                //         "attrCombo":"2斤|鱼香",
                //         "showName":"乌江鱼(2斤 鱼香)",
                //         "dishMd5":"6029e30718de17f88cb0bbca33e95fe5",
                //         "num":1,
                //         "sideDishPrice":5200,
                //         "originalTotalPrice":13000,
                //         "specialNum":1,//特价菜数量
                //         "specialId":""//特价菜对应的特价id
                        
                //     }
                    
                // }
            }                    
        }
    },
    dishList:{},//商家菜品基础数据
    specialList:{},
    entInfo:{}, //商家基础数据
    /**
     *  界面初始加载
     */
    onLoad : function(option) {
        console.log("菜单页");
        // 小牛动画嵌入
        qnLoading.loading();

        var entId = option.entId;
        var orderId = option.orderId;
        this.setData({
           entId: entId,
           orderId: orderId,
        });

        this.setupAdapterFrames();
        this.setupVC();
        this.initData();
        shoppingCarManager = app.getShoppingCarManager(); //获取购物车管理类

        shoppingCarManager.setEntId(entId);
        this.updateData();
        /**弹窗提示数据源嵌入 */
        app.toast();
    },
    setupVC:function(){
        secondMenuMethodInit.secondMenuInit();
        mode.smallVCInit();
        mode.noImgInit();
        mode.superImgInit();
        shoppingCarMethedInit.shoppingCarInit();
        dishDetailMethedInit.dishDetailInit();
    },
    setupAdapterFrames :function(){
         var res = wx.getSystemInfoSync(); 
         var containerH=res.windowHeight;
         var containerW = res.windowWidth;
         var scale = 750 / containerW;
         var viewHeight = containerH - (110 / scale) - 100;
         var optionNameW = (containerW - 56) / 3;
         this.setData({
            'menu.optionNameW' : optionNameW,
            'menu.viewHeight' : viewHeight,
            'menu.secondDishbgH' : res.windowHeight,
            'screenH' : res.windowHeight,
            'menu.screenH' : res.windowHeight,
         });
    },
    /**
     * 界面加载异常 重新请求接口
     */
    reloadData :function(){
        this.qnLoading.show();
        this.initData();
    },
    /**
     *  界面数据初始化
     */
    initData : function(){
    /**
     *   后台数据 dishes:所有菜品（不含特价菜） dishMenu:所有菜品分组  specialShowList:特价菜属性
     */

           // 请求接口
        var that = this;
        
        wx.request({
          url: constants.IP+constants.URL_getMenu,
          data: {
              entId : that.data.entId,
              openId:app.getOpenId()
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
              console.log('success ———— 获取商家信息及菜品');
              console.log(res);
              if(res.data.returnCode == "00"){
                  
                  that.getMenu(res.data);
                  that.getEntInfo(res.data);
                  that.calculateControlFrames();
                  that.updateData();
                  that.qnLoading.hide();
              }else{
                  console.log('数据请求失败');
                  that.qnLoading.loadError();
              }
                
          },
          fail: function(res) {
                console.log('接口异常');
                that.qnLoading.loadError();
          },
          complete: function(res) {
            // complete
          }
        })
    },
    getMenu : function(datasource){
      
      var originalModel = datasource.menuModel;//后台数据显示默认样式 由后台提供
        this.setData({
            'menu.originalModel' : originalModel,
            'menu.menuModel' : originalModel
        })
        /**所有菜品信息 */
        var dishes = datasource.dishes;
        /**菜品分组信息 */
         var dishMenu = datasource.dishMenu;
        /**特价菜信息 */ 
        var specialShowList =datasource.specialShowList;
        /**也是特价菜信息，但是该字段中含有特价菜的唯一标识，这个字段在生成预订单的时候需要上传服务器 */
        var specialOfferDishes = datasource.specialOfferDishes;
        for (var specialTempObj in specialShowList){
          for (var i = 0; i < specialOfferDishes.length; i++){
              let specialOfferObj = specialOfferDishes[i];
              if (specialTempObj == specialOfferObj.dishId){
                specialShowList[specialTempObj].specialId = specialOfferObj.id;
              }
          }
        }


        /**将特价菜有图的置前处理 
         * （后台放置顺序出错）对影响价格和不影响价格的数据处理。
         */
        var sortHasPic = {};
        var sortNoPic = {};
        for(var dishId in specialShowList){
            let dishObj = specialShowList[dishId];
          
            if(dishObj.dishAttrDataHasInf.length && !dishObj.dishAttrDataHasInf[0].influencePrice){
                let dishAttrDataHasInf_chang = dishObj.dishAttrDataHasInf;
                let dishAttrData_chang = dishObj.dishAttrData;
                dishObj.dishAttrDataHasInf = dishAttrData_chang;
                dishObj.dishAttrData = dishAttrDataHasInf_chang;
            }
            if(dishObj.dishBigPic.length){
                sortHasPic[dishId]=specialShowList[dishId];
            }else{
                sortNoPic[dishId]=specialShowList[dishId];
            }
        }
        specialShowList = {};
        
        for(var dishId in sortHasPic){
            specialShowList[dishId] = sortHasPic[dishId];
        }
        for(var dishId in sortNoPic){
            specialShowList[dishId] = sortNoPic[dishId];
        }
        /**
         *  设置page的数据源
         */
         this.setData({
            specialList :specialShowList,
            dishList : dishes,
         });
         
        /**
         * specialShowList 不为空nil将特价菜分区插入“菜品分组信息中”
         */
         if (specialShowList && !Utils.emptyOfObj(specialShowList)){
            var specialGroup = {};
            specialGroup.dishGroupId = constants.SPECIAL_GROUPID;//做为特价菜分组的Id
            specialGroup.dishGroupName = "特价菜";
            specialGroup.groupType = 3;
            specialGroup.intro = "";
            specialGroup.dishes=[];
            for(var dishId in specialShowList){
                specialGroup.dishes.push(dishId);
            }
            dishMenu.unshift(specialGroup);
        }
        /**
         *   处理 groupType ,默认是0 遍历dishMenu只有当groupType 比当前值大的时候才能赋值
         *    一道菜可能属于多个groupType 【主食 餐具 ...】而构建的时候只能默认使用一种
         *    用来提交后台添加后台dishes字段groupType
         */
        for(var index = 0;index < dishMenu.length ;index++){
            var groupObj = dishMenu[index];
            let dishes = groupObj.dishes;
            var dishesIdStr = dishes.toString();
            for(var keyForDishId in this.data.dishList){
                if(dishesIdStr.indexOf(keyForDishId) >= 0){
                    var dish_chang = this.data.dishList[keyForDishId];
                    if(!dish_chang.groupType){
                        dish_chang.groupType = 0;
                    }
                    if (groupObj.groupType > dish_chang.groupType && groupObj.groupId != constants.SPECIAL_GROUPID){
                        dish_chang.groupType = groupObj.groupType;
                    }
                }
            }
        }

        /**
         *  构建dishMenu（将后台返的dishes、specialShowList、dishMenu进行整合）
         */
        var dishMenu_chang = [];
        var AllHasImgDishNum = 0;
        for(var i = 0 ; i < dishMenu.length ; i++){
            var groupObj = dishMenu[i];
            var obj = {};
            obj.groupId = groupObj.dishGroupId;
            obj.groupName = groupObj.dishGroupName;
            obj.groupType = groupObj.groupType;
            obj.intro = groupObj.intro;
            obj.selNum = 0;
            obj.hasImgDishNum = 0;
            obj.dishes=[];
                /**
                 *  通过dishId从dishes中获取菜品info
                 */
            for(var j = 0 ; j < groupObj.dishes.length ; j++){

                /**设置菜品一般属性 */
                var dishId = groupObj.dishes[j];
                var disheObj = dishes[dishId];
                var disheInsertObj = {};
                disheInsertObj.dishId = disheObj.dishId;
                disheInsertObj.groupName = groupObj.dishGroupName;
                disheInsertObj.groupType =groupObj.groupType;
                disheInsertObj.dishInfo = disheObj.dishInfo;
                disheInsertObj.dishName = disheObj.dishName;
                disheInsertObj.price = disheObj.price;
                disheInsertObj.soldOut = disheObj.soldOut;
                disheInsertObj.dishType = disheObj.dishType;
                disheInsertObj.dishUnit = disheObj.dishUnit;
                disheInsertObj.comboDishName = disheObj.comboDishName;
                disheInsertObj.hasSideDish = disheObj.sideDishData.length ? true : false;
                if (specialShowList[dishId]){
                     disheInsertObj.specialId = specialShowList[dishId].specialId ? specialShowList[dishId].specialId : '';          
                }
                if(i == 0 && specialShowList.length){//特价分区下
                    let disheObj = specialShowList[dishId];
                    disheInsertObj.hasOption = disheObj.dishAttrData.length || disheObj.dishAttrDataHasInf.length ? true : false;
                }else{
                    disheInsertObj.hasOption = disheObj.dishAttrData.length || disheObj.dishAttrDataHasInf.length ? true : false;
                }
                disheInsertObj.priceFloat = disheInsertObj.hasSideDish || disheInsertObj.hasOption ? true : false;              
                disheInsertObj.dishMidPic = constants.IP + disheObj.dishMidPic;
                disheInsertObj.dishBigPic = constants.IP + disheObj.dishBigPic;
                disheInsertObj.dishPic = constants.IP + disheObj.dishPic;
                if(disheObj.dishMidPic&&disheObj.dishBigPic&&disheObj.dishPic){
                    obj.hasImgDishNum += 1;
                }
                disheInsertObj.hasSpecialAttr = specialShowList[dishId] ? true : false;
                if(i == 0 && disheInsertObj.hasSpecialAttr){
                    disheInsertObj.isSpecial =true ;
                }else if(disheInsertObj.hasSpecialAttr && !disheInsertObj.hasOption){
                    disheInsertObj.isSpecial =true ;
                }else{
                    disheInsertObj.isSpecial =false ;
                }
                /**
                 * 拼接MD5规则， 如:dishId;小|麻辣;土豆x5牛肉x3
                 * MD5.transformMd5 暴露MD5加密方法。传入拼接好的字符串
                 */
                var generateMd5Str = dishId;
                var comboAttr = "";
                if(disheInsertObj.hasSpecialAttr){ 
                    var specialObj = specialShowList[dishId];
                    disheInsertObj.originalPrice = specialObj.originalPrice;
                    disheInsertObj.price = specialObj.presentPrice;
                    /**
                     * 构建时候特价菜的属性也可用来表示是在特价分区下
                     */
                    if(disheInsertObj.isSpecial){
                        disheInsertObj.dishName = specialObj.specialName;
                        /**获取MD5对应字符串 */
                        if(specialObj.attrCombo){
                            for(var z=0; z < specialObj.attrCombo.length; z++){
                                var attrComboObj = specialObj.attrCombo[z];
                                var optionName = attrComboObj.optionName;
                                if(z == 0 && optionName.indexOf("|") <0){
                                    comboAttr += optionName; 
                                }else if(z > 0 && optionName.indexOf("|") <0){
                                    comboAttr +="|"+optionName;
                                }
                            }
                        }
                    }
                    /**特价菜限制描述 */
                    disheInsertObj.specialLimit = this.generateSpecialLimit(specialObj);
                }
                generateMd5Str = comboAttr.length ?  generateMd5Str + ";" +comboAttr : generateMd5Str;
                disheInsertObj.dishMd5 = MD5.transformMd5(generateMd5Str);
                obj.dishes.push(disheInsertObj);
            }

            AllHasImgDishNum += obj.hasImgDishNum;
            dishMenu_chang.push(obj);
        }

        this.setData({
            'menu.menuModel': AllHasImgDishNum > 0 ? this.data.menu.menuModel : 0,
            'menu.AllHasImgDishNum': AllHasImgDishNum,
            'menu.dishMenu' : dishMenu_chang,
        })
        console.log('....');
    },
    //从商家原始数据中构造展示界面的数据
    getEntInfo:function(data){
      var entInfo = data.entInfo;
      entInfo.logo = constants.IP + entInfo.entLogo;
      wx.setNavigationBarTitle({
        title: data.entInfo.name
      });
      var isCollection = entInfo.isCollected==='1';
      this.setData({
         entInfo: entInfo,
         'entInfo.isCollection': isCollection,
      });
      //构造展示数据
      var entInfo_toShow = {
          name :entInfo.name,
          address: entInfo.address,
          tel: entInfo.tel,
          logo: constants.IP + entInfo.busPath,
          time:'',
      };
      //营业时间
      if(entInfo.openTime && entInfo.closeTime){
        entInfo_toShow.time = entInfo.openTime+"-"+entInfo.closeTime;
      }
      this.setData({ entInfo_toShow: entInfo_toShow});
    },
    /**
     * 仿造 点击事件操作传值，生成当前选中的菜品信息，用于二级菜单的展示
     */
    setupCurDishInfo:function(curGroupIndnx,curDishIndex){
        var dishObj = this.data.menu.dishMenu[curGroupIndnx].dishes[curDishIndex];
        var curDishInfo_change = {};
        curDishInfo_change.dishId = dishObj.dishId;
        curDishInfo_change.groupName = this.data.menu.dishMenu[curGroupIndnx].groupName;
        curDishInfo_change.dishMd5 = dishObj.dishMd5;
        curDishInfo_change.dishName = dishObj.dishName;
        curDishInfo_change.isSpecial = dishObj.isSpecial;
        curDishInfo_change.price = dishObj.price;
        curDishInfo_change.originalPrice = dishObj.originalPrice;
        curDishInfo_change.soldOut = dishObj.soldOut;
        curDishInfo_change.dishType = dishObj.dishType;
        curDishInfo_change.dishInfo = dishObj.dishInfo;
        curDishInfo_change.dishUnit = dishObj.dishUnit;
        curDishInfo_change.comboDishName = dishObj.comboDishName;
        curDishInfo_change.dishPic = dishObj.dishPic;
        curDishInfo_change.dishMidPic = dishObj.dishMidPic;
        curDishInfo_change.dishBigPic = dishObj.dishBigPic;
        curDishInfo_change.priceFloat = dishObj.priceFloat;
        curDishInfo_change.groupType = dishObj.groupType;
        curDishInfo_change.specialId = dishObj.specialId ? dishObj.specialId : ""; 
        /**通过dishId从后台原数据源dishes中获取（属性、配菜信息） */
        var dishFromDatasource = this.data.dishList[curDishInfo_change.dishId];
        var specialDishFromDatasource = this.data.specialList[curDishInfo_change.dishId];
        curDishInfo_change.hasSpecialAttr = specialDishFromDatasource ? true:false;
        if(specialDishFromDatasource){
            curDishInfo_change.isCurrentUsable = specialDishFromDatasource.isCurrentUsable;
            curDishInfo_change.maxSalesNum = specialDishFromDatasource.maxSalesNum;
        }
        
        var sideDishData = [];
        for(var i = 0;i < dishFromDatasource.sideDishData.length;i++){
            var sideDishObj = dishFromDatasource.sideDishData[i];
            var insertObj = {};
            insertObj.dishName = sideDishObj.dishName;
            insertObj.price = sideDishObj.price;
            insertObj.dishUnit = sideDishObj.dishUnit;
            insertObj.selNum = 0;
            sideDishData.push(insertObj);
        }
        curDishInfo_change.sideDishData = sideDishData;
        curDishInfo_change.hasSideDish = sideDishData.length ? true:false;
        var dishAttrData;
        var dishAttrDatahasInf
        if (curDishInfo_change.isSpecial){//特价菜
            dishAttrData = this.getDishAttr(specialDishFromDatasource.dishAttrData);
            dishAttrDatahasInf = this.getDishAttr(specialDishFromDatasource.dishAttrDataHasInf);

            /** 特价分区下设置默认选中属性；如：烤鱼（小） */
            var attrCombo = specialDishFromDatasource.attrCombo;
            var defaulSelAttr=[];
            for(var i = 0 ; i < attrCombo.length; i++){
                var attrComboObj = attrCombo[i];
                var isDefaultSel = attrComboObj.optionName.indexOf("|") < 0; 
                if(isDefaultSel){
                   defaulSelAttr.push(attrComboObj);
                }
            }
            curDishInfo_change.defaulSelAttr = defaulSelAttr; 
        }else{//普通菜
            dishAttrData = this.getDishAttr(dishFromDatasource.dishAttrData);
            dishAttrDatahasInf = this.getDishAttr(dishFromDatasource.dishAttrDataHasInf); 
        }

        curDishInfo_change.dishAttrData = dishAttrData;
        curDishInfo_change.dishAttrDatahasInf = dishAttrDatahasInf;

        curDishInfo_change.hasOption = curDishInfo_change.dishAttrData.length || curDishInfo_change.dishAttrDatahasInf.length ? true:false;

         /**
          * 设置二级菜单下的已选属性说明
          */
        var attrComboStr_chang = "";
        if (curDishInfo_change.defaulSelAttr){ 
            for(var i = 0 ; i < curDishInfo_change.defaulSelAttr.length ; i++){
                let space = i == curDishInfo_change.defaulSelAttr.length - 1 ? "" : " ";
                attrComboStr_chang += curDishInfo_change.defaulSelAttr[i].optionName + space;
            }
        }
        /**
         *  设置菜单弹窗后默认选中第一个属性[根据影响、不影响价格菜品信息]
         */
          var optionObj ;
         if(curDishInfo_change.dishAttrDatahasInf.length){
            optionObj = curDishInfo_change.dishAttrDatahasInf[0].option[0];
         }else if(curDishInfo_change.dishAttrData.length){
            optionObj = curDishInfo_change.dishAttrData[0].option[0];
         }
         if (curDishInfo_change.dishAttrDatahasInf.length && curDishInfo_change.dishAttrData.length){
            optionObj.status = 1;
            attrComboStr_chang += optionObj.name;
              /**this.matchPrice [匹配当前价格-->函数所处文件 secondMenu/secondMenu.js]*/
            this.matchPrice(curDishInfo_change);
         }
         /**
          * 为了MD5的唯一性，生成的字符串要有唯一顺序
          */
          var sortAttrAtt = attrComboStr_chang.split("|");
          sortAttrAtt.sort();
          attrComboStr_chang = sortAttrAtt.join("|");
          curDishInfo_change.attrComboStr = attrComboStr_chang;
        

          if (curDishInfo_change.isSpecial) {
            var befDish = this.data.specialList[curDishInfo_change.dishId];
            curDishInfo_change.dishPrice = befDish.price;
            curDishInfo_change.dishOriginalPrice = befDish.originalPrice;
            curDishInfo_change.dishPresentPrice = befDish.presentPrice;
          } else {
            var befDish = this.data.dishList[curDishInfo_change.dishId];
            curDishInfo_change.dishPrice = curDishInfo_change.originalPrice = curDishInfo_change.presentPrice = befDish.price;
          }
          //获取dishName
          curDishInfo_change.dishOriginalName = this.data.dishList[curDishInfo_change.dishId].dishName;


        this.setData({
            'menu.curDishInfo' : curDishInfo_change,
        });
        return curDishInfo_change;
    },
    /**
     * 获取插入的菜品属性 
     */
    getDishAttr:function(dishAttr){
        var dishAttrArr= [];
        for(var i = 0;i < dishAttr.length;i++){
            var insertObj = {};
            var dishAttrObj = dishAttr[i];
            insertObj.attrName = dishAttrObj.attrName;
            insertObj.influencePrice = dishAttrObj.influencePrice;
            insertObj.multiSelect = dishAttrObj.multiSelect;
            var optionArr = dishAttrObj.optionName.split("|") ;
            var option = [];
            for(var j = 0;j < optionArr.length;j++){
                var optionObj = {};
                optionObj.name = optionArr[j];
                optionObj.status = 0;
                option.push(optionObj);
            }
            insertObj.option=option;
            dishAttrArr.push(insertObj);
        }
        return dishAttrArr;
    },
    /**
     *  生成特价菜限制描述语句
     */
    generateSpecialLimit : function(specialObj){
        var maxSalesNum = specialObj.maxSalesNum;//最大使用分数
        var timeType = specialObj.timeType;//可特价优惠区间
        var isWeekendUse = specialObj.isWeekendUse;//周末是否可用
        var isHolidayUse = specialObj.isHolidayUse;//节假日是否可用
        var isShare = specialObj.isShare;//是否可同享
        var specialLimit = "";
        if(maxSalesNum){
            specialLimit +="每单限"+maxSalesNum+"份";
        }
        if(timeType==1){
            specialLimit +=specialLimit.length? "/午市专享" : "午市专享";
        }else if(timeType==2){
            specialLimit +=  specialLimit.length ? "/晚市专享" :"晚市专享";
        }
        if(isWeekendUse==0&&isHolidayUse==0){
            specialLimit += specialLimit.length ? "/周末、法定节假日不特价" : "周末、法定节假日不特价";
        }else if(isWeekendUse ==0){
            specialLimit += specialLimit.length ? "/周末不可使用": "周末不可使用";
        }else if(isHolidayUse == 0){
            specialLimit += specialLimit.length ? "/法定节假日不特价" :"法定节假日不特价";
        }
        if(!isShare){
            specialLimit += specialLimit.length ? "/不与其他优惠同享" : "不与其他优惠同享";
        }
        return specialLimit;
    },

    /**
     *  滚动事件 [无图/小图]
     */   
    scrollDish:function(e,isSmallImgDish){
        this.data.scroOff = e.detail.scrollTop;
    },
    /**
     * 计时器 刷新界面悬停的高度
     */
    timer:function(){
      console.log('开始监听界面悬浮下标');
      var that = this;
      var timer = setInterval(function () {
        if (that.data.menu.menuModel != 3 && that.data.menu.menuModel != 0)return
        var controlObj = that.data.menuModel == 3 ? that.data.menu.smallImgControl.controlFrames : that.data.menu.noImgControl.controlFrames;
            for (var index in controlObj) {
              var controlFrame = controlObj[index];
              var fixName = controlFrame['groupName'];
              var totalH = controlFrame['offsetHeight'];
              if (that.data.scroOff < totalH) {
                  if (that.data.menu.noImgControl.isOperation) {
                    that.setData({
                      'menu.noImgControl.isOperation': false,
                    });
                    break;
                  }
                  else {
                    that.setData({
                      'menu.curGroupIndex': index,
                    });
                  }

                  break;
              }
            }
        },200);
      this.data.intervalTimer = timer;
    },

    /**
    * 生命周期函数--监听页面显示
    */
    onShow: function () {
        this.timer();
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        console.log('监听取消');
        clearInterval(this.data.intervalTimer);
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
      console.log('监听取消');
      clearInterval(this.data.intervalTimer);
    },
    //菜品上点击加号
    tapDishPlus:function(event){
      var tapMenuIndex = event.currentTarget.dataset.tapMenuIndex;
      var tapDishIndex = event.currentTarget.dataset.tapDishIndex;
      // 获取当前操作的菜品信息 //生成curDishInfo
      var clickItem = this.setupCurDishInfo(tapMenuIndex, tapDishIndex);
      if (clickItem.hasSideDish) { //有配菜
        //跳转选择配菜页
        this.setData({
          'menu.showSecondMenu': true,
        })
      } else if (clickItem.hasOption) { //有属性
        //跳转选择属性页
        this.setData({
          'menu.showSecondMenu': true,
        })
      } else { //普通菜
        //在已选菜品中存在
        this.refreshShoppingcar(clickItem);
      }
    },
    refreshShoppingcar:function(clickItem){
        var currDish = this.data.menu.shoppingCart.addDishes[clickItem.dishMd5];
          if(currDish){
              //相当于点击已选菜品
              this.oprationSelDishNum(clickItem.dishMd5,true);
          }else{
              //在已选菜品中不存在
              var dish = this.generateShoppingRecord();
              
              shoppingCarManager.addDish(dish);
              this.updateData();
          }
    },

     //菜单中菜品列表中的item上点击减号
    tapDishMinus:function(event){
        var tapMenuIndex = event.currentTarget.dataset.tapMenuIndex;
        var tapDishIndex = event.currentTarget.dataset.tapDishIndex;
        var clickItem = this.data.menu.dishMenu[tapMenuIndex].dishes[tapDishIndex];

        this.oprationSelDishNum(clickItem.dishMd5,false);
    },
    tapDishMinusFronDishDetail:function(){
        var clickItem = this.data.menu.curDishInfo;
        this.oprationSelDishNum(clickItem.dishMd5,false);
    },

    //已选菜品、购物车中点击减号
    tapAlreadyChooseDishMinus:function(event){
        this.oprationSelDishNum(event.currentTarget.dataset.dishMd,false);
        /**
        * 刷新界面各个菜品位置
        */
        if(!this.data.menu.shoppingCart.addDishes[event.currentTarget.dataset.dishMd]){
            this.calculateControlFrames();
        }
   },
    //已选菜品、购物车中点击加号
    tapAlreadyChooseDishPlus:function(event){
        this.oprationSelDishNum(event.currentTarget.dataset.dishMd,true);
    },
    /**
     * 对已选择的菜品进行数量的加减操作
     * dishMd5
     * isAdd:true =点击加号；false=点击减号；
     */
    oprationSelDishNum:function(dishMd5,isAdd){
      if(isAdd){
        shoppingCarManager.addDish(dishMd5);
      }else{
        shoppingCarManager.subDish(dishMd5);
      }    
       this.updateData();
    },
    
    //获取一个用于插入到已选菜品列表的菜品数据（购物车）
    generateShoppingRecord:function(){
        //根据处理数据命名。从而符合生成预订单orderData中一致的JSON字符串
        var curDishInfo = Utils.deepCopy(this.data.menu.curDishInfo);
        var sideDishData_chang = [];
        if (curDishInfo.sideDishData){
          for (var i = 0; i < curDishInfo.sideDishData.length; i++) {
            let sideObj = curDishInfo.sideDishData[i];
            let insertObj = {
              dishName: sideObj.dishName,
              price: sideObj.price,
              num: sideObj.selNum
            };
            sideDishData_chang.push(insertObj);
          }
        }
        
        var dish = {
            specialId: curDishInfo.specialId,
            dishId : curDishInfo.dishId,  
            dishMd5 : curDishInfo.dishMd5, 
            dishType : curDishInfo.dishType,
            dishName: curDishInfo.dishOriginalName,
            dishUnit : curDishInfo.dishUnit,  
            showName : curDishInfo.showName,  
            comboDishName : curDishInfo.comboDishName,   //套餐名称
            price: curDishInfo.dishPrice,
            isSpecial : curDishInfo.isSpecial,
            groupType :curDishInfo.groupType,      //属于不同组的菜，这个groupType怎么算
            specialNum:0,  //
            specialId : curDishInfo.specialId, //根据属性的搭配，找到相应的specialId
            num:1,
            originalPrice: curDishInfo.dishOriginalPrice,  // 原价
            presentPrice: curDishInfo.dishPresentPrice,    // 优惠价格 
            originalTotalPrice:curDishInfo.originalPrice,   // 原价总价
            totalPrice:curDishInfo.price,    // 总价
            sideDishPrice:curDishInfo.sideDishPrice,   // 配菜总价
            attrCombo:curDishInfo.attrComboStr,
            sideDishStr:curDishInfo.sideDishComboStr,   // 配菜展示
            sideDishData: sideDishData_chang,  //配菜列表curDishInfo.sideDishData
            /**
             *  点击确定将数据提交到服务器，【需要的额外参数】
             */
            soldOut : 0 ,
            showName : '',
            sideDishPrice : curDishInfo.sideDishPrice,
            dishDomId : '',
            maxSalesNum: curDishInfo.maxSalesNum,
        }
        //设置specialNum/**maxSalesNum：特价菜最大可用数量是针对一个dishId而言的，所以specialDishTotalNum代表当前dishId下已选特价菜的总数量*/
        var specialDishTotalNum = shoppingCarManager.getDishTotalSpecialNum(curDishInfo.dishId);
        if(curDishInfo.isSpecial && curDishInfo.isCurrentUsable==1){
            if(curDishInfo.maxSalesNum==0 ||curDishInfo.maxSalesNum > specialDishTotalNum){
                dish.specialNum=1;
            }else{
                dish.specialNum=0;
            }
        }

        return dish;
    },
    /**
     * 更新界面渲染数据
     */
    updateData:function(){
        //更新已选菜品
        this.setData({
            'menu.shoppingCart':shoppingCarManager.getShoppingDishInfo(),  //已选菜品
        });
        //更新分组下的菜品数量
        var dishMenu = this.data.menu.dishMenu;
        for(var menuIndex in dishMenu){
            
            var dishGroupSelNum = 0;
            if (dishMenu[menuIndex].groupId != constants.SPECIAL_GROUPID) { //构建特价菜自定义的分组Id
                
                for(var dishIndex in dishMenu[menuIndex].dishes){
                   
                    dishGroupSelNum += shoppingCarManager.getDishTotalNum(dishMenu[menuIndex].dishes[dishIndex].dishId);//已点的总数量
                }
                dishMenu[menuIndex].selNum = dishGroupSelNum;
            }else{ //特价菜分组
                for(var dishIndex in dishMenu[menuIndex].dishes){
                  //  var dishItem = dishMenu[menuIndex].dishes[dishIndex];
                    dishGroupSelNum += shoppingCarManager.getSpecialDishTotalNum( dishMenu[menuIndex].dishes[dishIndex].dishId);//已点的总数量
                }
                dishMenu[menuIndex].selNum = dishGroupSelNum;
            }
        }
        this.setData({
            'menu.dishMenu':this.data.menu.dishMenu,  //已选菜品
        });

    },
    catchTapEventDoNothing:function(e){/*阻断事件的传递*/},
    
    showDishDetail:function(event){//
        console.log(event);
        //获取点击菜品的位置（tapMenuIndex：归属分组，tapDishIndex：分组下的菜的位置）
        var tapMenuIndex = event.currentTarget.dataset.tapMenuIndex;
        var tapDishIndex = event.currentTarget.dataset.tapDishIndex;
        //根据位置构造menu下的  curDishInfo
        this.setupCurDishInfo(tapMenuIndex,tapDishIndex);
        //展示菜品详情
        // this.setData({
        //     'menu.showDishDetail':true,
        // });
    },
    //计算大图/超大图模式 中 tabbar的宽度
    
    /***
     * 模式开关
     */
    siwchMode:function(event){
        console.log('模式开关');
        //除了无图以外。其它模式点击开发设置为无图模式
        
        this.setData({
            'menu.menuModel' : event.currentTarget.dataset.model,
            'menu.noImgControl.showDropBoard' : false,
            'menu.noImgControl.isOperation':true,
        });
        
    },
/*===========弹窗提示 START======================= */
    /**
     * 完整提示【图片+文字+延迟】
     */
    onFullToast:function(titleDes) {
        this.Toast.showTipAuto({toastContent:titleDes,toastType:this.Toast.WARN_IMG_TYPE});
    },
/*============弹窗提示 END========================= */
    // errorImg:function(event){

    //     var menu_index = event.currentTarget.dataset.tapMenuIndex;
    //     var dish_index = event.currentTarget.dataset.tapDishIndex;
    //     var menuModel = event.currentTarget.dataset.menuModel;
    //     var dishMenu_chang = this.data.menu.dishMenu;
    //     if(menuModel == 1){//大图
    //         dishMenu_chang[menu_index].dishes[dish_index].dishMidPic = '../../image/noImgForSmallModel.png';
    //     }else if(menuModel ==3){//小图
    //         dishMenu_chang[menu_index].dishes[dish_index].dishPic = '../../image/noImgForSmallModel.png';
    //     }else if(menuModel == 4) {//超大图
    //         dishMenu_chang[menu_index].dishes[dish_index].dishBigPic = '../../image/noImgForSmallModel.png';
    //     }
        
    //     this.setData({
    //         'menu.dishMenu' : dishMenu_chang
    //     });
    // },
    clickY:0,
    catchtouchstart:function(event){
        var touchY = event.touches[0].clientY;
        this.clickY = touchY;
    },
    //控制商家信息的显示隐藏
    // catchtouchmove:function(event){
    //     var headTranslateY = this.data.menu.headTranslateY;
    //     var touchY = event.touches[0].clientY;
    //     var offset = 0;
    //     if(touchY < this.clickY){
    //         offset = this.clickY - touchY;
    //         if (this.data.menu.headTranslateY > 0 && this.data.menu.headTranslateY >= offset) {
    //             headTranslateY = this.data.menu.headTranslateY -= offset;
    //         } else {
    //             headTranslateY = 0;
    //         }
    //     }else{
    //        offset = touchY - this.clickY;
    //         if (this.data.menu.headTranslateY + offset<=100){
    //             headTranslateY = this.data.menu.headTranslateY += offset;
    //         }else{
    //           headTranslateY = 100;
    //         }
    //     }
    //     this.setData({
    //       "menu.headTranslateY": headTranslateY
    //     });
    //     this.clickY = touchY;
    // },
    //展示商家信息的弹窗
    showEntPopup:function(){
      this.setData({ showEntScreenView: true});
    },
     //店铺收藏取消操作
    collection:function(){
        if(this.data.isApplyCollect){
           return;
        }
        this.data.isApplyCollect = true;
        var url = constants.IP;
        if(this.data.entInfo.isCollection){
            url += constants.URL_CancelCollect;
        }else{
            url += constants.URL_AddCollect;
        }
        var that = this;
        wx.request({
          url: url,
          data: { 
            entId:that.data.entId,
            openId:app.getOpenId()
          },
          success:function(res){
            console.log('商铺操作： ' + res.data.returnMsg);
            console.log(res);
            if (res && res.data.returnCode === constants.RETURN_OK){
              
              that.setData({
                'entInfo.isCollection': !that.data.entInfo.isCollection
              });
            }
          },
          fail:function(res){
            var message = '';
            if (that.data.entInfo.isCollection){ //之前是收藏的，现在想取消收藏

            }
            console.log('商铺操作： ' + res.data.returnMsg);
            console.log(res);
          },
          complete:function(){
            that.data.isApplyCollect = false;
          }
        })
    },
    call:function(){
        //拨打电话
       if(!this.data.entInfo.tel){
         this.Toast.showTipAuto(
           {  toastContent:'手机号为空，请稍后重试!',
              toastType: this.Toast.WARN_IMG_TYPE 
            });
         //提示出现错误，
         return;
       }
        wx.makePhoneCall({
          phoneNumber: this.data.entInfo.tel,
        })
    },
    closeEntToast:function(){
      this.setData({ showEntScreenView :false})
    }
});