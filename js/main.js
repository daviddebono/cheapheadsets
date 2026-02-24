(function () {
  'use strict';

  // Mobile nav toggle
  var navToggle = document.getElementById('nav-toggle');
  var navMobile = document.getElementById('nav-mobile');
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function () {
      var hidden = navMobile.getAttribute('aria-hidden') !== 'false';
      navMobile.setAttribute('aria-hidden', hidden ? 'false' : 'true');
      navToggle.setAttribute('aria-expanded', hidden ? 'true' : 'false');
    });
  }

  // Formspree form handling (enquiry)
  var formEnquiry = document.getElementById('form-enquiry');
  if (formEnquiry) {
    formEnquiry.addEventListener('submit', function (e) {
      var submitBtn = formEnquiry.querySelector('[type="submit"]');
      var msgEl = document.getElementById('form-enquiry-msg');
      if (submitBtn) submitBtn.disabled = true;
      fetch(formEnquiry.action, {
        method: 'POST',
        body: new FormData(formEnquiry),
        headers: { 'Accept': 'application/json' }
      })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (msgEl) {
            msgEl.className = 'form-msg success';
            msgEl.textContent = 'Thank you. Your enquiry has been sent. We will be in touch shortly.';
            msgEl.style.display = 'block';
          }
          formEnquiry.reset();
        })
        .catch(function () {
          if (msgEl) {
            msgEl.className = 'form-msg error';
            msgEl.textContent = 'Something went wrong. Please try again or email us directly.';
            msgEl.style.display = 'block';
          }
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
      e.preventDefault();
    });
  }

  // Newsletter form
  var formNewsletter = document.getElementById('form-newsletter');
  if (formNewsletter) {
    formNewsletter.addEventListener('submit', function (e) {
      var msgEl = document.getElementById('form-newsletter-msg');
      fetch(formNewsletter.action, {
        method: 'POST',
        body: new FormData(formNewsletter),
        headers: { 'Accept': 'application/json' }
      })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (msgEl) {
            msgEl.className = 'form-msg success';
            msgEl.textContent = 'Thanks for subscribing.';
            msgEl.style.display = 'block';
          }
          formNewsletter.reset();
        })
        .catch(function () {
          if (msgEl) {
            msgEl.className = 'form-msg error';
            msgEl.textContent = 'Subscription failed. Please try again.';
            msgEl.style.display = 'block';
          }
        });
      e.preventDefault();
    });
  }
})();
