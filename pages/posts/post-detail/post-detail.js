const postsData = require('../../../data/posts-data.js')
Page({
  onLoad (opt) {
    let curPostId = opt.curPostId
    this.data.curPostId = curPostId
    postsData.postList.some((value, index) => {
      if (value.postId == curPostId) {
        // this.setData 会在 onLoad 结束前执行完成 
        this.setData({
          curPostInfo: value
        })
        return true
      }
    })
    var collected = wx.getStorageSync('colCache')
    if (collected) {
      this.setData({
        collected: collected[curPostId] || false
      })
    } else {
      let collections = {}
      collections[curPostId] = false
      wx.setStorageSync('colCache', collections) 
      this.setData({
        collected: false
      })
    }
  },
  isCol () {
    this.setData({
      collected: !this.data.collected
    })
    let collections = wx.getStorageSync('colCache')
    collections[this.data.curPostId] = this.data.collected
    wx.setStorageSync('colCache', collections)
    wx.showToast({
      title: this.data.collected ? '收藏成功' : '取消收藏',
      duration: 1000,
      icon: this.data.collected ? 'success' : 'none'
    })
  },
  shareTo () {
  this.showActionSheet()
  },
  showActionSheet () {
    let that = this
    wx.showActionSheet({
      itemList: [
        '分享到朋友',
        '分享到朋友圈',
        '随便点反正也分享不出去'
      ],
      itemColor: '#405f80',
      success (res) {
        console.log(res.tapIndex)
      },
      fail (res) {
        that.showModal()
      }
    })
  },
  showModal () {
    wx.showModal({
      title: '一个模态框',
      content: '这是一个测试模态框',
      cancelColor: 'red',
      confirmColor: '405f80',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})