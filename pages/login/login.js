import utils from '/utils/utils.js';
import globalData from '/data/data.js';

Page({
  data: {
    login: false,
    unionid: null,
    username: null,
    password: null
  },
  onLoad() {
    var page = this;
    var accessToken = my.getStorageSync({ key: 'accessToken' }).data;
    var refreshToken = my.getStorageSync({ key: 'refreshToken' }).data;
    if (accessToken != null && refreshToken != null) {
      //校验时间戳
      if (utils.validateTokenTimestamp(accessToken.expireTime)) {
        //权限令牌有效，进入功能主页
        my.redirectTo({
          url: '../index/index'
        });
      } else {
        if (utils.validateTokenTimestamp(refreshToken.expireTime)) {
          //使用刷新令牌刷新令牌信息
          my.httpRequest({
            url: 'https://www.gdeiassistant.cn/rest/token/refresh',
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
              token: refreshToken.signature
            },
            success: function (result) {
              if (result.status == 200) {
                if (result.data.success) {
                  my.setStorageSync({ key: 'accessToken', data: result.data.data.accessToken });
                  my.setStorageSync({ key: 'refreshToken', data: result.data.data.refreshToken });
                  my.redirectTo({
                    url: '../index/index'
                  });
                } else {
                  utils.showAlertModal('更新令牌失败，请尝试重新登录', result.data.message);
                  page.setData({
                    login: true
                  });
                }
              } else {
                utils.showAlertModal('更新令牌失败，请尝试重新登录', '服务暂不可用，请稍后再试，错误信息为：' + result.data.message);
                page.setData({
                  login: true
                });
              }
            },
            fail: function () {
              utils.showAlertModal('网络异常', '请检查网络连接');
            }
          });
        } else {
          utils.showAlertModal('登录凭证过期', '请重新登录');
          page.setData({
            login: true
          });
        }
      }
    } else {
      //加载用户唯一标识ID
      my.getAuthCode({
        scopes: 'auth_base',
        success: (res) => {
          if (res.authCode) {
            my.httpRequest({
              url: 'https://www.gdeiassistant.cn/alipay/app/userid',
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data: {
                code: res.authCode
              },
              success: function (result) {
                if (result.status == 200) {
                  if (result.data.success) {
                    page.setData({
                      unionid: result.data.data,
                      login: true
                    });
                  } else {
                    utils.showAlertModal('登录失败', result.data.message);
                  }
                } else {
                  utils.showAlertModal('登录失败', '服务暂不可用，请稍后再试');
                }
              },
              fail: function () {
                utils.showAlertModal('网络异常', '请检查网络连接');
              }
            });
          }
          else {
            utils.showAlertModal('登录失败', '加载支付宝用户唯一标识异常');
          }
        },
      });
    }
  },
  userLogin(e) {
    var page = this;
    var username = e.detail.value.username;
    var password = e.detail.value.password;
    if (username && password) {
      //生成时间戳和随机值
      var nonce = Math.random().toString(36).substr(2, 15);
      var timestamp = new Date().getTime();
      //进行摘要签名
      var signature = utils.sha1Hex(timestamp + nonce + globalData.requestValidateToken);
      my.showNavigationBarLoading();
      my.httpRequest({
        url: 'https://www.gdeiassistant.cn/rest/userlogin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          unionid: page.data.unionid,
          username: username,
          password: password,
          nonce: nonce,
          timestamp: timestamp,
          signature: signature
        },
        success: function (result) {
          my.hideNavigationBarLoading();
          if (result.status == 200) {
            if (result.data.success) {
              var username = result.data.data.user.username;
              var accessToken = result.data.data.accessToken;
              var refreshToken = result.data.data.refreshToken;
              my.setStorageSync({ key: 'username', data: username });
              my.setStorageSync({ key: 'accessToken', data: accessToken });
              my.setStorageSync({ key: 'refreshToken', data: refreshToken });
              my.redirectTo({
                url: '../index/index'
              });
            } else {
              utils.showAlertModal('登录失败', result.data.message);
            }
          } else {
            utils.showAlertModal('登录失败', '服务暂不可用，请稍后再试，错误信息为：' + result.data.message);
          }
        },
        fail: function () {
          utils.showAlertModal('登录失败', '网络连接超时，请重试');
        }
      });
    } else {
      utils.showAlertModal('请填写教务系统信息', '教务系统账号和密码不能为空');
    }
  }
});
