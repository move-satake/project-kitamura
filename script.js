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
  const endpoint = contactForm.dataset.endpoint || '';

  contactForm.addEventListener('submit', async (event) => {
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

    if (!endpoint || endpoint.includes('your_form_id')) {
      formResult.textContent = '送信先が未設定です。フォームサービスのURLを設定してください。';
      formResult.style.color = '#d33f52';
      return;
    }

    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = '送信中...';
    }

    formResult.textContent = '送信しています...';
    formResult.style.color = '#4f5b77';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('送信に失敗しました。');
      }

      formResult.textContent = '送信ありがとうございました。確認後、折り返しご連絡いたします。';
      formResult.style.color = '#2e7d32';
      contactForm.reset();
    } catch (error) {
      formResult.textContent = '送信に失敗しました。時間をおいて再度お試しください。';
      formResult.style.color = '#d33f52';
      console.error(error);
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = '送信する';
      }
    }
  });
}
