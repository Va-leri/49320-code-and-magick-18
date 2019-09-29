'use strict';

// Исходные данные:
var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвин'];
var coatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];

// Функция генерации случайного целого числа:
var getRandomInteger = function (max) {
  return Math.round(Math.random() * max);
};

var getRandomElement = function (array) {
  return array[getRandomInteger(array.length - 1)];
};

// 1. Покажите блок .setup, убрав в JS-коде у него класс .hidden.
// var userDialog = document.querySelector('.setup');
// userDialog.classList.remove('hidden');

// Задаем длину списка персонажей
var SIMILAR_WIZARDS_LENGTH = 4;

// Находим в разметке блок, куда будем вставлять персонажей
var similarListElement = document.querySelector('.setup-similar-list');

// Находим в разметке шаблон для персонажа
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// Создаем функцию создания объекта персонажа со случайными характеристиками из заданных массивов
var makeRandomWizard = function (namesArray, surnamesArray, coatColorArray, eyesColorArray) {
  var wizard = {};
  wizard.name = namesArray[getRandomInteger(namesArray.length - 1)] + ' ' + surnamesArray[getRandomInteger(surnamesArray.length - 1)];
  wizard.coatColor = coatColorArray[getRandomInteger(coatColorArray.length - 1)];
  wizard.eyesColor = eyesColorArray[getRandomInteger(eyesColorArray.length - 1)];
  return wizard;
};

// Создаем функцию создания DOM-элемента по характеристикам персонажа
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// Создаем фрагмент, где будем временно хранить список DOM-элементов персонажей
var fragment = document.createDocumentFragment();

// Запускаем цикл, в котором выполнятся заданное количество раз функции создания объекта персонажа и отрисовка DOM-элемента по его характеристикам во временный фрагмент
for (var i = 0; i < SIMILAR_WIZARDS_LENGTH; i++) {
  fragment.appendChild(renderWizard(makeRandomWizard(names, surnames, coatColor, eyesColor)));
}

// Вставляем фрагмент с DOM-элементами персонажей в предназначенный для этого блок в разметке
similarListElement.appendChild(fragment);

// Убираем скрывающий класс для блока похожих персонажей в окне настроек
document.querySelector('.setup-similar').classList.remove('hidden');


var ENTER_KEYCODE = 13;
var ESCAPE_KEYCODE = 27;

var userDialog = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');
var setupOpenIcon = setupOpen.querySelector('.setup-open-icon');
var setupUserName = userDialog.querySelector('.setup-user-name');

var onSetupEscPress = function (evt) {
  if (evt.keyCode === ESCAPE_KEYCODE) {
    closeUserDialog();
  }
};

var openUserDialog = function () {
  userDialog.classList.remove('hidden');

  // Когда окно настройки персонажа открыто, нажатие на клавишу ESC должно закрывать диалог
  document.addEventListener('keydown', onSetupEscPress);

  // Если фокус находится на форме ввода имени, то окно закрываться не должно.
  setupUserName.addEventListener('focusin', function () {
    document.removeEventListener('keydown', onSetupEscPress);
  });
  // Возвращаем обработчик при снятии фокуса с поля ввода имени
  setupUserName.addEventListener('focusout', function () {
    document.addEventListener('keydown', onSetupEscPress);
  });
};

var closeUserDialog = function () {
  userDialog.classList.add('hidden');
};

// Окно .setup должно открываться по нажатию на блок .setup-open. Открытие окна производится удалением класса hidden у блока
setupOpen.addEventListener('click', function () {
  openUserDialog();
});


// Добавить обработчики для альтернативного ввода с клавиатуры keydown для кнопок открытия/закрытия диалога настройки персонажа:
// 1. Когда иконка пользователя в фокусе.setup - open - icon, то окно настройки персонажа должно открываться по нажатию кнопки ENTER
setupOpenIcon.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openUserDialog();
  }
});

// Окно .setup должно закрываться по нажатию на элемент .setup-close, расположенный внутри окна
setupClose.addEventListener('click', function () {
  closeUserDialog();
});

// Если окно открыто и фокус находится на кнопке закрытия окна, то нажатие клавиши ENTER должно приводить к закрытию диалога
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeUserDialog();
  }
});

// Если диалог открыт, нажатие на кнопку «Сохранить» приводит к отправке формы <----- по умолчанию при добавлении типа submit кнопке и action для формы


// Редактирование внешности персонажа
var setupWizard = userDialog.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupFireballWrap = userDialog.querySelector('.setup-fireball-wrap');

// Изменение цвета мантии персонажа по нажатию. Цвет мантии .setup-wizard .wizard-coat должен обновляться по нажатию на неё.
wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = getRandomElement(coatColor);
});

// Изменение цвета глаз персонажа по нажатию. Цвет глаз волшебника меняется по нажатию на блок .setup-wizard .wizard-eyes.
wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = getRandomElement(eyesColor);
});

// Изменение цвета фаерболов по нажатию. Цвет задаётся через изменение фона у блока .setup-fireball-wrap. Возможные варианты цвета:
var fireballColor = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

setupFireballWrap.addEventListener('click', function () {
  setupFireballWrap.style.background = getRandomElement(fireballColor);
});
