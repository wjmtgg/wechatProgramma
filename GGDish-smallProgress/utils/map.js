var bmap = require('../libs/bmap-wx/bmap-wx.min.js'); 
var constants = require('../utils/constants.js');

function QnMap(){
     function Map() {
        let pages = getCurrentPages();
        let curPage = pages[pages.length - 1];
        this.__page = curPage;
        curPage.Map = this;
         // 新建bmap对象   
        var BMap = new bmap.BMapWX({   
            ak: constants.BMAP_AK 
        });   
        this.BMap = BMap;
        return this;
    }

     Map.prototype.autoLocation = function (initData){
        var __page = this.__page;
        /* 获取定位地理位置 */  
       
        var fail = function(data) {
            console.log('定位失败');
            console.log(data); 
            // wx.setStorageSync('longitude', '116.33956436939')
            // wx.setStorageSync('latitude', '39.972183867663')
            if (!wx.getStorageSync('longitude')){
              if (__page.qnLoading) __page.qnLoading.hide();
            }
            // else {//从缓存中获取加载数据
            //   if (initData) initData();
            // }           
            
        };   
        var success = function(data) {   
        //返回数据内，已经包含经纬度  
          
            console.log(data);  
            //使用wxMarkerData获取数据  
            let wxMarkerData = data.wxMarkerData;    
            console.log('定位成功：' + wxMarkerData[0].address);
            //把所有数据放在初始化data内  
            __page.setData({   
                markers: wxMarkerData,  
                latitude: wxMarkerData[0].latitude,  
                longitude: wxMarkerData[0].longitude,  
                address: wxMarkerData[0].address,  
                cityInfo: data.originalData.result.addressComponent,
                showLocationFail: false
            });
            if (!wx.getStorageSync('longitude')){
              wx.setStorageSync('longitude', wxMarkerData[0].longitude);
              wx.setStorageSync('latitude', wxMarkerData[0].latitude);
              wx.setStorageSync('currentCity', data.originalData.result.addressComponent.city);
              wx.setStorageSync('locationRegion', wxMarkerData[0].address); 
            }
            
            
            console.log('定位维度'+__page.data.latitude);
            if (initData) initData();
            // if (__page.initData) __page.initData(true);
        }   
        // 发起regeocoding检索请求   
        this.BMap.regeocoding({   
            fail: fail,   
            success: success  
        });   
    }
    // query是绑定的输入框内容 region是城市名
    Map.prototype.hotWordsLenovo = function(region,query){
        var that = this;
        var fail = function(data) { 
            console.log('联想失败'+data) 
            that.__page.setData({ 
                sugData: []
            }); 
        }; 
        var success = function(data) { 
            
            var sugData = []; 
            
            for(var i = 0; i < data.result.length; i++) { 
                
                var region = {
                  latitude: data.result[i].location ? data.result[i].location.lat : '',
                  longitude: data.result[i].location ? data.result[i].location.lng :'',
                  name: data.result[i].name
                }
                sugData.push(region); 

            } 
            that.__page.setData({ 
                sugData: sugData 
            }); 
            console.log('热词联想' + that.__page.data.sugData);
            
        } 
       // 发起suggestion检索请求 
        this.BMap.suggestion({ 
            query: query, 
            region: region, 
            city_limit: true, 
            fail: fail, 
            success: success 
        }); 
    }

    return new Map();
}
module.exports = {
    QnMap: QnMap
}