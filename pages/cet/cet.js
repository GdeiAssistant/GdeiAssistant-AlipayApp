import utils from '/utils/utils.js';

Page({
  data: {
    cet: null,
    checkcodeImage: null,
    loading: false
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
  formSubmit(e) {
    var page = this;
    var name = e.detail.value.name;
    var number = e.detail.value.number;
    var checkcode = e.detail.value.checkcode;
    if (name && number && checkcode) {
      my.showNavigationBarLoading();
      this.setData({
        loading: true
      });
      var requestData = {
        name: name,
        number: number,
        checkcode: checkcode
      };
      my.httpRequest({
        url: 'https://www.gdeiassistant.cn/rest/cetquery',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: requestData,
        success: function (result) {
          my.hideNavigationBarLoading();
          page.setData({
            loading: false
          });
          if (result.data.success) {
            page.setData({
              cet: {
                name: result.data.data.name,
                school: result.data.data.school,
                type: result.data.data.type,
                admissionCard: result.data.data.admissionCard,
                totalScore: result.data.data.totalScore,
                listeningScore: result.data.data.listeningScore,
                readingScore: result.data.data.readingScore,
                writingAndTranslatingScore: result.data.data.writingAndTranslatingScore
              }
            });
          } else {
            utils.showAlertModalAndGoBack('查询失败', result.data.errorMessage);
          }
        },
        fail: function () {
          my.hideNavigationBarLoading();
          page.setData({
            loading: false
          });
          utils.showAlertModalAndGoBack('查询失败', '网络连接超时，请重试');
        }
      });
    } else {
      this.showTopTips('请填写查询信息');
    }
  },
  loadCheckCodeImage() {
    var page = this;
    my.httpRequest({
      url: 'https://www.gdeiassistant.cn/rest/cet/checkcode',
      success: function (result) {
        if (result.status == 200) {
          if (result.data.success) {
            page.setData({
              checkcodeImage: 'data:image/jpg;base64,' + result.data.data,
            });
          } else {
            utils.showAlertModalAndGoBack('加载验证码图片失败', result.data.message);
          }
        }
        else {
          utils.showAlertModalAndGoBack('查询失败', '服务暂不可用，请稍后再试');
        }
      },
      fail: function () {
        utils.showAlertModalAndGoBack('查询失败', '网络连接超时，请重试');
      }
    });
  },
  onLoad() {
    this.loadCheckCodeImage();
  }
});