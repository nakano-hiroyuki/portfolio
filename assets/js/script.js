// =============================
// 時間表示
// =============================
function startClock() {
  const timeElement = document.getElementById("time");
  if (!timeElement) return;

  setInterval(() => {
    const now = new Date();
    timeElement.textContent = now.toLocaleTimeString();
  }, 1000);
}
startClock();

// =============================
//ホームスライドショー
// =============================
const images = document.querySelectorAll('#slideshow img');
let currentIndex = 0;

if (images.length > 0) {
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
}

// =============================
// スクロールトップボタン
// =============================
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn.style.opacity = '1';
  } else {
    scrollTopBtn.style.opacity = '0';
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// =============================
// カルーセル機能
// =============================
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

// =============================
// ハンバーガーメニュー
// =============================
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

// =============================
// モーダル表示
// =============================
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

// =============================
// お問合せ
// =============================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    if (name && message) {
      alert(`こんにちは ${name} さん！メッセージをありがとうございます: ${message}`);
      contactForm.reset();
    } else {
      alert('名前、メールアドレス、性別、メッセージを入力してください！');
    }
  });
}


