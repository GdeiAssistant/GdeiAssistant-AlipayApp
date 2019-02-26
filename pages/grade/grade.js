import utils from '/utils/utils.js';

Page({
  data: {
    tabs: ['大一', '大二', '大三', '大四'],
    firstTermGradeList: null,
    secondTermGradeList: null,
    activeIndex: -1
  },
  tabClick(e) {
    this.setData({
      activeIndex: e.currentTarget.id
    });
  },
  onLoad() {
    var page = this;
    my.showNavigationBarLoading();
    if (utils.validateRequestAccess()) {
      var token = my.getStorageSync({ key: 'accessToken' }).data;
      var year = this.data.activeIndex;
      var requestData = year == -1 ? { token: token.signature } : {
        token: token.signature,
        year: year
      }
      my.httpRequest({
        url: 'https://www.gdeiassistant.cn/rest/gradequery',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: requestData,
        success: function (result) {
          my.hideNavigationBarLoading();
          if (result.status == 200) {
            if (result.data.success) {
              page.setData({
                firstTermGradeList: result.data.data.firstTermGradeList,
                secondTermGradeList: result.data.data.secondTermGradeList,
                activeIndex: result.data.data.year
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
});
