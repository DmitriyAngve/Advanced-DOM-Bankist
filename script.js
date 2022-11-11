'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

///////////////////////////////////////
// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Button scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());
  console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  section1.scrollIntoView({ behavior: 'smooth' });
});

// Page Navigation

// Lectures //
////////////////////////////////////////////////////////////////////////
/////////////Selecting, Creating, and Deleting Elements/////////////////
////////////////////////////////////////////////////////////////////////
/*
// SELECTING elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header'); // return the first element that matches selector name
const allSelector = document.querySelectorAll('.section'); // all sections class
console.log(allSelector); // Node list(4) 4 - number of all section in HTML, not changed if deleted sections

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons); // HTMLCollection(9) 9 - number of all buttons in document (changed if deleted buttons)

console.log(document.getElementsByClassName('btn')); // HTMLCollection(5)

// CREATING and inserting elements
const message = document.createElement('div'); // Create a DOM element and stores element into the message, now that element is not yet anywhere in our DOM
// Let's manually insert it in webpage
message.classList.add('cookie-message');
message.textContent = 'We use cookied for improved functionality and analytics';
// .innerHTML - to read and to set content
message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// INSERT on webpage (.prepend) right into DOM
header.prepend(message); // .prepend - first child of the .header element
// APPEND - MOVED THE ELEMENT, NOT INSERT (REALLY INSERT - PREPEND)
// header.append(message); // .apppend - last child of the .header element
// clone node
// header.append(message.cloneNode(true)); // (true) - means that all the child elements will also be coppied
// header.before(message);
// header.after(message);

// DELETE elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove(); // - new
    // message.parentElement.removeChild(message); // - old
  });

////////////////////////////////////////////////////////////////////////
/////////////////////Styles, Attributes and Classes/////////////////////
////////////////////////////////////////////////////////////////////////

// STYLES
message.style.backgroundColor = '#37383d'; // didn't select it manually first because we already had it stored in message variable
message.style.width = '120%';

console.log(message.style.height); // nothing
console.log(message.style.backgroundColor); // rgb(55, 56, 61) we see it because it is inline style, so a style that we set manually ourselves but we cannot get a style that is hidden inside of a class
console.log(message.style.height); // nothing

// In case we need to manipulate with another style, we use the getComputedStyle function

// console.log(getComputedStyle(message)); // Get HUGE object with all properties
console.log(getComputedStyle(message).color); // rgb(187, 187, 187)
console.log(getComputedStyle(message).height); // 43px

// Change height with getComputedStyle function
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
console.log(getComputedStyle(message).height); // 72.8438px

// Change CSS variables from JS
document.documentElement.style.setProperty('--color-primary', 'orangered'); // change everything where we mentioned this property

// ATTRIBUTES
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className); // nav__logo

logo.alt = 'Beatiful minimalist logo'; // Change attribute

// Non-standart
console.log(logo.designer); // Try to read property I added manually in HTML - result - undefined (This is not a standart property for images)
console.log(logo.getAttribute('designer')); // Dmitriy
logo.setAttribute('company', 'Bankist'); // added attribute

console.log(logo.getAttribute('src')); // img/logo.png (relative version of URL)

// Work with links
const link = document.querySelector('.twitter-link');
console.log(link.href); // https://twitter.com/jonasschmedtman (absolute URL)
console.log(link.getAttribute('href')); // https://twitter.com/jonasschmedtman (absolute URL)

// Data attributes
console.log(logo.dataset.versionNumber); // 3.0 (don't forget about camelCase in version) Dataset - special object

// CLASSES
// Methods way to add and remove classes based on their names without interfering with the classes that are already there
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c', 'j');
logo.classList.contains('c', 'j'); // not includes

// Don't USE

logo.className = 'jonas';
*/

////////////////////////////////////////////////////////////////////////
///////////////////////////Smooth scrolling/////////////////////////////
////////////////////////////////////////////////////////////////////////
/*
const btnScrollTo = document.querySelector('.btn--scroll-to'); // From
const section1 = document.querySelector('#section--1'); // To

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords); // DOMRect {x: 0, y: 544, width: 933, height: 1595.6875, top: 544, …}
  // e.target - clicked element
  console.log(e.target.getBoundingClientRect()); // based on vivsible viewport
  console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset, // current position plus the current scroll
  //   s1coords.top + window.pageYOffset
  // ); // needs to tell JS it scroll to (s1coords.top - allways relative to the view port, but not to the document)

  // Make it better (old school version)
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // Modern version
  section1.scrollIntoView({ behavior: 'smooth' });
});
*/
////////////////////////////////////////////////////////////////////////
/////////////////////Types of Events and Event Handlers/////////////////
////////////////////////////////////////////////////////////////////////
/*
// Mouseenter event
const h1 = document.querySelector('h1');

// MODERN way
const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000); // Removed for only alert once window (3 sec)

// Another way of  attached an EventListener to an element (directly to the element) OLDSCHOOL
// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading :D');
// };
*/
////////////////////////////////////////////////////////////////////////
////////////////Event Propagation: and Event Bubbling///////////////////
////////////////////////////////////////////////////////////////////////
/*
// Practice: create random color (rgb (255,255,255))
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget); // e.target - where the event happend / e.currentTarget - on which the element handler is attached
  console.log(e.currentTarget === this); // true

  // Stop event propagation (not good idea)
  // e.stopPropagation(); // only the element you click on react
}); // If we click here - all 3

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
}); // If we click here - CONTAINER and NAV

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget);
  }
  // true
); // If we click here - NAV
*/
////////////////////////////////////////////////////////////////////////
///////////////Event Delegation: Implementing Page Navigation///////////
////////////////////////////////////////////////////////////////////////
