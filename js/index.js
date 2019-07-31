
// 选择器
function $(selector){
    return document.querySelector(selector)
  }
  function $$(selector){
    return document.querySelectorAll(selector)
  }
  
  var musicList = []
  var currentIndex = 0
  var audio = new Audio()
  audio.autoplay = true
  
  // 歌曲列表
  getMusicList(function(list){
    musicList = list
    loadMusic(list[currentIndex])
    generateList(list)
  })
  
  // 事件监听（进度条和时间）
  //   audio.onplay = function(){
  //     clock = setInterval(function(){
  //     var minute = Math.floor(this.currentTime/60)
  //     var second = Math.floor(this.currentTime)%60 + ''
  //     second = second.length === 2? second : '0' + second;
  //     $('.time').innerText = minute + ':' + second 
  //     },1000)
  //   }
    
    
  audio.ontimeupdate = function(){
    setInterval(1000)
    $('.progress-now').style.width = (this.currentTime/this.duration)*350 + 'px';
    var minute = Math.floor(this.currentTime/60)
    var second = Math.floor(this.currentTime)%60 + ''
    second = second.length === 2? second : '0' + second;
    $('.time').innerText = minute + ':' + second 
  }
  
  // 播放完毕播放下一曲
    audio.onpause = function(){
      clearInterval(clock)
    }
    
    audio.onended = function(){
      currentIndex = (++currentIndex)%musicList.length
    loadMusic(musicList[currentIndex])
    }  
  
  // 调整音量
    audio.volume = 0.2
  
  // 按钮切换
  // 暂停播放
  $('.musicbox .play').onclick = function(){
    if(audio.paused){
      audio.play()
      this.querySelector('.iconfont').classList.remove('icon-bofang')
    this.querySelector('.iconfont').classList.add('icon-zanting')
    }else{
      audio.pause()
      this.querySelector('.iconfont').classList.remove('icon-zanting')
      this.querySelector('.iconfont').classList.add('icon-bofang')
    }
  }
  // 下一曲
  $('.musicbox .forward' ).onclick = function(){
    currentIndex = (++currentIndex)%musicList.length
    console.log(currentIndex)
    loadMusic(musicList[currentIndex])
  }  
  // 上一曲
  $('.musicbox .back' ).onclick = function(){
    currentIndex = (musicList.length + (--currentIndex))%musicList.length
    console.log(currentIndex)
    loadMusic(musicList[currentIndex])
  }  
  
  // 拖动进度条
  $('.bar').onclick = function(e){
    var percent = e.offsetX / parseInt(getComputedStyle(this).width)
    audio.currentTime = audio.duration * percent
  }
  // 点击列表播放音乐
  $('.list .song1').onclick = function(){
   loadMusic(musicList[currentIndex])
  }
  $('.list .song2').onclick = function(){
    currentIndex = (++currentIndex)%musicList.length
   loadMusic(musicList[currentIndex])
  }
  
  // AJAX的封装
  function getMusicList(callback){
    var xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://www.easy-mock.com/mock/5d2c3bc82d35353ec1fb132f/yilia/Songs', true)
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
    $('.musicbox .title').innerText = musicObj.title
    $('.musicbox .author').innerText = musicObj.author
    audio.src = musicObj.src
    $('.cover').style.backgroundImage = 'url('+ musicObj.img + ')'
  
    //   歌曲列表
    $('.song1').innerText = musicObj.author + ' — ' + musicObj.title
    var list2 = (musicList[(currentIndex + 1)%musicList.length])
    $('.song2').innerText = list2.author + ' — ' + list2.title
  }
  