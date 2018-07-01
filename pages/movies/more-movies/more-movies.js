const app = getApp()
const {getMovieList, movieDetail} = require('../../../utils/utils.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    switchFlag : true,
    title: '',
    count: 20,
    dataUrl: '',
    total: 0,
    prompt: false,
    movies: [],
    loadCount: 0,
    isFirstLoad: true,
    isAllowSkip: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (opt) {
    this.setData({
      title: opt.currentTitle
    })
    this.firstLoad()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    wx.setNavigationBarTitle({
      title: this.data.title 
    })
    this.setData({
      isAllowSkip: true
    })
  },
  reformData (data) {
    let movies = this.data.movies
    let total = data.total
    let loadCount = data.count
    if (!this.data.isFirstLoad) {
      if (this.data.total - this.data.loadCount - this.data.count >= 0) {
        loadCount = data.count + data.start
        console.log(loadCount)
      } else {
        loadCount = this.data.total
      }
    }
   
    
    data.subjects.forEach((item, i) => {
      let coverImg = item.images.large
      let title = item.title.length > 6 ? item.title.substr(0,6) + '...' :  item.title
      let rating = {average: item.rating.average}
      let id = item.id
      let starArr = []
      for(let n = 0; n < 5; n++ ) {
        if (n < item.rating.stars / 10) {
          starArr.push(1)
        } else {
          starArr.push(0)
        }
      }

      rating.stars = starArr
      let temp = {coverImg, title, rating, id}
      movies.push(temp)
    })
    // 动态赋值 setData 里需要的是一个 对象 
    // 使用动态赋值 setData 就可以 给this.data 赋予不同的 键值

    // 打开节流开关
    if (this.data.isFirstLoad) {
      this.setData({movies, total, loadCount, switchFlag: true, isFirstLoad: false})
    } else {
      this.setData({movies, total, loadCount, switchFlag: true})
    }
    setTimeout(() => {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }, 500)
  },
  //上滑加载
  onReachBottom () {
    if (this.data.switchFlag) {
      if (this.data.loadCount === this.data.total) {
        if(!this.prompt) {
          this.setData({
            prompt: true
          })
        }
        return
      }
      if (!this.data.switchFlag) return
      wx.showNavigationBarLoading()
      this.setData({
        switchFlag: false
      })
      let url = this.data.dataUrl + '?start=' + this.data.loadCount + '&count=' + this.data.count
      getMovieList(url, this.data.dataKey, null, this.reformData)
      // getMovieList(url, dataKey, null, this.reformData)
    }
  },
  // 下拉刷新
  onPullDownRefresh () {
    this.setData({
      witchFlag: true,
      movies: [],
      isFirstLoad: true
    })
    this.firstLoad()
  },
  // 第一次加载
  firstLoad () {
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
    this.setData({
      dataUrl: url,
      dataKey: dataKey
    })
    // this.data.dataUrl = url
    // this.data.dataKey = dataKey
    getMovieList(url, dataKey, null, this.reformData)
  },
  toMovieDetail (e) {
    console.log(e)
    if (!this.data.isAllowSkip) return
    this.setData({
      isAllowSkip: false
    })
    let url = "/pages/movies/movie-detail/movie-detail" + '?id=' + e.currentTarget.dataset.movieid
    movieDetail(url)
  }
})