export default function quertSelect(selector) {
  return new Promise((resolve) => {
    const query = wx.createSelectorQuery();
    query.select(selector).boundingClientRect();
    query.exec((res) => {
      resolve(res);
    });
  });
}
