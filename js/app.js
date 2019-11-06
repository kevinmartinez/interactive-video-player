console.log('program start')

// Caption container
const container = document.querySelector('.captions')

// Select caption spans
const captions = document.querySelectorAll('span');
console.dir(captions)

// Select video
const video = document.querySelector('.video');

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
