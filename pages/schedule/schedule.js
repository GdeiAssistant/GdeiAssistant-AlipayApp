import utils from '/utils/utils.js';

Page({
  data: {
    index: 0,
    array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    scheduleList: null,
    week: null,
    tabs: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    activeIndex: 0
  },
  tabClick(e) {
    this.setData({
      activeIndex: e.currentTarget.id
    });
  },
  bindPickerChange(e) {
    this.setData({
      week: parseInt(e.detail.value) + 1
    });
    this.loadSchedule(parseInt(e.detail.value) + 1);
  },
  loadSchedule(week) {
    var page = this;
    my.showNavigationBarLoading();
    if (utils.validateRequestAccess()) {
      var token = my.getStorageSync({ key: 'accessToken' }).data;
      var requestData = week ? {
        token: token.signature,
        week: this.data.week
      } : { token: token.signature };
      my.httpRequest({
        url: 'https://www.gdeiassistant.cn/rest/schedulequery',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: requestData,
        success: function (result) {
          my.hideNavigationBarLoading();
          if (result.status == 200) {
            if (result.data.success) {
              var list = [[], [], [], [], [], [], []];
              result.data.data.scheduleList.forEach(function (e) {
                list[e.column].push(e);
              });
              if (!page.data.week) {
                page.setData({
                  index: parseInt(result.data.data.week) - 1
                });
              }
              page.setData({
                scheduleList: list,
                week: result.data.data.week
              });
            } else {
              utils.showAlertModalAndGoBack('查询失败', result.data.message);
            }
          } else {
            utils.showAlertModalAndGoBack('查询失败', '服务暂不可用，请稍后再试');
          }
        },
        fail: function () {
          my.hideNavigationBarLoading();
          utils.showAlertModalAndGoBack('查询失败', '网络连接超时，请重试');
        }
      });
    }
  },
  onLoad() {
    this.loadSchedule(null);
  }
});
