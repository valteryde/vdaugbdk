
// Spawn in image modal
const imageModal = document.createElement('div')
imageModal.classList.add('image-modal')
imageModal.innerHTML = `
    <span class="close" onclick="closeImageModal()">&times;</span>
    <img class="modal-content" id="modal-image">
`
document.body.appendChild(imageModal)

// Function to open the modal
function openImageModal(src) {
    document.getElementById('modal-image').src = src
    imageModal.style.display = 'block'
}

// Function to close the modal
function closeImageModal() {
    imageModal.style.display = 'none'
}

