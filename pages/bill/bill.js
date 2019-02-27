import utils from '/utils/utils.js';

Page({
  data: {
    date: new Date(),
    result: null,
    loading: false,
    errorMessage: null
  },
  reset() {
    this.setData({
      date: null,
      result: null,
      loading: false
    });
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
  onSelectDate(e) {
    this.setData({
      date: e[0]
    })
  },
  submit() {
    var page = this;
    if (this.data.date) {
      var days = utils.calculateDateDifference(this.data.date);
      if (days <= 0 && days >= -365) {
        my.showNavigationBarLoading();
        this.setData({
          loading: true
        });
        var year = this.data.date.getFullYear();
        var month = this.data.date.getMonth() + 1;
        var date = this.data.date.getDate();
        var token = my.getStorageSync({ key: 'accessToken' }).data;
        if (utils.validateRequestAccess()) {
          my.httpRequest({
            url: 'https://www.gdeiassistant.cn/rest/cardquery',
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
              token: token.signature,
              year: year,
              month: month,
              date: date
            },
            success: function (result) {
              my.hideNavigationBarLoading();
              page.setData({
                loading: false
              });
              if (result.status == 200) {
                if (result.data.success) {
                  page.setData({
                    result: result.data.data.cardList
                  });
                } else {
                  utils.showAlertModal('查询失败', result.data.message);
                }
              } else {
                utils.showAlertModal('查询失败', '服务暂不可用，请稍后再试');
              }
            },
            fail: function () {
              my.hideNavigationBarLoading();
              page.setData({
                loading: false
              });
              utils.showAlertModal('查询失败', '网络连接超时，请重试');
            }
          });
        }
      }
      else {
        this.showTopTips('仅支持查询一年内的消费记录');
      }
    }
    else {
      this.showTopTips('请选择需要查询的日期');
    }
  },
  onLoad() {

  }
});
