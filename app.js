App({
  data: {
    // 当前播放音乐对应ID
    g_curMusicId: null,
    // 上次暂停音乐对应ID
    g_pauseMusicId: null,
    // 豆瓣 baseURL
    // 七月老师接口 (好像出问题了, 信息不是最新的)
    g_baseUrl: 'http://t.yushu.im/v2/movie/'
    // 汪磊老师的接口 一小时100次
    // g_baseUrl: 'https://douban.uieee.com/v2/movie/'
  }
})