'use strict';

window.renderStatistics = function (ctx, names, times) {
  var windowCfg = {
    width: 420,
    height: 270,
    background: 'rgba(0, 0, 0, 0.7)',
  };
  var textCfg = {
    font: 'PT Mono',
    size: 16,
    color: '#000000'
  };
  var chartCfg = {
    height: 150,
    columnWidth: 40,
    offset: 50
  };
  var offsetX = 100;
  var offsetY = 10;
  renderWindow(ctx, offsetX, offsetY, windowCfg, 10);
  windowCfg.background = '#ffffff';
  renderWindow(ctx, offsetX, offsetY, windowCfg);
  offsetX += 20;
  offsetY += 30;
  renderText(ctx, offsetX, offsetY, 'Ура вы победили!', textCfg);
  offsetY += textCfg.size;
  renderText(ctx, offsetX, offsetY, 'Список результатов:', textCfg);
  offsetY += textCfg.size;
  var players = getPlayersForRenderChart(names, times);
  var maxPlaytime = getMaxPlaytime(players);
  offsetX = 140;
  offsetY = 80;
  for (var i = 0; i < players.length; i++) {
    var player = players[i];
    renderChartItem(ctx, offsetX, offsetY, chartCfg, textCfg, maxPlaytime, player);
    offsetX += chartCfg.columnWidth + chartCfg.offset;
  }
};

var renderWindow = function (ctx, x, y, config, offset) {
  config = config || {};
  ctx.fillStyle = config.background || '#ffffff';
  if (offset) {
    x += offset;
    y += offset;
  }
  ctx.fillRect(x, y, config.width, config.height);
};

var renderText = function (ctx, x, y, text, config) {
  config = config || {};
  if (config.font) {
    ctx.font = config.size + 'px ' + config.font;
  }
  ctx.fillStyle = config.color || '#000000';
  ctx.fillText(text, x, y);
};

var getPlayersForRenderChart = function (names, times) {
  var players = [];
  for (var i = 0; i < names.length; i++) {
    var playerName = names[i];
    var playerTime = Math.round(times[i]);
    players.push({name: playerName, playtime: playerTime, isCurrent: playerName === 'Вы'});
  }
  return players;
};

var getMaxPlaytime = function (players) {
  var max = 0;
  for (var i = 0; i < players.length; i++) {
    var player = players[i];
    if (player.playtime > max) {
      max = player.playtime;
    }
  }
  return max;
};

var getColorForChartItem = function (player) {
  if (player.isCurrent) {
    return 'rgba(255,0,0,1)';
  }
  return 'rgba(0,0,255,' + Math.random() + ')';
};

var renderChartItem = function (ctx, x, y, chartCfg, textCfg, maxPlaytime, player) {
  var offsetY = y;
  var playerProgress = (chartCfg.height / maxPlaytime) * player.playtime;
  renderText(ctx, x, offsetY, player.playtime, textCfg);
  offsetY += textCfg.size;
  ctx.fillStyle = getColorForChartItem(player);
  ctx.fillRect(x, offsetY + (chartCfg.height - playerProgress), chartCfg.columnWidth, playerProgress);
  offsetY += chartCfg.height + textCfg.size;
  renderText(ctx, x, offsetY, player.name, textCfg);
};
