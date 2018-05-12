const app = getApp()
const {getMovieList} = require('../../utils/utils.js')

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
    let that = this
    getMovieList(inTheatersUrl, 'inTheaters', '正在热映', this.reformData)
    getMovieList(comingSoonUrl, 'comingSoon', '即将上映', this.reformData)
    getMovieList(top250Url, 'top250', '豆瓣Top250', this.reformData)
  },

  // 处理 接口来的数据 提取出想要的数据
  reformData (data, dataKey, catTitle) {
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
    let tempObj = {}
    tempObj[dataKey] = {movies, catTitle}
    this.setData(tempObj)
  }

})