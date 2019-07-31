var currentIndex = 0
var audio = new Audio()
audio.autoplay = true

getMusicList(function(list){
  loadMusic(list[currentIndex])
})


// AJAX的封装
function getMusicList(callback){
  var xhr = new XMLHttpRequest()
  xhr.open('GET', 'https://easy-mock.com/mock/5d37b9058eedcd38cdce3042/yilia_copy', true)
  xhr.onload = function(){
    if((xhr.status >= 200 && xhr.status < 300 ) || xhr.status === 304){
      callback(JSON.parse(this.responseText))
    }else{
      console.log('获取数据失败')
    }
  }
  xhr.onerror = function(){
    console.log('网络异常')
  }
  xhr.send()
}
function loadMusic(musicObj){
  console.log('begin play', musicObj)
  audio.src = musicObj.src
}