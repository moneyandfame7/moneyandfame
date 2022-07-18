'use strict';

//* скролл к нужному элементу на странице
$('.scrollto a').on('click', function () {
   let href = $(this).attr('href');

   $('html, body').animate(
      {
         scrollTop: $(href).offset().top,
      },
      {
         duration: 500, // по умолчанию «400»
         easing: 'linear', // по умолчанию «swing»
      }
   );

   return false;
});

//* анимация элементов при скролле
let controller = new ScrollMagic.Controller();

let revealElements = document.getElementsByClassName('card__item');
for (let i = 0; i < revealElements.length; i++) {
   // create a scene for each element
   new ScrollMagic.Scene({
      triggerElement: revealElements[i], // y value not modified, so we can use element as trigger as well
      offset: 50, // start a little later
      triggerHook: 0.8,
   })
      .setClassToggle(revealElements[i], 'visible') // add class toggle
      .addTo(controller);
}

//* Slider swiper
const swiper = new Swiper('.swiper', {
   // Optional parameters
   direction: 'horizontal',
   loop: true,
   // If we need pagination
   pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
   },
   // Navigation arrows
});

//* анимация шапки при скролле
const header = document.querySelector('#header'); // шапка
window.addEventListener('scroll', () => checkScroll()); // событие скролла
history.scrollRestoration = 'manual'; // вверх экрана при перезагрузке страницы
const checkScroll = () => {
   const scrollPosition = window.scrollY;
   if (scrollPosition !== 0) {
      header.classList.add('active');
   } else {
      header.classList.remove('active');
   }
};
document.addEventListener('DOMContentLoaded', () => {
   document.querySelector('.wrapper').classList.add('loaded');
   checkScroll();
});

//* бургер меню
const burgerMenu = () => {
   const hamb = document.querySelectorAll('#hamb');
   const popup = document.querySelector('#popup');
   const menu = document.querySelector('#menu').cloneNode(1);
   const body = document.querySelector('body');
   const overlay = document.querySelector('#overlay');
   const links = Array.from(menu.children);

   const closeOnClick = () => {
      popup.classList.remove('open');
      body.style.overflow = 'visible';
      overlay.classList.remove('open');
   };
   const hambHandler = (e) => {
      e.preventDefault();
      popup.classList.toggle('open');

      if (popup.classList.contains('open')) {
         body.style.overflow = 'hidden';
         overlay.classList.add('open');
      } else {
         body.style.overflow = 'visible';
         overlay.classList.remove('open');
      }
      renderPopup();
   };

   const renderPopup = () => {
      popup.appendChild(menu);
   };

   links.forEach((element) => {
      element.addEventListener('click', closeOnClick);
   });
   overlay.addEventListener('click', hambHandler);
   hamb.forEach((element) => {
      element.addEventListener('click', hambHandler);
   });
};
burgerMenu();

//* цветовая тема
const windowLoad = () => {
   // HTML
   const htmlBlock = document.documentElement;

   // получаем сохранённую тему
   const saveUserTheme = localStorage.getItem('user-theme');

   // settings
   let userTheme;
   if (window.matchMedia) {
      userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
   }
   window.matchMedia('(prefers-color-scheme:dark)').addEventListener('change', (e) => {
      !saveUserTheme ? changeTheme() : null;
   });

   // смена темы по клику
   const themeButton = document.querySelector('#color-theme');

   if (themeButton) {
      themeButton.addEventListener('click', (e) => {
         changeTheme(true);
      });
   }

   const setThemeClass = () => {
      if (saveUserTheme) {
         htmlBlock.classList.add(saveUserTheme);
      } else {
         htmlBlock.classList.add(userTheme);
      }
   };
   setThemeClass();

   // функция смены темы
   const changeTheme = (saveTheme = false) => {
      let currentTheme = htmlBlock.classList.contains('light') ? 'light' : 'dark';
      let newTheme;

      if (currentTheme === 'light') {
         newTheme = 'dark';
      } else if (currentTheme === 'dark') {
         newTheme = 'light';
      }
      htmlBlock.classList.remove(currentTheme);
      htmlBlock.classList.add(newTheme);
      saveTheme ? localStorage.setItem('user-theme', newTheme) : null;
   };
};
window.addEventListener('load', windowLoad);
