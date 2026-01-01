// Image & Video Modal Functionality
function openImageModal(mediaSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalVideo = document.getElementById('modalVideo');
    
    if (!modal || !modalImg || !modalVideo) return;
    
    // Determine if this is a video or image
    const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(mediaSrc);
    
    if (isVideo) {
        // Show video, hide image
        modalImg.style.display = 'none';
        modalVideo.style.display = 'block';
        modalVideo.src = mediaSrc;
        modalVideo.load();
    } else {
        // Show image, hide video
        modalVideo.style.display = 'none';
        modalImg.style.display = 'block';
        modalImg.src = mediaSrc;
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    const modalVideo = document.getElementById('modalVideo');
    
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Pause video if it was playing
        if (modalVideo) {
            modalVideo.pause();
            modalVideo.src = '';
        }
    }
}

// Close modal on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeImageModal();
    }
});

// Auto-initialize modal functionality for all clickable images
document.addEventListener('DOMContentLoaded', function() {
    // Find all links with data-modal-image attribute
    const imageLinks = document.querySelectorAll('[data-modal-image]');
    imageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const imageSrc = this.getAttribute('data-modal-image') || this.href;
            openImageModal(imageSrc);
        });
    });
});
