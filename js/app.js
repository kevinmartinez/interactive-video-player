console.log('program start')
const videoContainer = document.getElementById('videoContainer'); // Video container
const video = document.querySelector('.video'); // Select video
const videoControls = document.getElementById('video-controls')
const container = document.querySelector('.captions'); // Caption container
const captions = document.querySelectorAll('.caption'); // Select caption spans
const playpause = document.getElementById('playpause');
const stop = document.getElementById('stop');
const mute = document.getElementById('mute');
const volUp = document.getElementById('volUp');
const volDown = document.getElementById('volDown');
const progress = document.getElementById('progress');
const fullscreen = document.getElementById('fullscreen');

video.controls = false; // Hide default video controls

// TODO: Play when clicking video area as well
playpause.addEventListener('click', () => {
  playpause.setAttribute('data-state', playpause.getAttribute('data-state') === 'play' ? 'pause' : 'play');
  
  if (video.paused || video.ended) {
    console.log('Video Playing')
    video.play();
  } else {
    console.log('Video Paused')
    video.pause();
  }
});

// Stop button
stop.addEventListener('click', () => {
  console.log('Video Stopped')
  video.pause();
  video.currentTime = 0;
  progress.value = 0;
  playpause.setAttribute('data-state', 'play')
});

// Volume
// TODO: Make a dragable progress?
volUp.addEventListener('click', () => {
  alterVolume('+');
});

volDown.addEventListener('click', () => {
  alterVolume('-');
});

const alterVolume = dir => {
  const currentVolume = Math.floor(video.volume * 10) / 10;
  if (dir === '+') {
      if (currentVolume < 1) {
        video.volume += 0.1;
     }
  }
  else if (dir === '-') {
    if (currentVolume > 0){
      video.volume -= 0.1;
    }
  }
}

// Progress
video.addEventListener('loadedmetadata', () => {
  progress.setAttribute('max', video.duration);
});

video.addEventListener('timeupdate', () => {
  if (!progress.getAttribute('max')) { // Fallback for mobile browsers
    progress.setAttribute('max', video.duration);
  }
  progress.value = video.currentTime;
});

// Jump ahead by clicking progress bar
progress.addEventListener('click', event => {
  const position = (event.pageX  - event.target.offsetLeft) / event.target.offsetWidth;
  video.currentTime = position * video.duration;
});

// Fullscreen mode

fullscreen.addEventListener('click', () => {
  handleFullscreen();
});

const handleFullscreen = function() {
  if (isFullScreen()) {
     if (document.exitFullscreen) document.exitFullscreen();
     else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
     else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
     else if (document.msExitFullscreen) document.msExitFullscreen();
     setFullscreenData(false);
  }
  else {
     if (videoContainer.requestFullscreen) videoContainer.requestFullscreen();
     else if (videoContainer.mozRequestFullScreen) videoContainer.mozRequestFullScreen();
     else if (videoContainer.webkitRequestFullScreen) videoContainer.webkitRequestFullScreen();
     else if (videoContainer.msRequestFullscreen) videoContainer.msRequestFullscreen();
     setFullscreenData(true);
  }
}

const isFullScreen = () => {
  return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
}

const setFullscreenData = state => {
  videoContainer.setAttribute('data-fullscreen', !!state);
}

document.addEventListener('fullscreenchange', () => {
  setFullscreenData(!!(document.fullScreen || document.fullscreenElement));
});
document.addEventListener('webkitfullscreenchange', function() {
  setFullscreenData(!!document.webkitIsFullScreen);
});
document.addEventListener('mozfullscreenchange', function() {
  setFullscreenData(!!document.mozFullScreen);
});
document.addEventListener('msfullscreenchange', function() {
  setFullscreenData(!!document.msFullscreenElement);
});

// TODO: Make caption <spans> clickable so that the video plays form captions timestamp (data-start => data-end)
// Let user click on captions
container.addEventListener('click', e => {

  // We only want the span elements to set currentTime (through data-start)
  // ,else we get an error on non-finite numbers when clicking outside of a span
  if (e.target.nodeName === 'SPAN') {
    // TODO: Make use of promise
    const currentTime = e.target.dataset.start;
    video.currentTime = currentTime;
    video.play();
  }
})

video.addEventListener('timeupdate', (event) => {

  // Loop through captions
  captions.forEach(item => {
  
    // Add highlight class dependent on currentTime
    if(video.currentTime > item.dataset.start && video.currentTime < item.dataset.end) {
      item.classList.add('highlight')
    } else {
      item.classList.remove('highlight')
    }

  })
});
