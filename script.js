// script.js
document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;
  if (name && message) {
    alert(`こんにちは ${name} さん！メッセージをありがとうございます: ${message}`);
  } else {
    alert('名前とメッセージを入力してください！');
  }
});

function openModal(modalId) {
  document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}
