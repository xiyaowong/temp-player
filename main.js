function toValue(mix) {
  if (!mix) return ''
  var str = decodeURIComponent(mix)
  if (str === 'false') return false
  if (str === 'true') return true
  return +str * 0 === 0 ? +str : str
}

function getQuery() {
  var str = location.search.substring(1)
  var tmp,
    k,
    out = {},
    arr = str.split('&')

  while ((tmp = arr.shift())) {
    tmp = tmp.split('=')
    k = tmp.shift()
    if (out[k] !== void 0) {
      out[k] = [].concat(out[k], toValue(tmp.shift()))
    } else {
      out[k] = toValue(tmp.shift())
    }
  }

  return out
}

function info(msg) {
  document.getElementById('info').innerText = msg
}

const videoUrl = getQuery().url

info(videoUrl ? `当前正在播放: ${videoUrl}` : '请输入视频链接地址')

if (videoUrl) {
  const dp = new DPlayer({
    container: document.getElementById('dplayer'),
    screenshot: true,
    autoplay: true,
    video: {
      url: videoUrl,
    },
  })

  dp.on('error', function () {
    info('播放错误，请检查视频链接有效性!')
  })
}
