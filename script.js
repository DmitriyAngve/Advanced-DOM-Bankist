'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');

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

///////////////////////////////////////
// Page Navigation

// Not good idea
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href'); // I dont need absolute URL (cann't wright this.href)
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' }); // move to section with id
//   });
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// Use event delegation
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab'); // DOM traversing (with .closest(".operations__tab") we may click the button and receive the button, not the span)
  // console.log(clicked); // like this we can click not only a button, but on span (we need to rid data-tab attribute, but still need the button)

  // Guard clause (ignore any other click)
  if (!clicked) return; // if click returns "null" (falsy value), nothing happens, if truthy value - go on

  // Deactivate tab (remove active classes)
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');

  // Same idea as MODAL window (add and remove classList properties)
});

// Menu fade animation
const handleHover = function (e, opacity) {
  // console.log(this, e.currentTarget);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    // We need to select the siblings elements (basically all the other links, let's find it in nav__item (parent))
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this; // this keyword for this example - it's opacity
      logo.style.opacity = this;
    });
  }
};
// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5)); // .bind returns a new function (no need callback function)
nav.addEventListener('mouseout', handleHover.bind(1));
//

//

//

//

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
///////////////////////////DOM Traversing///////////////////////////////
////////////////////////////////////////////////////////////////////////
/*
// Selecting h1
const h1 = document.querySelector('h1');

// Going downwards: child
console.log(h1.querySelectorAll('.highlight')); // no matter how deep these child element would be inside of the h1 element
console.log(h1.childNodes); // Nodes can be anything: texts, comments, elements...
console.log(h1.children);
h1.firstElementChild.style.color = 'white'; // first child of all children
h1.lastElementChild.style.color = 'orangered'; // last child of all children

// Going upwards: parents
console.log(h1.parentNode); // same as below
console.log(h1.parentElement); // same as above (because this element is also a node in this case)

h1.closest('.header').style.background = 'var(--gradient-secondary)'; // this method receives a query string (like querySelector)
h1.closest('h1').style.background = 'var(--gradient-primary)';

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

// If we need all siblings: let's do this trick:
console.log(h1.parentElement.children); // HTMLCollection(4) [h1, h4, button.btn--text.btn--scroll-to, img.header__img]
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
}); // decrease of siblings
*/
