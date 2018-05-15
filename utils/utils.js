// 获取 电影数据
const getMovieList  =  (url, dataKey, catTitle, reformData) => {
  wx.request({
    url: url,
    method: 'GET',
    success (res) {
      if (catTitle) {
        reformData(res.data.subjects, dataKey, catTitle)
      } else {
        reformData(res.data.subjects)
      }
      
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