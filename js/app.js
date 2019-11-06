console.log('program start')

// Caption container
const container = document.querySelector('.captions')

// Select caption spans
const captions = document.querySelectorAll('span');

// Log current video time
const video = document.querySelector('.video');

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
  // Loop through captions
  captions.forEach(item => {
    // console.log(item.dataset)

    // Add highlight class dependent on currenTime
    if(video.currentTime > item.dataset.start && video.currentTime < item.dataset.end) {
      console.dir(item)
      // console.log(item.textContent)

      // TODO: Research IF toggle can be used
      // item.classList.toggle('highlight');
      item.classList.add('highlight')
      //item.classList.toggle('highlight');
    } else {
      item.classList.remove('highlight')
      // item.classList.toggle('highlight', false);
    }

  })

  // console.log(event)

  // // Check timestamp. TODO: What is timeStamp? Who is timeStamp?
  // console.log(event.timeStamp)

  // // Check current time
  // console.log(video.currentTime)
  // console.log('The currentTime attribute has been updated. Again.');
});

// TODO: Make caption <spans> clickable so that the video plays form captions timestamp (data-start => data-end)