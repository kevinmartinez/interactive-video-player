console.log('program start')

// Select caption spans
const captions = document.querySelectorAll('span');

// Log current video time
const video = document.querySelector('.video');

video.addEventListener('timeupdate', (event) => {

  // Loop through captions
  // Loop through captions
  captions.forEach(item => {
    // console.log(item.dataset)

    // Add highlight class dependent on currenTime
    if(video.currentTime > item.dataset.start && video.currentTime < item.dataset.end) {
      console.dir(item)
      console.log(item.textContent)

      // TODO: Research IF toggle can be used
      // item.classList.toggle('highlight');
      item.classList.add('highlight')
    } else {
      item.classList.remove('highlight')
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