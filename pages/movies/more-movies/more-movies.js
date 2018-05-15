const app = getApp()
const {getMovieList} = require('../../../utils/utils.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (opt) {
    this.setData({
      title: opt.currentTitle
    })
    let url = app.data.g_baseUrl
    let dataKey = ''
    switch (this.data.title) {
      case '正在热映':
      url += 'in_theaters'
      dataKey = 'inTheaters'
      break;
      case '即将上映':
      url += 'coming_soon'
      dataKey = 'comingSoon'
      break;
      case '豆瓣Top250':
      url += 'top250'
      dataKey = 'top250'
      break;
    }
    console.log(url)
    getMovieList(url, dataKey, null, this.reformData)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    wx.setNavigationBarTitle({
      title: this.data.title 
    })
  },

  reformData (data) {
    let movies = []
    data.forEach((item, i) => {
      let coverImg = item.images.large
      let title = item.title.length > 6 ? item.title.substr(0,6) + '...' :  item.title
      let rating = {average: item.rating.average}
      let starArr = []
      for(let n = 0; n < 5; n++ ) {
        if (n < item.rating.stars / 10) {
          starArr.push(1)
        } else {
          starArr.push(0)
        }
      }

      rating.stars = starArr
      let temp = {coverImg, title, rating}
      movies.push(temp)
    })
    // 动态赋值 setData 里需要的是一个 对象 
    // 使用动态赋值 setData 就可以 给this.data 赋予不同的 键值
    this.setData({movies})
  }
})