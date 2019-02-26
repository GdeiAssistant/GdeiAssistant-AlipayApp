import utils from '/utils/utils.js';

Page({
  data: {
    card: null
  },
  getCardInfo() {
    var page = this;
    my.showNavigationBarLoading();
    if (utils.validateRequestAccess()) {
      var token = my.getStorageSync({ key: 'accessToken' }).data;
      my.httpRequest({
        url: 'https://www.gdeiassistant.cn/rest/cardinfo',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          token: token.signature
        },
        success: function (result) {
          my.hideNavigationBarLoading();
          if (result.status == 200) {
            if (result.data.success) {
              page.setData({
                card: {
                  name: result.data.data.name,
                  number: result.data.data.number,
                  cardBalance: result.data.data.cardBalance,
                  cardInterimBalance: result.data.data.cardInterimBalance,
                  cardNumber: result.data.data.cardNumber,
                  cardLostState: result.data.data.cardLostState,
                  cardFreezeState: result.data.data.cardFreezeState
                }
              });
            } else {
              utils.showAlertModalAndGoBack('查询失败', result.data.message);
            }
          } else {
            utils.showAlertModalAndGoBack('查询失败', '服务暂不可用，请稍后再试');
          }
        },
        fail: function fail() {
          my.hideNavigationBarLoading();
          utils.showAlertModalAndGoBack('查询失败', '网络连接超时，请重试');
        }
      });
    }
  },
  onLoad() {
    this.getCardInfo();
  }
});
