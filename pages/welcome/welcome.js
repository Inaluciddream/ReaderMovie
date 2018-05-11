Page({
  toIndex: function () {
    console.log(1)
    wx.navigateTo({
      url: '/pages/posts/post'
    })
    // wx.redirectTo({
    //   url: '/pages/posts/post'
    // })
  }
})