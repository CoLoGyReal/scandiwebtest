const slideContent = document.getElementsByClassName('slide-item')
const prev = document.getElementById('prev')
const next = document.getElementById('next')
const dots = document.getElementsByClassName('dots-container')[0]
const dotContent = document.getElementsByClassName('dot-item')
const slide = document.querySelector('.slides');

let slideNumber = 1 // Our slide counter

showSlides(slideNumber);

// That function showing slides by adding and deleting styles of a slide. Make buttons activated and deactivate
function showSlides(num) {
    if (num < 1){
        slideNumber = slideContent.length;
    } else if (num > slideContent.length) {
        slideNumber = 1;
    }
    for (let i = 0; i < slideContent.length; i++) {
        slideContent[i].style.display = 'none';
    }
    for (let i = 0; i < dotContent.length; i++) {
        dotContent[i].classList.remove('active');
    }
    slideContent[slideNumber - 1].style.display = 'block';
    dotContent[slideNumber - 1].classList.add('active');
}

// Function changing slides by calling showSlides with number as a parameter
function changeSlide(num) {
    showSlides(slideNumber += num);
}
prev.onclick = function() {
    changeSlide(-1);
}
next.onclick = function() {
    changeSlide(1);
}

// Function calling selected slide by tap on a button
function currentSlide(num) {
    showSlides(slideNumber = num);
}
dots.onclick = function(elem) {
    for (let i = 0; i < dotContent.length + 1; i++) {
        if (elem.target.classList.contains('dot-item') && elem.target == dotContent[i - 1]) {
            currentSlide(i);
        }
    }
}

let pointX;
let secondPointX;
let secondPointConrol;

// Listeners for mobile devices. Compares two coordinates
slide.addEventListener('touchstart', (evt) => {
    pointX = evt.touches[0].clientX;
})

slide.addEventListener('touchmove', (evt) => {
    secondPointX = evt.touches[0].clientX;
})

slide.addEventListener('touchend', () => {
    if (secondPointX != 0 && secondPointConrol != secondPointX) {
        if (pointX > secondPointX + 60) {
            changeSlide(1);
        } else if (pointX + 60 < secondPointX) {
            changeSlide(-1);
        }
        secondPointConrol = secondPointX;
    }
})
