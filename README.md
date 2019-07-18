<p align="center">
  <img width="300" src="./github/logo.png">
</p>

# 广东二师助手支付宝小程序

**广东第二师范学院校园助手系统支付宝小程序客户端**，由多端统一开发框架Taro和支付宝小程序开发者工具经转编译和少量修改实现。小程序利用蚂蚁金服开放平台提供的API接口和框架组件，简单实现了校园查询基础服务。UI页面设计遵循支付宝小程序的设计规范，且引入了基于小程序自定义组件规范开发的开源UI组件库——小程序拓展组件，提供了更为丰富的用户交互效果和更为优秀的用户体验。应用的后端API数据接口由广东第二师范学院校园助手系统提供。

## 功能

- 成绩查询
- 课表查询
- 四六级查询
- 一键评教
- 消费查询
- 馆藏查询
- 校园卡查询
- 校园卡挂失
- 校园卡充值

## 预览

<p>
  <img width="250" src="./github/screenshot_01.png">
  <img width="250" src="./github/screenshot_02.png">
  <img width="250" src="./github/screenshot_03.png">
</p>

## 体验

因支付宝小程序暂未开放个人注册，请下载项目到本地进行预览。

### 体验用户账号

为便于非在校师生用户体验和测试应用，应用提供了体验用户账号。详情请查阅 [广东二师助手体验用户账号说明](https://github.com/GdeiAssistant/GdeiAssistant#%E4%BD%93%E9%AA%8C)

## 初始化

### 克隆仓库

```bash
$ git clone https://github.com/GdeiAssistant/GdeiAssistant-AlipayApp.git
```

### 配置参数

项目的配置参数被保存在项目目录下的data/data.js中

1. **防重放攻击**：requestValidateToken是移动端请求服务端的拥有防重放攻击保护的数据接口时，需要携带的令牌信息。该令牌信息应该与服务端中配置的防重放攻击令牌值相同，否则校验无法通过。详情请参考 [广东第二师范学院校园助手系统初始化配置文件说明](https://github.com/GdeiAssistant/GdeiAssistant/blob/master/README.md#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)

## 数据接口

广东二师助手支付宝小程序的后端API数据接口由[广东第二师范学院校园助手系统](https://github.com/GdeiAssistant/GdeiAssistant)提供

数据接口API文档说明请查阅[广东第二师范学院校园助手系统数据接口API文档](https://github.com/GdeiAssistant/GdeiAssistant/wiki)

## 协议

[MIT License](http://opensource.org/licenses/MIT)

[Anti 996 License](https://github.com/996icu/996.ICU/blob/master/LICENSE)

Copyright (c) 2016 - 2019 GdeiAssistant

## 贡献

- 若你喜欢本项目，欢迎Star本项目

- 要贡献代码，欢迎Fork之后再提交[Pull Request](https://github.com/GdeiAssistant/GdeiAssistant-AlipayApp/pulls)

- 如果你有好的意见或建议，欢迎给我们提交[Issue](https://github.com/GdeiAssistant/GdeiAssistant-AlipayApp/issues)

## 联系

- 技术支持和意见建议反馈：[gdeiassistant@gmail.com](mailto:gdeiassistant@gmail.com)

- 用户客服和系统故障工单提交：[support@gdeiassistant.cn](mailto:support@gdeiassistant.cn)

- 社区违法和不良信息举报邮箱：[report@gdeiassistant.cn](mailto:report@gdeiassistant.cn)

## 特别鸣谢

感谢以下框架的开发者为本应用作出的巨大贡献

- [Taro](https://github.com/NervJS/taro)

- [Mini AntUI](https://github.com/ant-mini-program/mini-antui)

## 声明

本项目只用作个人学习研究，如因使用本项目导致任何损失，本人概不负责。
