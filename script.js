

// カルーセル機能
function showSlide(carouselId, n) {
  const carousel = document.getElementById(carouselId);
  if (!carousel) return;
  const images = carousel.querySelectorAll('.carousel-image');
  let current = 0;
  images.forEach((img, idx) => {
    if (img.classList.contains('active')) current = idx;
    img.classList.remove('active');
    img.style.animation = '';
  });
  let newIndex = (current + n + images.length) % images.length;
  images[newIndex].classList.add('active');
  // スライド方向でアニメーションを切り替え
  void images[newIndex].offsetWidth;
  if (n > 0) {
    images[newIndex].style.animation = 'carousel-slide-in 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
  } else {
    images[newIndex].style.animation = 'carousel-slide-in 0.6s cubic-bezier(0.4, 0, 0.2, 1) reverse';
  }
}

function prevSlide(carouselId) {
  showSlide(carouselId, -1);
}

function nextSlide(carouselId) {
  showSlide(carouselId, 1);
}

// ハンバーガーメニュー
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const overlay = document.getElementById("overlay");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    overlay.classList.toggle("active");
  });

  // メニューリンクをクリックしたら閉じる
  document.querySelectorAll(".overlay-nav a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      overlay.classList.remove("active");
    });
  });
});


// お問合せ
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    if (name && message) {
      alert(`こんにちは ${name} さん！メッセージをありがとうございます: ${message}`);
    } else {
      alert('名前とメッセージを入力してください！');
    }
  });
}

// モーダル表示
function openModal(modalId) {
  document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

// 時間表示
function startClock() {
  const timeElement = document.getElementById("time");
  if (!timeElement) return;

  setInterval(() => {
    const now = new Date();
    timeElement.textContent = now.toLocaleTimeString();
  }, 1000);
}

//ホームスライドショー
const images = document.querySelectorAll('#slideshow img');
let currentIndex = 0;

// 初期状態で最初の画像を表示
images.forEach((img, i) => {
  img.style.opacity = (i === 0) ? '1' : '0';
  img.classList.toggle('active', i === 0);
});

function fadeToNextImage() {
  // 現在の画像をフェードアウト
  images[currentIndex].classList.remove('active');
  images[currentIndex].style.opacity = '0';

  // 次の画像をフェードイン
  currentIndex = (currentIndex + 1) % images.length;
  images[currentIndex].classList.add('active');
  images[currentIndex].style.opacity = '1';
}

// 3秒待ってからフェードアウト開始、その後4秒ごとに切り替え
setTimeout(() => {
  fadeToNextImage();
  setInterval(fadeToNextImage, 4000);
}, 4000);

function openModal(imageSrc) {
  const modal = document.getElementById('modal');
  const modalImage = document.getElementById('modalImage');
  modal.style.display = 'flex';
  modalImage.src = imageSrc;
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

// barbaでのページ遷移
barba.init({
  prevent: () => false,
  transitions: [{
    name: 'fade',
    leave({ current }) {
      return gsap.to(current.container, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      });
    },
    enter({ next }) {
      window.scrollTo(0, 0);
      return gsap.fromTo(next.container,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' }
      );
    }
  }]
});

// ハンバーガーメニューの初期化関数
function initHamburgerMenu() {
  const hamburger = document.querySelector('.hamburger');
  const overlay = document.querySelector('.overlay');

  if (!hamburger || !overlay) return;

  // 古いイベントを削除するためにクローン
  const newHamburger = hamburger.cloneNode(true);
  hamburger.parentNode.replaceChild(newHamburger, hamburger);

  newHamburger.addEventListener('click', () => {
    newHamburger.classList.toggle('open');
    overlay.classList.toggle('active');
  });

  overlay.addEventListener('click', () => {
    newHamburger.classList.remove('open');
    overlay.classList.remove('active');
  });
}

// ページ遷移後の初期化処理
document.addEventListener('DOMContentLoaded', () => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  const namespace = document.querySelector('[data-barba="container"]')?.dataset.barbaNamespace;

  initHamburgerMenu(); // ← 最初の表示でも実行！

  if (namespace === 'index') {
    startClock();
    initHomePage();
  } else {
    AOS.init({
      once: false,
      duration: 800,
      easing: 'ease-in-out'
    });
  }

  // その後に barba.init() を呼び出す
  barba.init({
    transitions: [{
      name: 'fade',
      leave({ current }) {
        return gsap.to(current.container, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out'
        });
      },
      enter({ next }) {
        window.scrollTo(0, 0); // ← ここでスクロール位置をリセット
        return gsap.fromTo(next.container,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: 'power2.out' }
        );
      }
    }]
  });

  // ホームページ用の処理（#time や #slideshow の初期化）
  function initHomePage() {
    const timeElement = document.getElementById("time");
    if (timeElement) {
      setInterval(() => {
        const now = new Date();
        timeElement.textContent = now.toLocaleTimeString();
      }, 1000);
    }

    const images = document.querySelectorAll('#slideshow img');
    let currentIndex = 0;

    images.forEach((img, i) => {
      img.style.opacity = (i === 0) ? '1' : '0';
      img.classList.toggle('active', i === 0);
    });

    function fadeToNextImage() {
      images[currentIndex].classList.remove('active');
      images[currentIndex].style.opacity = '0';
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].classList.add('active');
      images[currentIndex].style.opacity = '1';
    }
    
    // ホーム画面のフェードイン時間
    setTimeout(() => {
    fadeToNextImage();
    setInterval(fadeToNextImage, 4000);
  }, 4000);
}
}); 
  
  

