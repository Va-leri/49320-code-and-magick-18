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

// 1. Покажите блок .setup, убрав в JS-коде у него класс .hidden.
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

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
