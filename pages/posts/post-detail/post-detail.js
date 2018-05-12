const postsData = require('../../../data/posts-data.js')

const app = getApp()

Page({
  data: {
    isPause: true
  },
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
    let collected = wx.getStorageSync('colCache')
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
      this.getCurIsPause(curPostId)
  },
  // 收藏 
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
  // 分享
  shareTo () {
  this.showActionSheet()
  },
  // 底部提示栏
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
  // 模态框
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
  },
  // 播放
  ctrlMusic (event) {
    let info = this.data.curPostInfo.music
    if (this.data.isPause) {
      wx.playBackgroundAudio({
        dataUrl: info.url,
        title: info.title,
        coverImgUrl: info.coverImg
      })
      app.data.g_curMusicId = app.data.g_pauseMusicId = this.data.curPostId
    } else {
      wx.pauseBackgroundAudio()
    }
    this.setData({
      isPause: !this.data.isPause
    })
  },
  // 当前播放状态
  getCurIsPause (curId) {
    wx.onBackgroundAudioPlay(() => {
      let curPages = getCurrentPages()
      let curmId = curPages[curPages.length-1].data.curPostId
      if (curmId && curmId === app.data.g_pauseMusicId) {
        this.setData({
          isPause: false
        })
      }
      if (app.data.g_pauseMusicId) {
        app.data.g_curMusicId = app.data.g_pauseMusicId
      }
    })
    wx.onBackgroundAudioPause(() => {
      let curPages = getCurrentPages()
      let curmId = curPages[curPages.length-1].data.curPostId
      if (curmId && curmId === app.data.g_curMusicId) {
        console.log(curId)
        this.setData({
          isPause: true
        })
      }
      // app.data.g_pauseMusicId = app.data.g_curMusicId
      app.data.g_curMusicId = null
    })
    
    if (app.data.g_curMusicId === curId) {
      this.setData({
        isPause: false
      })
    }

  }
})