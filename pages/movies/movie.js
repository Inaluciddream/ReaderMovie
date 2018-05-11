const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    let inTheatersUrl = app.data.g_baseUrl + 'in_theaters?start=0&count=3'
    let comingSoonUrl = app.data.g_baseUrl + 'coming_soon?start=0&count=3'
    let top250Url = app.data.g_baseUrl + 'top250?start=0&count=3'
    this.getMovieList(inTheatersUrl, 'inTheaters', '正在热映')
    this.getMovieList(comingSoonUrl, 'comingSoon', '即将上映')
    this.getMovieList(top250Url, 'top250', '豆瓣Top250')
  },

  getMovieList (url, dataKey, catTitle) {
    let that = this
    wx.request({
      url: url,
      method: 'GET',
      success (res) {
        that.reformData(res.data.subjects, dataKey, catTitle)
      },
      fail (res) {
        console.log('加载失败')
      },
      header: {
        "Content-Type": "json"
      }
    }) 
  },
  reformData (data, dataKey, catTitle) {
    let movies = []
    data.forEach((item, i) => {
      let coverImg = item.images.large
      let title = item.title.length > 6 ? item.title.substr(0,6) + '...' :  item.title
      let rating = item.rating.average
      let temp = {coverImg, title, rating}
      movies.push(temp)
    })
    // 动态赋值 setData 里需要的是一个 对象 
    // 使用动态赋值 setData 就可以 给this.data 赋予不同的 键值
    let tempObj = {}
    tempObj[dataKey] = {movies, catTitle}
    this.setData(tempObj)
  }
})