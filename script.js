

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
// script.js
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(event) {
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

function openModal(modalId) {
  document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}
setInterval(() => {
  const now = new Date();
  document.getElementById("time").textContent = now.toLocaleTimeString();
}, 1000);

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

