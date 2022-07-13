'use strict';
document.addEventListener('DOMContentLoaded', () => {
   document.querySelector('.wrapper').classList.add('loaded');
});

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

burgerMenu();
window.addEventListener('load', windowLoad);
