document.addEventListener('DOMContentLoaded', () => {
  // Auto-slider functionality
  const sliderTrack = document.querySelector('.slider-track');
  if (sliderTrack) {
    sliderTrack.innerHTML += sliderTrack.innerHTML; // Duplicate slides for seamless loop
  }

  // Hover effects for story cards
  document.querySelectorAll('.story-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.03)';
      card.style.boxShadow = '0 10px 25px rgba(255, 71, 145, 0.3)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
      card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
    });
  });

  // Search functionality with animation
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  
  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  }

  function performSearch() {
    const query = searchInput.value.toLowerCase();
    const storyCards = document.querySelectorAll('.story-card, .slide');
    let hasResults = false;
    
    storyCards.forEach(card => {
      const titleElement = card.querySelector('h3') || card.querySelector('.slide-caption');
      if (!titleElement) return;
      
      const title = titleElement.textContent.toLowerCase();
      const matches = title.includes(query);
      
      if (matches) hasResults = true;
      
      // Animate the filtering
      if (query === '') {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = '';
        }, 50);
      } else if (matches) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = '';
        }, 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
    
    // Show message if no results
    let noResultsMsg = document.getElementById('noResultsMsg');
    if (!hasResults && query !== '') {
      if (!noResultsMsg) {
        noResultsMsg = document.createElement('div');
        noResultsMsg.id = 'noResultsMsg';
        noResultsMsg.className = 'no-results-message';
        noResultsMsg.textContent = 'No stories found matching your search.';
        document.querySelector('.story-grid') ? 
          document.querySelector('.story-grid').appendChild(noResultsMsg) : 
          document.querySelector('#main-stories').appendChild(noResultsMsg);
      }
      noResultsMsg.style.display = 'block';
    } else if (noResultsMsg) {
      noResultsMsg.style.display = 'none';
    }
  }

  // Back to top button with visibility control
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  // Audio control
  const bgAudio = document.getElementById('bg-audio');
  if (bgAudio) {
    bgAudio.volume = 0.3; // Set default volume
    
    // Create audio toggle button
    const audioToggle = document.createElement('button');
    audioToggle.id = 'audioToggle';
    audioToggle.className = 'audio-toggle glossy-btn';
    audioToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
    document.body.appendChild(audioToggle);
    
    // Toggle audio - initially muted
    let isPlaying = false;
    audioToggle