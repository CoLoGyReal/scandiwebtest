const slideContent = document.getElementsByClassName('slide-item')
const prev = document.getElementById('prev')
const next = document.getElementById('next')
const dots = document.getElementsByClassName('dots-container')[0]
const dotContent = document.getElementsByClassName('dot-item')
const slide = document.querySelector('.slides');
let slideNumber = 1

showSlides(slideNumber);

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

function changeSlide(num) {
    showSlides(slideNumber += num);
}
prev.onclick = function() {
    changeSlide(-1);
}
next.onclick = function() {
    changeSlide(1);
}

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

slide.addEventListener('touchstart', (evt) => {
    pointX = evt.touches[0].clientX;
    console.log(evt.touches);
})

slide.addEventListener('touchmove', (evt) => {
    secondPointX = evt.touches[0].clientX;
})

slide.addEventListener('touchend', (evt) => {
    if (secondPointX != 0) {
        if (pointX > secondPointX + 60) {
            changeSlide(1);
        } else if (pointX + 60 < secondPointX) {
            changeSlide(-1);
        }
    }
})
