import utils from '/utils/utils.js';

Page({
  data: {
    query: null,
    result: null
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
  onLoad(options) {
    var page = this;
    my.setNavigationBar({
      title: options.bookname,
      success: (res) => {
        this.setData({
          query: {
            opacUrl: options.opacUrl,
            page: options.page,
            schoolId: options.schoolId,
            search: options.search,
            searchtype: options.searchtype,
            xc: options.xc
          }
        });
        my.showNavigationBarLoading();
        my.httpRequest({
          url: 'https://www.gdeiassistant.cn/rest/collectiondetail',
          method: 'POST',
          data: this.data.query,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (result) {
            my.hideNavigationBarLoading();
            if (result.data.success) {
              var detail = result.data.data;
              if (detail.principal.split(' ').length != 1) {
                detail.autograph = detail.principal.split(' ')[0];
                detail.director = detail.principal.split(' ')[1];
              }
              if (detail.publishingHouse.split(' ').length != 1) {
                detail.house = detail.publishingHouse.split(' ')[0];
                detail.year = detail.publishingHouse.split(' ')[1];
              }
              if (detail.price.split(' ').length != 1) {
                detail.ISBN = detail.price.split(' ')[0];
                detail.priceValue = detail.price.split(' ')[1];
              }
              page.setData({
                result: detail
              });
            } else {
              page.showTopTips(result.data.errorMessage);
            }
          },
          fail: function () {
            my.hideNavigationBarLoading();
            page.showTopTips('网络连接超时');
          }
        });
      }
    });
  }
});
