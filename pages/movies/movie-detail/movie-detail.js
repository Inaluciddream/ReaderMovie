const app = getApp()
const {getMovieList} = require('../../../utils/utils')
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
    let movieid = opt.id 
    let url = 'https://douban.uieee.com/v2/movie/subject/' + movieid
    // let url = 'https://douban.uieee.com/v2/movie/subject/' + 26925317
    getMovieList(url, null, null, this.reformData)
  },
  reformData (data) {
    let {id, title, collect_count, wish_count, original_title, casts, summary, year, images} = data
    let rating = {average: data.rating.average}
    let starArr = []
    for(let n = 0; n < 5; n++ ) {
      if (n < data.rating.stars / 10) {
        starArr.push(1)
      } else {
        starArr.push(0)
      }
    }
    let countries = data.countries.join(' / ')
    let directors = data.directors.map(item => {
      return item.name
    }).join(' / ')
    let genres = data.genres.join('、')
    let actor = casts.map(item => {
      return item.name
    }).join(' / ');
    let movie = {id, title, countries, year, collect_count, wish_count, original_title, directors, casts, genres, summary, rating, starArr, actor, images}
    this.setData({movie})
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage () {
      return {
        title: '离思五首·其四',
        desc: '曾经沧海难为水，除却巫山不是云',
        path: '/pages/posts/post-detail/post-detail?id=0'
    }
  }
})