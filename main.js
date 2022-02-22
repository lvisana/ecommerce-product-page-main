let menuBtn = document.getElementById('menu-btn');
menuCloseBtn = document.querySelector('.menu-items .close-btn');
modalCloseBtn = document.querySelector('.slider-card-container .close-btn');
sliderBtns = document.querySelectorAll('.slider-btn');
sliderMain = document.querySelectorAll('.slider-main');
addItemsBtns = document.querySelectorAll('.cart-item');
sliderDesktop = document.querySelectorAll('.thumbnail-bgc');
itemNumber = document.querySelector('.cart-number');
submitBtn = document.querySelector('.descr--submit');
notifNumber = document.querySelector('.notif-number');
cartBtn = document.querySelector('.header--cart-btn');
cartCounter = document.querySelector('.cart-counter');
cartAdder = document.querySelector('.cart-adder');
deleteBtn = document.querySelector('.delete-btn');
overlay = document.querySelectorAll('.click')

function displayMenu() {
    document.querySelector('.menu-items').classList.toggle('display')
    document.querySelector('.overlay').classList.toggle('display')
}

function sliderImages() {
    sliderMain.forEach(element => {
        let currentImg
        if (this.classList.contains('btn-next')) {
            currentImg = element.getAttribute('src')
            if (currentImg !== './images/image-product-4.jpg') {
            let nextImg = currentImg.replace(/\d/, function(n){ return ++n })
            element.src = nextImg
            }
        } else {
        currentImg = element.getAttribute('src')
        if (currentImg !== './images/image-product-1.jpg') {
        let nextImg = currentImg.replace(/\d/, function(n){ return --n })
        element.src = nextImg
        }
        }
        currentImg = element.getAttribute('src')
        sliderDesktop.forEach(thumbnail => {
            let a = thumbnail.lastChild.getAttribute('src')
            let currentThumbnail = a.replace(/-thumbnail/, '')
            if (currentThumbnail == currentImg) {
                thumbnail.classList.add('thumbnail-selected')
            } else {
                thumbnail.classList.remove('thumbnail-selected')
            }
        })
    })
}

function addToCart() {
    if (this.classList.contains('cart-item-plus')) {
        itemNumber.value++
    } else if (itemNumber.value !== '0') {
        itemNumber.value--
    }
}

function submitItems(e) {
    e.preventDefault
    if (itemNumber.value !== '0') {
        if (notifNumber.textContent === '') {
            notifNumber.textContent = itemNumber.value
            notifNumber.classList.add('display')
            cartCounter.textContent = itemNumber.value
            let price = itemNumber.value * 125
            cartAdder.textContent = ` ${price}.00`
        } else {
        let n = parseInt(notifNumber.textContent) + parseInt(itemNumber.value)
        notifNumber.textContent = n
        cartCounter.textContent = n
        let price = n * 125
        cartAdder.textContent = ` ${price}.00`
        notifNumber.classList.add('display')
        }
    }
    if (document.querySelector('.notif-card').classList.contains('display')) {
        document.querySelector('.cart-full').classList.add('display')
        document.querySelector('.cart-empty').classList.remove('display')
    }
}

function showCard() {
    notifNumber.classList.remove('display')
    document.querySelector('.notif-card').classList.toggle('display')
    if (notifNumber.textContent !== '') {
        document.querySelector('.cart-full').classList.add('display')
        document.querySelector('.cart-empty').classList.remove('display')
    } else {
        document.querySelector('.cart-empty').classList.add('display')
        document.querySelector('.cart-full').classList.remove('display')
    }
}

function deleteItems() {
    document.querySelector('.cart-empty').classList.add('display')
    document.querySelector('.cart-full').classList.remove('display')
    notifNumber.classList.remove('display')
    notifNumber.textContent = ''
}

function sliderClick() {
    sliderMain.forEach(element => {
        let thumbnailImage = this.lastChild.src.replace(/-thumbnail/, '')
        element.src = thumbnailImage
        this.classList.add('thumbnail-selected')
        sliderDesktop.forEach(element => {
            if (element !== this){
            element.classList.remove('thumbnail-selected')
        }
        })
    })
}

function showModal() {
    if (document.body.clientWidth > 900) {
        document.querySelector('.slider-card-container').classList.add('display')
        document.querySelector('.overlay-desktop').classList.add('display')
    }
}

function closeModal() {
    document.querySelector('.slider-card-container').classList.remove('display')
    document.querySelector('.overlay-desktop').classList.remove('display')
}

function closeItems() {
    document.querySelector('.slider-card-container').classList.remove('display')
    document.querySelector('.overlay-desktop').classList.remove('display')
    document.querySelector('.menu-items').classList.remove('display')
    document.querySelector('.overlay').classList.remove('display')
} 

function clickEvents(event, fn) {
    event.addEventListener('click', fn)
}

window.addEventListener('load', function() {
    clickEvents(menuBtn, displayMenu)
    clickEvents(menuCloseBtn, displayMenu)
    sliderBtns.forEach(element => {
        clickEvents(element, sliderImages)
    })
    addItemsBtns.forEach(element => {
        clickEvents(element, addToCart)
    })
    clickEvents(cartBtn, showCard)
    clickEvents(submitBtn, submitItems)
    clickEvents(deleteBtn, deleteItems)
    sliderDesktop.forEach(element => {
        clickEvents(element, sliderClick)
    })
    sliderMain.forEach(element => {
        clickEvents(element, showModal)
    })
    clickEvents(modalCloseBtn, closeModal)
    overlay.forEach(element => {
        clickEvents(element, closeItems)
    })
})