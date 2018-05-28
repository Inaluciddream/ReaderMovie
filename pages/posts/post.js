const postsData = require('../../data/posts-data.js')
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
      url: './post-detail/post-detail?curPostId=' + postId
    })
  },
  onShareAppMessage () {
    return {
      title: '离思五首·其四',
      desc: '曾经沧海难为水，除却巫山不是云',
      path: '/pages/posts/post-detail/post-detail?id=5'
  }
  }
})