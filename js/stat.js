'use strict';

window.renderStatistics = function (ctx, names, times) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(110, 20, 420, 270);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(100, 10, 420, 270);
    ctx.fillStyle = '#000000'
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура вы победили!', 120, 40);
    ctx.fillText('Список результатов:', 120, 60);
    var players = [];
    var maxPlaytime = 0;
    for (var i = 0; i < names.length; i++) {
        var playerName = names[i];
        var playerTime = Math.round(times[i]);
        players.push({ name: playerName, playtime: playerTime, isCurrent: playerName === 'Вы' });
        if (maxPlaytime < playerTime) {
            maxPlaytime = playerTime;
        }
    }
    var progressBarHeight = 150;
    var offsetX = 140;
    var offsetY = 80;
    for (var i = 0; i < players.length; i++) {
        var player = players[i];
        var playerProgress = (progressBarHeight / maxPlaytime) * player.playtime;
        ctx.fillStyle = '#000000';
        ctx.fillText(player.playtime, offsetX, offsetY);
        ctx.fillStyle = player.isCurrent ? 'rgba(255,0,0,1)' : 'rgba(0,0,255,' + Math.random() + ')';
        ctx.fillRect(offsetX, offsetY + 10 + (progressBarHeight - playerProgress), 40, playerProgress);
        ctx.fillStyle = '#000000';
        ctx.fillText(player.name, offsetX, offsetY + 190);
        offsetX += 90;
    }
};