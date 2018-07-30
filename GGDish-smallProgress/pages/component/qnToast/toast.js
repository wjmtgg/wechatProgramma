var Utils = require('../../../utils/util.js');

function QnToast() {
Toast.prototype.WARN_IMG_TYPE='warnImg';
Toast.prototype.LOAD_IMT_TYPE='loading';
var defaults={
    toastType:'',
    toastContent:'',
    alwayShow:false
}

    function Toast() {
        let pages = getCurrentPages();
        let curPage = pages[pages.length - 1];
        this.__page = curPage;
        curPage.Toast = this;
        return this;
    }

    Toast.prototype.showTip = function (content) {
        let page = this.__page;
        var param =  Utils.deepCopy(defaults);
        param.toastContent = content;
        page.setData(param     
        );
        this.show();
    }
  
    Toast.prototype.showTipAuto = function(option){
        let page = this.__page;
        var param = Utils.deepCopy(defaults);
        Object.assign(param,option);
        page.setData(param       
        );
        this.show();

    }

    Toast.prototype.show=function(){
        let page = this.__page;
        page.setData({
            toastShow:true
        });
        var that=this;
        setTimeout(function(){
            that.hide();
        },2000);
    }
    //不主动消失
    Toast.prototype.showAlways = function (option){
      let page = this.__page;
      var param = Utils.deepCopy(defaults);
      Object.assign(param, option);
      page.setData(param
      );
      page.setData({
        toastShow: true
      });
    }

    Toast.prototype.hide=function(){
         let page = this.__page;
        page.setData({
            toastShow:false
        });
    }



    return new Toast();
};

module.exports = {
    toast: QnToast
}