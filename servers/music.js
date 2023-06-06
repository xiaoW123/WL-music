import request from "./request";

/**
 * 获取轮播数据
 * @params - type：资源类型,对应以下类型,默认为 0 即 PC；0: pc；1: android；2: iphone；3: ipad
 */
export function getSwiperInfo(type = 0) {
  return request.get('/banner', {
    type
  })
}

/**
 * 获取歌曲排行
 * id- 新歌 id=3779629 原创 id=2884035 飙升 id=19723756 热歌 id=3778678
 */
export function getPlaylistDetail(id) {
  return request.get("/playlist/detail", {
    id
  })
}

/**
 * 获取热门歌单分类-华语-流行...
 */
export function getHotSongList() {
  return request.get('/playlist/hot')
}

/**
 * 获取歌单数据
 */
export function getSongListData(cat, limit=50) {
  return request.get('/top/playlist/', {
    cat,
    limit
  })
}

/**
 * 获取
 * 
 */