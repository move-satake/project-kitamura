const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('open');
  });
}

const contactForm = document.getElementById('contactForm');
const formResult = document.getElementById('formResult');

if (contactForm && formResult) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();

    if (!name || !email || !message) {
      formResult.textContent = '必須項目を入力してください。';
      formResult.style.color = '#d33f52';
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      formResult.textContent = 'メールアドレスの形式が正しくありません。';
      formResult.style.color = '#d33f52';
      return;
    }

    formResult.textContent = '送信内容を確認しました（デモ表示）。実運用では送信APIを接続してください。';
    formResult.style.color = '#2e7d32';
    contactForm.reset();
  });
}
