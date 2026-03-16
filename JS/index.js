const header = document.querySelector('.header');
const slides = document.querySelectorAll('.slide');


let currentIndex = 0; 
let autoSlideInterval;






function showSlide(index) {
    if (index >= slides.length) {
        currentIndex = 0; 
    } 
    else if (index < 0) {
        currentIndex = slides.length - 1; 
    } 
    else {
        currentIndex = index; 
    }
    header.style.transform = `translateX(-${currentIndex * 100}%)`; 
}


function nextSlide(){
    showSlide(currentIndex + 1)
}

function autoSlide(){
    autoSlideInterval = setInterval(nextSlide, 10000);
}


window.addEventListener("load", (event) => {
    autoSlide();
});


