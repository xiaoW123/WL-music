import request from "./request";

// 获取推荐视频列表数据
export function getTopMV(offset = 0, limit = 20) {
  console.log(offset + "===========" + limit);
  return request.get("/top/mv", {
    limit,
    offset,
  });
}

// 获取video详情数据
export function getVideoDetailInfo(videoId) {
  return request.get("/mv/detail", { mvid: videoId });
}

/**
 * 获取mv的url
 */
export function getVideoMvUrl(id) {
  return request.get('/mv/url',{id})
}


/**
 * 获取相关视频
 */
 export function getRelatedVideo(id){
return request.get('/related/allvideo',{ id })
 }
