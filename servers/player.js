import request from "../servers/request";

export function getMusicInfo(ids) {
  return request.get("/song/detail", { ids });
}
export function getMusicGc(id) {
  return request.get("/lyric", { id });
}
