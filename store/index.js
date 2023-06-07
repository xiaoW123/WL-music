import { getPlaylistDetail} from '../servers/music'
import {
  observable,
  action
} from 'mobx-miniprogram'

export const store = observable({
  // 数据
  recommendSongs: [],
  songListData:[],
  peakRankingList:[],
  songListItemData:[],
  musicInfo:[],
  musicGc:{},
  // 获取歌曲列表
  getRecommendSongs: action(function (step) {
    this.recommendSongs = step
  }),
  // 获取歌单
  getSongListDataAction: action(function(step){
    this.songListData = step
  }),
  // 获取巅峰榜三榜数据
  getPeakRankingList: action(function(step){
    this.peakRankingList = step
  }),
  // 热门歌单、推荐歌单的歌单列表
  getSongListItemData: action(function(step){
    this.songListItemData = step
  }),
  // 获取歌曲信息
  getMusicInfoAction:action(function(step){
    console.log(step);
    this.musicInfo = step
  }),
  // 获取歌词
  getMusicGcAction:action(function(step){ 
    console.log(step);
    this.musicGc = step

  })
})