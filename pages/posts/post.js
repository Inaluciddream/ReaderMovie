var postsData = require('../../data/posts-data.js')
Page({
  data: {},
  onLoad () {
    this.setData({
      postsList: postsData
    })
  },
  toDetail (event) {
    let postId = event.currentTarget.dataset.postid
    wx.navigateTo({
      url: './post-detail/post-detail',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
})