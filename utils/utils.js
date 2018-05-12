// 获取 电影数据
const getMovieList  =  (url, dataKey, catTitle, reformData) => {
  wx.request({
    url: url,
    method: 'GET',
    success (res) {
      reformData(res.data.subjects, dataKey, catTitle)
    },
    fail (res) {
      console.log('加载失败')
    },
    header: {
      "Content-Type": "json"
    }
  }) 
}

module.exports = {getMovieList}