import './style.css';
import Image1 from './images/img1.jpg';
import Image2 from './images/img2.jpg';
import Image3 from './images/img3.png';

const imagesContainer = document.getElementById("images-container");
const nextBtn = document.getElementById("right-button");
const previousBtn = document.getElementById("left-button");
const buttonsContainer = document.getElementById("counter");

const config = {
    NEXT: "next",
    PREVIOUS: "prev"
}

let imagesArray = [];

const img1 = new Image();
img1.src = Image1;
imagesArray.push(img1);

const img2 = new Image();
img2.src = Image2;
imagesArray.push(img2);

const img3 = new Image();
img3.src = Image3;
imagesArray.push(img3);

imagesArray.forEach(function(img){
    img.classList.add("img");
    img.setAttribute("data-orderIdx", Number(imagesArray.indexOf(img)));
    imagesContainer.appendChild(img);
    if(img.dataset.orderidx != window.currentImgIndex){
        img.classList.add("hidden");
    }
});

window.addEventListener("load", () => {
    window.pictureSkipInterval = window.setInterval(function(e){
        displayNextOrPreviousImage(config.NEXT);
    }, 5000);
    window.currentImgIndex = Number(0);
    renderImage(0);
    selectBullet(0);
});

nextBtn.addEventListener("click", () => {
    displayNextOrPreviousImage(config.NEXT);
});

previousBtn.addEventListener("click", () => {
    displayNextOrPreviousImage(config.PREVIOUS);
});

const images = document.querySelectorAll("img");
images.forEach((image) => {
    let bullet = document.createElement("span");
    bullet.classList.add("bullet");
    bullet.textContent = "⬤";
    bullet.dataset.orderidx = image.dataset.orderidx; 
    bullet.addEventListener("click", (ev) => {
        clearInterval(window.pictureSkipInterval);
        deselectBullets();
        ev.target.classList.add("selected")
        let orderIndex = Number(ev.target.dataset.orderidx);
        window.currentImgIndex = orderIndex;
        renderImage(orderIndex);  
        window.pictureSkipInterval = window.setInterval(function(e){
            displayNextOrPreviousImage(config.NEXT);
        }, 5000);
    })
    buttonsContainer.appendChild(bullet);
});

function deselectBullets(){
    const bullets = document.querySelectorAll(".bullet");
    bullets.forEach((bullet) => {
        bullet.classList.remove("selected");
    })
}

function selectBullet(index){
    const bullets = document.querySelectorAll(".bullet");
    deselectBullets();
    bullets[index].classList.add("selected");
}

function renderImage(imgIndex){
    const images = document.querySelectorAll("img");
    images.forEach(function(img){
        img.classList.add("hidden");
        if(img.dataset.orderidx == imgIndex){
            img.classList.remove("hidden");
        }
    })
}

function displayNextOrPreviousImage(direction){
    clearInterval(window.pictureSkipInterval);
    if(direction == "next"){
        getNextPictureIndex();
    }
    if(direction == "prev"){
        getPreviousPictureIndex();
    }
    selectBullet(Number(window.currentImgIndex));
    renderImage(window.currentImgIndex);
    window.pictureSkipInterval = window.setInterval(() => {
        displayNextOrPreviousImage(config.NEXT);
    }, 5000);
}

function getNextPictureIndex(){
    const images = document.querySelectorAll("img");
    if(window.currentImgIndex < images.length - 1){
        window.currentImgIndex += 1; 
    } else {
        window.currentImgIndex = 0; 
    }
}

function getPreviousPictureIndex(){
    const images = document.querySelectorAll("img");
    if(window.currentImgIndex <= images.length - 1 && window.currentImgIndex > 0){
        window.currentImgIndex -= 1;
    } else {
        window.currentImgIndex = images.length - 1;
    }
}
