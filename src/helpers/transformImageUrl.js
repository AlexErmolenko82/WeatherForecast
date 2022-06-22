function transformImageUrl(url) {
  //import url "//cdn.weatherapi.com/weather/64x64/day/116.png"
  let arrWords = url.split("/");
  arrWords.unshift("http:");
  arrWords.splice(arrWords.indexOf("64x64"), 1, "128x128");
  return arrWords.join("/");
}

export default transformImageUrl;
//export url "//cdn.weatherapi.com/weather/128x128/day/116.png"
