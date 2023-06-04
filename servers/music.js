import request from "./request";

/**
 * 获取轮播数据
 * @params - type：资源类型,对应以下类型,默认为 0 即 PC；0: pc；1: android；2: iphone；3: ipad
 */
export function getSwiperInfo(type=0) {
  return request.get('/banner',{ type })
}