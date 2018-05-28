Page({
  toIndex: function () {
    console.log(1)
    wx.switchTab({
      url: '/pages/posts/post'
    })
    // wx.redirectTo({
    //   url: '/pages/posts/post'
    // })
  }
})