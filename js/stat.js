'use strict';

var cloud = {
  x: 100,
  y: 10,
  width: 420,
  height: 270,
  color: 'white'
};

var SHADOW_OFFSET = 10;

var shadow = {
  x: cloud.x + SHADOW_OFFSET,
  y: cloud.y + SHADOW_OFFSET,
  width: cloud.width,
  height: cloud.height,
  color: 'rgba(0, 0, 0, 0.7)',
};

var renderCloud = function (ctx, cloudParameters) {
  ctx.fillStyle = cloudParameters.color;
  ctx.fillRect(cloudParameters.x, cloudParameters.y, cloudParameters.width, cloudParameters.height);
};

var textParameters = {
  size: 16,
  family: 'PT Mono',
  color: 'black',
  baseline: 'hanging',
};

var titleText = [
  'Ура вы победили!',
  'Список результатов:',
];

var INNER_OFFSET = 20; // Внутренние отступы в облаке

var renderTitle = function (ctx, titleParameters, titleMassive) {
  ctx.font = titleParameters.size + 'px ' + titleParameters.family;
  ctx.fillStyle = titleParameters.color;
  ctx.textBaseline = titleParameters.baseline;
  for (var i = 0; i < titleMassive.length; i++) {
    var coorinateX = cloud.x + INNER_OFFSET;
    var coorinateY = cloud.y + INNER_OFFSET * (i + 1);
    ctx.fillText(titleMassive[i], coorinateX, coorinateY);
  }
};


// Переменные для гистограммы
var HYSTOGRAM_OFFSET = 30;
var COLUMNS_GAP = 50;
var COLUMN_WIDTH = 40;
var COLUMN_MAX_HEIGHT = 150;


// Функция поиска макс. элемента массива
var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

// Функция отрисовки гистограммы
var renderHystogram = function (ctx, names, times) {
  var initialX = cloud.x + HYSTOGRAM_OFFSET;
  var maxTime = getMaxElement(times);
  for (var i = 0; i < names.length; i++) {
    var coordinateX = initialX + COLUMN_WIDTH * i + COLUMNS_GAP * i;
    var columnHeight = COLUMN_MAX_HEIGHT * times[i] / maxTime;

    // Определяем координаты Y элементов гистограммы
    var namesCoordinateY = cloud.y + cloud.height - INNER_OFFSET;
    var columnCoordinateY = namesCoordinateY - columnHeight - textParameters.size;
    var timesCoordinateY = columnCoordinateY - textParameters.size;

    var columnColor = (names[i] !== 'Вы' ? 'hsla(240, ' + Math.random() * 100 + '%, 50%, 1)' : 'rgba(255, 0, 0, 1)');
    ctx.fillStyle = columnColor;
    ctx.fillRect(coordinateX, columnCoordinateY, COLUMN_WIDTH, columnHeight);

    ctx.fillStyle = 'black';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(names[i], coordinateX, namesCoordinateY, COLUMN_WIDTH + COLUMNS_GAP);
    ctx.textBaseline = 'hanging';
    ctx.fillText(Math.round(times[i]), coordinateX, timesCoordinateY, COLUMN_WIDTH + COLUMNS_GAP);
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, shadow);
  renderCloud(ctx, cloud);

  renderTitle(ctx, textParameters, titleText);

  renderHystogram(ctx, names, times);
};
