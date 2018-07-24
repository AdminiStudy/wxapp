var util = require('./utils/util.js');
var api = require('./config/api.js');
var user = require('./services/user.js');
var catchExceptionUrl = 'https://app.yocity.cn/rest/sys/email/sendMailException?';

App({
  onLaunch: function(opt) {
    console.log(opt);
    console.log(Number(new Date()), 1);
    //获取用户的登录信息
    let that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.globalData.systemInfo = res;
      }
    });

    that.globalData.shareTickect = opt.shareTicket || '';
    that.globalData.userInfo = wx.getStorageSync('userInfo') || {};
    that.globalData.token = wx.getStorageSync('token') || '';
    that.globalData.userId = wx.getStorageSync('UserId') || 0;
    user.checkLogin().then(res => {
      console.log('app login')
    }).catch(() => {

    });

  },

  onShow: function(e) {
    console.log("App onShow", e)
  },
  onError: function(msg) {
    var subject = "微信小程序异常"
    var message = msg
    wx.request({
      url: catchExceptionUrl,
      data: {
        subject: subject,
        message: message
      },
      success: function(res) {
        console.log(res)
      }
    })
  },
  globalData: {
    userInfo: {
      nickName: 'Hi,游客',
      avatarUrl: '/static/images/icon_head_boy.png'
    },
    shareTickect: '',
    token: '',
    userId: 0,
    location: {
      lat: 23.1473150882,
      lng: 113.3463978767
    }, //默认地址,lat:纬度，lng:经度
    systemInfo: {},
    ExtranetPictureUrl: api.ExtranetPictureUrl,
  }
})