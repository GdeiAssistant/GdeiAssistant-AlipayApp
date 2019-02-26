import utils from '/utils/utils.js';

Page({
  data: {
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
  setCardLost(e) {
    var page = this;
    if (utils.validateRequestAccess()) {
      var token = my.getStorageSync({ key: 'accessToken' });
      var cardPassword = e.detail.value.password;
      if (cardPassword && cardPassword.length == 6 && /^\d+$/.test(cardPassword)) {
        my.showNavigationBarLoading();
        this.setData({
          loading: true
        });
        my.httpRequest({
          url: 'https://www.gdeiassistant.cn/rest/cardlost',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: {
            token: token.signature,
            cardPassword: cardPassword
          },
          success: function (result) {
            my.hideNavigationBarLoading();
            page.setData({
              loading: false
            });
            if (result.status == 200) {
              if (result.data.success) {
                utils.showAlertModalAndGoBack('挂失成功', '请尽快前往办卡处进行校园卡补办');
              } else {
                page.showTopTips(result.data.message);
              }
            } else {
              page.showAlertModalAndGoBack('服务暂不可用，请稍后再试');
            }
          },
          fail: function () {
            my.hideNavigationBarLoading();
            page.setData({
              loading: false
            });
            page.showTopTips('网络连接超时，请重试');
          }
        });
      } else {
        this.showTopTips('请输入正确的校园卡查询密码');
      }
    }
  },
  onLoad() { },
});
