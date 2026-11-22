// Ход конём — скрипт сайта: мобильное меню и отправка формы записи.
// Подключается в конце index.html: <script src="script.js"></script>

(function () {
  'use strict';

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  var desktop = window.matchMedia('(min-width: 900px)');

  function isOpen() {
    return toggle.getAttribute('aria-expanded') === 'true';
  }

  function setMenu(open) {
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    nav.classList.toggle('is-open', open);
  }

  // Открытие / закрытие по кнопке
  toggle.addEventListener('click', function () {
    setMenu(!isOpen());
  });

  // Закрытие после выбора пункта меню
  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) {
      setMenu(false);
    }
  });

  // Закрытие по клавише Escape
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && isOpen()) {
      setMenu(false);
      toggle.focus();
    }
  });

  // Закрытие по клику вне меню
  document.addEventListener('click', function (event) {
    if (isOpen() && !nav.contains(event.target) && !toggle.contains(event.target)) {
      setMenu(false);
    }
  });

  // Сброс состояния при переходе на десктопную ширину
  function onBreakpointChange(event) {
    if (event.matches) {
      setMenu(false);
    }
  }

  if (desktop.addEventListener) {
    desktop.addEventListener('change', onBreakpointChange);
  } else if (desktop.addListener) {
    desktop.addListener(onBreakpointChange);
  }
})();

// Отправка формы записи без перезагрузки страницы
(function () {
  'use strict';

  var form = document.getElementById('signup-form');
  var status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // данные не уходят в адресную строку

    var name = form.elements.namedItem('name').value.trim();
    var date = form.elements.namedItem('date');
    var dateText = date.options[date.selectedIndex].text;

    // В реальном проекте здесь был бы fetch('/api/signup', { method: 'POST', body: new FormData(form) })
    status.textContent = 'Спасибо, ' + name + '! Заявка на «' + dateText +
      '» принята. Администратор свяжется с вами в течение пары часов.';
    form.reset();
    status.focus();
  });

  // Скрываем сообщение, когда пользователь начинает заполнять форму заново
  form.addEventListener('input', function () {
    status.textContent = '';
  });
})();
