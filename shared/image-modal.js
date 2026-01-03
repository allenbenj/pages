// Image & Video Modal Functionality
(function() {
    // Cache modal elements
    let modal = null;
    let modalImg = null;
    let modalVideo = null;
    
    function getModalElements() {
        if (!modal) {
            modal = document.getElementById('imageModal');
            modalImg = document.getElementById('modalImage');
            modalVideo = document.getElementById('modalVideo');
        }
        return { modal, modalImg, modalVideo };
    }
    
    window.openImageModal = function(mediaSrc) {
        const { modal, modalImg, modalVideo } = getModalElements();
        
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
    };
    
    window.closeImageModal = function() {
        const { modal, modalVideo } = getModalElements();
        
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Pause video if it was playing
            if (modalVideo) {
                modalVideo.pause();
                modalVideo.src = '';
            }
        }
    };
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            window.closeImageModal();
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
                window.openImageModal(imageSrc);
            });
        });
    });
})();
