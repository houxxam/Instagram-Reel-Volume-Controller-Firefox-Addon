document.addEventListener('DOMContentLoaded', () => {
  const volumeSlider = document.getElementById('volumeSlider');

  // Load the saved volume from localStorage
  const savedVolume = localStorage.getItem('savedVolume');
  if (savedVolume !== null) {
    volumeSlider.value = savedVolume;
  }

  volumeSlider.addEventListener('input', (event) => {
    const volume = event.target.value;
    localStorage.setItem('savedVolume', volume); // Save volume to localStorage

    // Send the volume to the content script
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      browser.tabs.sendMessage(tabs[0].id, { volume: volume });
    });
  });
});
