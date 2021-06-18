'use strict';
function megaSlider(sel, param) {
  //sel = селектор слайдера. Одному селектору могут соответствовать несколько слайдеров
  //param = объект с параметрами nav, dots, items

  const slider = document.querySelectorAll(sel);

  slider.forEach(function (item) {
    const selfSlider = item; //Текущий слайдер
    let items = selfSlider.children; //Слайды

    let conf = getParam();

    //Создаём обёртку для items
    const wrapper = document.createElement("div");

    //Добавляем уникальные классы для описания обязательных css свойств
    selfSlider.classList.add("mega-slider");
    wrapper.className = "mega-slider__wrapper";
    for (let i = 0; i < items.length; i++) {
      items[i].classList.add("mega-slider__item");
    }

    //Оборачиваем items в обёртку
    selfSlider.appendChild(itemsWrap(items, wrapper));

    //Если требуются стрелки, то создаём их
    if (conf.nav) {
      const nav = document.createElement("div"),
        arrPrev = document.createElement("div"),
        arrNext = document.createElement("div");

      nav.className = "mega-slider__nav";
      arrPrev.className = "mega-slider__prev";
      arrNext.className = "mega-slider__next";
      nav.appendChild(arrPrev);
      nav.appendChild(arrNext);
      arrPrev.addEventListener("click", prev);
      arrNext.addEventListener("click", next);

      selfSlider.appendChild(nav);
    } else {
      if (document.querySelector(".mega-slider__nav")) {
        document.querySelector(".mega-slider__nav").remove();
      }
    }


    //Выставляем размер items
    setItemsSize();

    window.addEventListener("resize", function () {
      redraw();
    });

    function itemsWrap(el, wrapper) {
      for (let i = 0; el.length > 0; ) {
        wrapper.appendChild(el[0]);
      }
      items = wrapper.children;
      return wrapper;
    }

    function setItemsSize() {
      let itemSize = Math.floor(wrapper.clientWidth / conf.items);
      for (let i = 0; i < items.length; i++) {
        items[i].style.minWidth = itemSize + "px";
      }
    }
    function getParam() {
      if (param.adaptive) {
        const adaptivKeys = Object.keys(param.adaptive),
          breakPoints = [];

        adaptivKeys.forEach(function (item) {
          breakPoints.push(Number(item));
        });

        const winWidth = window.innerWidth;

        let currentSize;
        breakPoints.some(function (item, index) {
          if (breakPoints[index + 1]) {
            if (winWidth > item && winWidth <= breakPoints[index + 1]) {
              currentSize = item;
              return true;
            }
          } else {
            currentSize = item;
            return true;
          }
        });
        return param.adaptive[currentSize + ""];
      } else {
        return param;
      }
    }
    let offsetIndex = 0;
    function prev() {
      let itemWidth = items["0"].clientWidth;

      if (offsetIndex <= 0) {
        return;
      } else {
        offsetIndex--;
      }
      console.log(offsetIndex);
      const offset = itemWidth * offsetIndex;
     
      wrapper.style.transform = `translateX(-${offset}px)`;
    }
    function next() {
      let itemWidth = items["0"].clientWidth;
      if (offsetIndex >= items.length - conf.items) {
        return;
      } else {
        offsetIndex++;
      }
      var offset = itemWidth * offsetIndex;
      wrapper.style.transform = `translateX(-${offset}px)`;
    }
  
    function redraw() {
      conf = getParam();
      setItemsSize();
      if (document.querySelector(".mega-slider__nav")) {
        document.querySelector(".mega-slider__nav").remove();
      }
      if (document.querySelector(".mega-slider__dots")) {
        document.querySelector(".mega-slider__dots").remove();
      }

      //Если требуются стрелки, то создаём их
      if (conf.nav) {
        const nav = document.createElement("div"),
          arrPrev = document.createElement("div"),
          arrNext = document.createElement("div");

        nav.className = "mega-slider__nav";
        arrPrev.className = "mega-slider__prev";
        arrNext.className = "mega-slider__next";
        nav.appendChild(arrPrev);
        nav.appendChild(arrNext);

        selfSlider.appendChild(nav);
        arrPrev.addEventListener("click", prev);
        arrNext.addEventListener("click", next);
      } else {
        if (document.querySelector(".mega-slider__nav")) {
          document.querySelector(".mega-slider__nav").remove();
        }
      }
  
    }
  });
}

megaSlider(".spec-crsl", {
  /*
  items: 3,
  nav: true,
  dots: true
  */
  //Все параметры обязательный для заполнения.
  //Если используется свойство adaptive, то другие свойства за его пределами не должны заполняться
  adaptive: {
    1000: {
      //параметры для 1000 и больше
      items: 3,
      nav: true,
      dots: false,
    },
    700: {
      //параметры для 700 и больше
      items: 2,
      nav: true,
      dots: false,
    },
    0: {
      //параметры для 0 и больше
      items: 1,
      nav: true,
      dots: false,
    },
  },
});
