import utils from '/utils/utils.js';

Page({
  data: {
    checked: false,
    loading: false,
    errorMessage: null
  },
  showTopTips(content) {
    var that = this;
    this.setData({
      errorMessage: content
    });
    setTimeout(function () {
      that.setData({
        errorMessage: null
      });
    }, 3000);
  },
  formSubmit() {
    var page = this;
    if (utils.validateRequestAccess()) {
      var token = my.getStorageSync({ key: 'accessToken' }).data;
      this.setData({
        loading: true
      });
      my.showNavigationBarLoading();
      my.httpRequest({
        url: 'https://www.gdeiassistant.cn/rest/evaluate',
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          token: token.signature,
          directlySubmit: page.data.checked
        },
        success: function (result) {
          page.setData({
            loading: false
          });
          my.hideNavigationBarLoading();
          if (result.status == 200) {
            if (result.data.success) {
              if (page.data.checked) {
                utils.showAlertModal('一键评教成功', '一键评教成功，评教信息已提交');
              } else {
                utils.showAlertModal('一键评教成功', '一键评教成功，请登录教务系统进行最终确认');
              }
            } else {
              page.showTopTips(result.data.message);
            }
          } else {
            utils.showAlertModal('评教失败', '服务暂不可用，请稍后再试');
          }
        },
        fail: function () {
          page.setData({
            loading: false
          });
          my.hideNavigationBarLoading();
          page.showTopTips('网络连接超时，请重试');
        }
      });
    }
  },
  changeSwitch(e) {
    this.setData({
      checked: e.detail.value
    });
  },
  onLoad() {

  },
});
