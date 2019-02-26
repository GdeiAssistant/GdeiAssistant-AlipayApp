import utils from '/utils/utils.js';

Page({
  data: {
    list: [],
    bookname: null,
    currentPage: 0,
    sumPage: 0,
    hasMore: false,
    loading: false
  },
  showTopTips() {
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
    var bookname = e.detail.value.bookname;
    if (!bookname || bookname.length == 0) {
      this.showTopTips('请填写要查询的书名');
    } else {
      var requestData = {
        bookname: bookname,
        page: 1
      };
      this.setData({
        loading: true
      });
      my.showNavigationBarLoading();
      my.httpRequest({
        url: 'https://www.gdeiassistant.cn/rest/collectionquery',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: requestData,
        success: function (result) {
          page.setData({
            loading: false
          });
          my.hideNavigationBarLoading();
          if (result.data.success) {
            if (result.data.collectionList.length == 0) {
              page.showTopTips('没有找到对应的图书信息');
            } else {
              var list = page.data.list;
              result.data.collectionList.forEach(function (e) {
                list.push(e);
              });
              page.setData({
                bookname: bookname,
                list: list,
                currentPage: 1,
                sumPage: result.data.sumPage
              });
            }
          } else {
            page.showTopTips(result.data.message);
          }
        },
        fail: function fail() {
          page.setData({
            loading: false
          });
          my.hideNavigationBarLoading();
          page.showTopTips('网络连接超时，请重试');
        }
      });
    }
  },
  loadMore() {
    var page = this;
    my.showLoading({
      title: '数据加载中',
      mask: true
    });
    var requestData = {
      bookname: this.data.bookname,
      page: this.data.currentPage + 1
    };
    my.httpRequest({
      url: 'https://www.gdeiassistant.cn/rest/collectionquery',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: requestData,
      success: function (result) {
        if (result.data.success) {
          if (result.data.collectionList.length == 0) {
            page.showTopTips('没有更多图书信息');
            my.hideLoading();
          } else {
            var list = page.data.list;
            result.data.collectionList.forEach(function (e) {
              list.push(e);
            });
            page.setData({
              list: list,
              currentPage: page.data.currentPage + 1
            });
            my.hideLoading();
          }
        } else {
          page.showTopTips(result.data.errorMessage);
          my.hideLoading();
        }
      },
      fail: function () {
        page.showTopTips('网络连接超时，请重试');
        my.hideLoading();
      }
    });
  },
  onLoad() { },
});
