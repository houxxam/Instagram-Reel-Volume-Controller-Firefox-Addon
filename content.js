let currentVolume = parseFloat(localStorage.getItem('savedVolume')) || 1.0;

function setVolume(volume) {
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    if (video.volume !== volume) {
      video.volume = volume;
    }
  });
}

// Listen for messages from the popup
browser.runtime.onMessage.addListener((message) => {
  if (message.volume !== undefined) {
    currentVolume = message.volume;
    setVolume(currentVolume);
    localStorage.setItem('savedVolume', currentVolume);
  }
});

// Set initial volume for existing videos
setVolume(currentVolume);

// Observer to set volume for newly added videos
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes) {
      mutation.addedNodes.forEach((node) => {
        if (node.tagName === 'VIDEO') {
          node.volume = currentVolume;
        } else if (node.querySelectorAll) {
          const newVideos = node.querySelectorAll('video');
          newVideos.forEach(video => {
            video.volume = currentVolume;
          });
        }
      });
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });
