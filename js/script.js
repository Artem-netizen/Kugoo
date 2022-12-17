// open phones
const expand = document.querySelector('.expand');
listPhone = document.querySelector('.other');

function togglePhones() {
    expand.addEventListener('click', () => {
        expand.classList.toggle('open');
        listPhone.classList.toggle('open');
    })
}

togglePhones();

// document.addEventListener('click', (e) => {
//     console.log(e);
//     if (e.target === listPhone) {
//         listPhone.classList.remove('open');
//     }
// })

// catalog menu
const catalogBody = document.body;
const catalogBtn = document.querySelector('.header-catalog__btn');
const catalogMenu = document.querySelector('.catalog__menu');

function catalogMenuClick() {
    catalogBtn.addEventListener('click', () => {
        catalogBtn.classList.toggle('active');
        catalogMenu.classList.toggle('active');
    });
}

// document.addEventListener('click', (e) => {
//     if (e.target !== catalogMenu) {
//         catalogMenu.classList.remove('active');
//     }
// });

catalogMenuClick();

// dropdown
document.querySelectorAll('.dropdown').forEach(function (selectDropdown) {

    let selectBtn = selectDropdown.querySelector('.dropdown__btn');
    let selectBtnIcon = selectDropdown.querySelector('.dropdown__btn img');
    let selectChangeBtn = selectDropdown.querySelector('.dropdown__list');
    let selectSubItem = selectChangeBtn.querySelectorAll('.dropdown__list li');

    selectBtn.addEventListener('click', function () {
        selectChangeBtn.classList.toggle('open');
        selectBtn.classList.toggle('open');
    })

    selectSubItem.forEach(function (listItem) {
        listItem.addEventListener('click', function (e) {
            e.stopPropagation();
            selectBtn.innerText = this.innerText;
            selectChangeBtn.classList.remove('open');
        })
    })

    document.addEventListener('click', function (e) {
        if (e.target !== selectBtn) {
            selectChangeBtn.classList.remove('open');
            selectBtn.classList.remove('open');
        }
    })
})

// big slider
const getTimeout = function () { 
    const e = setTimeout, b = {}; 
    setTimeout = function (a, c) { 
        const d = e(a, c); b[d] = [Date.now(), c]; return d
    };
    return function (a) {
        return (a = b[a]) ? Math.max(a[1] - Date.now() + a[0], 0) : NaN
    }
}();

function sanitisePercentage(i) {
    return Math.min(100, Math.max(0, i));
}

let tick;
let percentTime;
const progressBar = document.querySelector('.big-slider-progress');

const mySwiper = new Swiper('.big-slider__info', {
    loop: true,
    effect: 'slide',
    speed: 1300,
    slidesPerView: 1,
    spaceBetween: 20,
    keyboard: {
        enabled: true,
        onlyInViewport: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
    },
    watchOverflow: true,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    roundLengths: true,
    autoplay: {
        delay: 3000,
    },
    on: {
        slideChange: function () {
            const swiper = this;
            const defaultSlideDelay = swiper.params.autoplay.delay;
            const currentIndex = swiper.realIndex + 1;
            const currentSlide = swiper.slides[currentIndex];
            const currentSlideDelay = currentSlide.getAttribute('data-swiper-autoplay') || defaultSlideDelay;

            updateSwiperProgressBar(progressBar, currentSlideDelay);
        }
    }
});

function updateSwiperProgressBar(bar, slideDelay) {

    function startProgressBar() {
        resetProgressBar();
        tick = setInterval(progress, 50);
    }

    function progress() {

        const timeLeft = getTimeout(mySwiper.autoplay.timeout);

        if (mySwiper.autoplay.running && !mySwiper.autoplay.paused) {
            percentTime = sanitisePercentage(100 - Math.round(timeLeft / slideDelay * 100));
            bar.style.width = percentTime + '%';

            if (percentTime > 100) {
                resetProgressBar();
            }
        }

        if (mySwiper.autoplay.paused) {
            percentTime = 0;
            bar.style.width = 0;
        }

    }

    function resetProgressBar() {
        percentTime = 0;
        bar.style.width = 0;
        clearInterval(tick);
    }

    startProgressBar();

}

// открытие модалок для разного контента
const popup = document.querySelector('.popup');
const popupCall = document.querySelector('.popup-call');
const popupInner = document.querySelector('.popup-inner');
const popupClose = document.querySelectorAll('.popup-close');
// предзаказ
const preOrder = document.querySelectorAll('.pre-order-open');
// звонок
const popupCallOpen = document.querySelectorAll('.call-open');

preOrder.forEach((pre) => {
    pre.addEventListener('click', (e) => {
        e.preventDefault();
        popup.classList.add('show');
        popupInner.classList.add('show');
    });
});

// звонок
popupCallOpen.forEach((callOpen) => {
    callOpen.addEventListener('click', (e) => {
        e.preventDefault();
        popupCall.classList.add('show');
    })
})

popupClose.forEach((popupCl) => {
    popupCl.addEventListener('click', () => {
        popup.classList.remove('show');
        popupInner.classList.remove('show');
        // звонок
        popupCall.classList.remove('show');
    });
});

document.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.classList.remove('show');
        popupInner.classList.remove('show');
    };
});

 // звонок
document.addEventListener('click', (e) => {
    if (e.target === popupCall) {
        popupCall.classList.remove('show');
    };
});

// card sliders
const mySwiper2 = new Swiper('.card-gallery', {
    loop: true,
    speed: 1000,
    slidesPerView: 1,
    keyboard: {
        enabled: true,
        onlyInViewport: true
    },
    navigation: {
        nextEl: '.next',
        prevEl: '.prev',
    },
});

// tabs on pages
const accessibleTabsContainers = document.querySelectorAll('.tabs');
const tabSelector = document.querySelectorAll('.tabs__btn');
const tabContent = document.querySelectorAll('.tabs__content');
const largeRandNumber = Math.floor((Math.random() * 1000) + 1000);

accessibleTabsContainers.forEach(function(elem, indexAccessibleTabContainer) {
  elem.setAttribute('data-id', indexAccessibleTabContainer);
  
  tabSelector.forEach(function(singleTabSelector, i) {
   
    let tabSelectorId = 'tab-selector-' + largeRandNumber + '_' + i + '_' + indexAccessibleTabContainer;
    let ariaControlTabContent = 'tab-content-' + largeRandNumber + '_' + i + '_' + indexAccessibleTabContainer;

    singleTabSelector.setAttribute('data-id', i);
    singleTabSelector.setAttribute('id', tabSelectorId);
    singleTabSelector.setAttribute('aria-controls', ariaControlTabContent);

    tabContent[i].setAttribute('data-id', i);
    tabContent[i].setAttribute('tabindex', 0);
    tabContent[i].setAttribute('role', 'tabpanel');
    tabContent[i].setAttribute('id', ariaControlTabContent);
    tabContent[i].setAttribute('aria-labeledby', tabSelectorId);

    if(i === 0) {
        singleTabSelector.setAttribute('aria-pressed', 'true');
    } else {
        singleTabSelector.setAttribute('aria-pressed', 'false');
        singleTabSelector.setAttribute('tabindex', -1);
    }
  });
});  


function onTabSelectorClick(e) {

    let tabSelectorSelected = e.target;
    let accessibleTabsContainerSelected = tabSelectorSelected.closest('.tabs'); 
    let tabSelectorsSelectedFromTabs = accessibleTabsContainerSelected.querySelectorAll('.tabs__btn');
    let tabContentsSelectedFromContainer = accessibleTabsContainerSelected.querySelectorAll('.tabs__content');
  
    if(!tabSelectorSelected.classList.contains('_active')) {
      tabSelectorsSelectedFromTabs.forEach(function(singleTabSelected, i) {
        if(tabSelectorSelected.getAttribute('data-id') === tabContentsSelectedFromContainer[i].getAttribute('data-id')) {
            singleTabSelected.classList.add('_active');
            singleTabSelected.setAttribute('tabindex', 0);
            singleTabSelected.setAttribute('aria-pressed', 'true');
            tabContentsSelectedFromContainer[i].classList.add('--active');
        } else {
            singleTabSelected.classList.remove('_active');
            singleTabSelected.setAttribute('tabindex', -1);
            singleTabSelected.setAttribute('aria-pressed', 'false');
            tabContentsSelectedFromContainer[i].classList.remove('--active');
        }

      });
    }
 
}

tabSelector.forEach(function(tabSelector) {
    tabSelector.addEventListener('click', onTabSelectorClick);
});

// reviews slider
const mySwiper3 = new Swiper('.reviews-slider', {
    loop: true, 
    spaceBetween: 30,
    slidesPerView: 4.1,
    keyboard: {
        enabled: true,
        onlyInViewport: true
    },
    navigation: {
        nextEl: '.next-btn',
        prevEl: '.prev-btn',
    },
});

// articles slider
const mySwiper4 = new Swiper('.articles-slider', {
    loop: true, 
    spaceBetween: 30,
    slidesPerView: 3.5,
    keyboard: {
        enabled: true,
        onlyInViewport: true
    },
    navigation: {
        prevEl: '.btn-prev',
        nextEl: '.btn-next',
    },
});

// accordion
const accordionBtns = document.querySelectorAll(".accordion-btn");

accordionBtns.forEach((accordion) => {
    accordion.onclick = function () {
        this.classList.toggle("open");

        let content = this.nextElementSibling;

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    };
});

// mask phone
window.addEventListener('DOMContentLoaded', function () {

    var inputs = document.querySelectorAll('input[type="tel"]');

    Array.prototype.forEach.call(inputs, function (input) {
        new InputMask({
            selector: input,
            layout: input.dataset.mask
        })
    })
})

function InputMask(options) {
    this.el = this.getElement(options.selector);
    if (!this.el) return console.log('Что-то не так с селектором');
    this.layout = options.layout || '+7 (___) ___-__-__';
    this.maskreg = this.getRegexp();
    this.setListeners();
}

InputMask.prototype.getRegexp = function () {
    var str = this.layout.replace(/_/g, '\\d');
    str = str.replace(/\(/g, '\\(');
    str = str.replace(/\)/g, '\\)');
    str = str.replace(/\+/g, '\\+');
    str = str.replace(/\s/g, '\\s');
    return str;
};

InputMask.prototype.mask = function (e) {
    var _this = e.target,
        matrix = this.layout,
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = _this.value.replace(/\D/g, "");

    if (def.length >= val.length) val = def;
    _this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
    });

    if (e.type == "blur") {
        var regexp = new RegExp(this.maskreg);
        if (!regexp.test(_this.value)) _this.value = "";
    } else {
        this.setCursorPosition(_this.value.length, _this);
    }
};

InputMask.prototype.setCursorPosition = function (pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) elem.setSelectionRange(pos, pos); else if (elem.createTextRange) {
        var range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select();
    }
};

InputMask.prototype.setListeners = function () {
    this.el.addEventListener("input", this.mask.bind(this), false);
    this.el.addEventListener("focus", this.mask.bind(this), false);
    this.el.addEventListener("blur", this.mask.bind(this), false);
};

InputMask.prototype.getElement = function (selector) {
    if (selector === undefined) return false;
    if (this.isElement(selector)) return selector;

    if (typeof selector == 'string') {
        var el = document.querySelector(selector);
        if (this.isElement(el)) return el;
    }

    return false;
};

InputMask.prototype.isElement = function (element) {
    return element instanceof Element || element instanceof HTMLDocument;
};

// favourite
const favouriteProduct = document.querySelectorAll('.card-favorite');

favouriteProduct.forEach(product => {
    product.addEventListener('click', () => {
        product.classList.toggle('add');
    })
})