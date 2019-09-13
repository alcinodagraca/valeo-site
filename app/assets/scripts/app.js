const navSlide = () =>{
  const burger = document.querySelector('.primary-nav__hamburguer-menu');
  const nav = document.querySelector('.primary-nav__main-nav');
  const navLinks = document.querySelectorAll('.nav-links li');

  burger.addEventListener('click', () => {

    //Toggle the navegation 
    nav.classList.toggle('nav-active');

    //Animate the links
    navLinks.forEach((link, index) => {
      link.style.amination = `navLinkFade 0.5s ease forwards ${index / 7 + 1.5}s`;
    });

    //Toggle the Burger
    burger.classList.toggle('toggle');
  });
}

navSlide();


