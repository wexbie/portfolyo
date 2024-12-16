$(function () {
  "use strict";

  gsap.registerPlugin(ScrollTrigger);
  const content = document.querySelector('body');
  const imgLoad = imagesLoaded(content);
  imgLoad.on('done', instance => {
    document.getElementById("loaderContent").classList.add("fade-out");
    setTimeout(() => {
      document.getElementById("loader").classList.add("loaded");
    }, 300);
    gsap.set(".animate-headline", { y: 50, opacity: 0 });
    ScrollTrigger.batch(".animate-headline", {
      interval: 0.1,
      batchMax: 4,
      duration: 6,
      onEnter: batch => gsap.to(batch, {
        opacity: 1,
        y: 0,
        ease: 'sine',
        stagger: { each: 0.15, grid: [1, 4] },
        overwrite: true
      }),
      onLeave: batch => gsap.set(batch, { opacity: 1, y: 0, overwrite: true }),
      onEnterBack: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
      onLeaveBack: batch => gsap.set(batch, { opacity: 0, y: 50, overwrite: true })
    });
  });

  const scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '#menu',
    smoothScroll: true,
    rootMargin: '0px 0px -40%',
  });

  const lenis = new Lenis()
  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  gsap.to("[data-speed]", {
    y: (i, el) => (1 - parseFloat(el.getAttribute("data-speed"))) * ScrollTrigger.maxScroll(window),
    ease: "none",
    scrollTrigger: {
      start: 0,
      end: "max",
      invalidateOnRefresh: true,
      scrub: 0
    }
  });

  const animateInUp = document.querySelectorAll(".animate-in-up");
  animateInUp.forEach((element) => {
    gsap.fromTo(element, {
      opacity: 0,
      y: 50,
      ease: 'sine',
    }, {
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: element,
        toggleActions: 'play none none reverse',
      }
    });
  });

  const animateRotation = document.querySelectorAll(".animate-rotation");
  animateRotation.forEach((section) => {
    var value = $(section).data("value");
    gsap.fromTo(section, {
      ease: 'sine',
      rotate: 0,
    }, {
      rotate: value,
      scrollTrigger: {
        trigger: section,
        scrub: true,
        toggleActions: 'play none none reverse',
      }
    });
  });

  gsap.set(".animate-card-2", { y: 100, opacity: 0 });
  ScrollTrigger.batch(".animate-card-2", {
    interval: 0.1,
    batchMax: 2,
    duration: 6,
    onEnter: batch => gsap.to(batch, {
      opacity: 1,
      y: 0,
      ease: 'sine',
      stagger: { each: 0.15, grid: [1, 2] },
      overwrite: true
    }),
    onLeave: batch => gsap.set(batch, { opacity: 1, y: 0, overwrite: true }),
    onEnterBack: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
    onLeaveBack: batch => gsap.set(batch, { opacity: 0, y: 100, overwrite: true })
  });

  gsap.set(".animate-card-3", { y: 50, opacity: 0 });
  ScrollTrigger.batch(".animate-card-3", {
    interval: 0.1,
    batchMax: 3,
    duration: 3,
    onEnter: batch => gsap.to(batch, {
      opacity: 1,
      y: 0,
      ease: 'sine',
      stagger: { each: 0.15, grid: [1, 3] },
      overwrite: true
    }),
    onLeave: batch => gsap.set(batch, { opacity: 1, y: 0, overwrite: true }),
    onEnterBack: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
    onLeaveBack: batch => gsap.set(batch, { opacity: 0, y: 50, overwrite: true })
  });

  gsap.set(".animate-card-5", { y: 50, opacity: 0 });
  ScrollTrigger.batch(".animate-card-5", {
    interval: 0.1,
    batchMax: 5,
    delay: 1000,
    onEnter: batch => gsap.to(batch, {
      opacity: 1,
      y: 0,
      ease: 'sine',
      stagger: { each: 0.15, grid: [1, 5] },
      overwrite: true
    }),
    onLeave: batch => gsap.set(batch, { opacity: 1, y: 0, overwrite: true }),
    onEnterBack: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
    onLeaveBack: batch => gsap.set(batch, { opacity: 0, y: 50, overwrite: true })
  });

  ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".animate-card-2", { y: 0, opacity: 1 }));
  ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".animate-card-3", { y: 0, opacity: 1 }));
  ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".animate-card-5", { y: 0, opacity: 1 }));

  $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function (event) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function () {
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) {
            return false;
          } else {
            $target.attr('tabindex', '-1');
            $target.focus();
          };
        });
      }
    }
  });

  const toolsSlider = document.querySelector("tools-slider");
  const testimonialsSlider = document.querySelector("testimonials-slider");

  if (!toolsSlider) {
    const swiper = new Swiper('.swiper-tools', {
      spaceBetween: 20,
      autoplay: {
        delay: 1500,
        disableOnInteraction: false,
      },
      loop: true,
      grabCursor: true,
      loopFillGroupWithBlank: true,
      breakpoints: {
        1600: {
          slidesPerView: 5,
        },
        1200: {
          slidesPerView: 4,
        },
        768: {
          slidesPerView: 3,
        },
        576: {
          slidesPerView: 2,
        },
        0: {
          slidesPerView: 2,
        }
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
    });
  };

  if (!testimonialsSlider) {
    const swiper = new Swiper('.swiper-testimonials', {
      slidesPerView: 1,
      spaceBetween: 20,
      autoplay: true,
      speed: 1000,
      loop: true,
      loopFillGroupWithBlank: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  };

  $("#iletisim-form").submit(function () {
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php",
      data: th.serialize()
    }).done(function () {
      $('.iletisim').find('.form').addClass('is-hidden');
      $('.iletisim').find('.form__reply').addClass('is-visible');
      setTimeout(function () {
        $('.iletisim').find('.form__reply').removeClass('is-visible');
        $('.iletisim').find('.form').delay(300).removeClass('is-hidden');
        th.trigger("reset");
      }, 5000);
    });
    return false;
  });
  if (!Modernizr.svg) {
    $("img[src*='svg']").attr("src", function () {
      return $(this).attr("src").replace(".svg", ".png");
    });
  };
  try {
    $.browserSelector();
    if ($("html").hasClass("chrome")) {
      $.smoothScroll();
    }
  } catch (err) {
  };
  $("img, a").on("dragstart", function (event) { event.preventDefault(); });
  var isMobile = false;
  if (/Android|webOS|itelefonNo|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $('html').addClass('touch');
    isMobile = true;
  }
  else {
    $('html').addClass('no-touch');
    isMobile = false;
  }
  var isIE = /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /MSIE 10/i.test(navigator.userAgent) || /Edge\/\d+/.test(navigator.userAgent);
  $('.galeri__link').each(function () {
    $(this)
      .append('<div class="picture"></div>')
      .children('.picture').css({ 'background-image': 'url(' + $(this).attr('data-image') + ')' });
  });
});
const themeBtn = document.querySelector('.color-switcher');
function getCurrentTheme() {
  let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  localStorage.getItem('template.theme') ? theme = localStorage.getItem('template.theme') : null;
  return theme;
}
function loadTheme(theme) {
  const root = document.querySelector(':root');
  if (theme === "light") {
    themeBtn.innerHTML = `<em></em><i class="ph-bold ph-moon-stars"></i>`;
  } else {
    themeBtn.innerHTML = `<em></em><i class="ph-bold ph-sun"></i>`;
  }
  root.setAttribute('color-scheme', `${theme}`);
};
themeBtn.addEventListener('click', () => {
  let theme = getCurrentTheme();
  if (theme === 'dark') {
    theme = 'light';
  } else {
    theme = 'dark';
  }
  localStorage.setItem('template.theme', `${theme}`);
  loadTheme(theme);
});
window.addEventListener('DOMContentLoaded', () => {
  loadTheme(getCurrentTheme());
});
const form = document.getElementById('iletisim-form');
document.getElementById("adsoyad").addEventListener("input", function (event) {
  let value = event.target.value;
  value = value.replace(/[^A-Za-zÀ-ÿ\s]/g, '');
  value = value.replace(/\b\w/g, function (match) {
    return match.toUpperCase();
  });
  event.target.value = value;
});
document.getElementById("sirketad").addEventListener("input", function (event) {
  let value = event.target.value;
  value = value.replace(/[^A-Za-zÀ-ÿ\s]/g, '');
  value = value.replace(/\b\w/g, function (match) {
    return match.toUpperCase();
  });
  event.target.value = value;
});
document.getElementById("email").addEventListener("input", function (event) {
  let email = event.target.value;
  email = email.replace(/[^A-Za-z0-9._@-]/g, '');
  const gecerliDomain = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'yandex.com', 'icloud.com', 'aol.com', 'live.com', 'protonmail.com', 'zoho.com', 'mail.com', 'gmx.com', 'sbcglobal.net', 'comcast.net', 'btinternet.com'];
  const ettenSonra = email.split('@');
  if (ettenSonra.length === 2) {
    const domain = ettenSonra[1].toLowerCase();
    if (!gecerliDomain.includes(domain)) {
      event.target.setCustomValidity('Geçersiz e-posta alan adı. Lütfen geçerli(gmail.com, hotmail.com, outlook.com, yahoo.com gibi) bir e-posta girin.');
    } else {
      event.target.setCustomValidity('');
    }
  }
  event.target.value = email;
});
document.getElementById("telefon").addEventListener("input", function (event) {
  let telefonNo = event.target.value;
  if (!telefonNo.startsWith("+90")) {
    if (telefonNo.startsWith("+")) {
      telefonNo = "+90" + telefonNo.slice(1);
    } else {
      telefonNo = "+90" + telefonNo;
    }
  }
  telefonNo = telefonNo.replace(/[^0-9+]/g, '');
  if (telefonNo.slice(0, 3) !== "+90") {
    telefonNo = "+90" + telefonNo.replace(/^(\+90)/, '');
  }
  event.target.value = telefonNo;
});
document.getElementById("mesaj").addEventListener("input", function (event) {
  let konu = event.target.value;
  konu = konu.replace(/[^A-Za-z0-9.!?,; ]/g, '');
  event.target.value = konu;
});
document.getElementById("iletisim-form").addEventListener("submit", function (event) {
  var recaptchaCevabi = grecaptcha.getResponse();
  if (recaptchaCevabi.length == 0) {
    event.preventDefault();
    document.getElementById("recaptchanot").style.display = 'none';
    Swal.fire({
      position: 'center',
      imageUrl: 'src/assets/img/favicon/w-yuvarlak.png',
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: 'Wex Logo',
      title: 'Lütfen reCAPTCHA\'yı doğrulayın.',
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      customClass: {
        popup: 'swal-popup-large'
      }
    }).then(() => {
      setTimeout(function () {
        location.reload();
      }, 1000);
    });
  }
});