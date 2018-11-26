'use strict';

(function () {
  var getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var shuffleArray = function (source) {
    for (var i = 0; i < source.length; i++) {
      var j = getRandom(0, source.length - 1);
      var swap = source[i];
      source[i] = source[j];
      source[j] = swap;
    }
    return source;
  };

  var getRandomValue = function (source, truncate) {
    truncate = truncate || false;
    shuffleArray(source);
    var index = getRandom(0, source.length - 1);
    var value = source[index];
    if (truncate) {
      source.splice(index, 1);
    }
    return value;
  };

  var getRandomWizardFullName = function () {
    var nameList = [
      'Иван',
      'Хуан Себастьян',
      'Мария',
      'Кристоф',
      'Виктор',
      'Юлия',
      'Люпита',
      'Вашингтон'
    ];
    var surnameList = [
      'да Марья',
      'Верон',
      'Мирабелла',
      'Вальц',
      'Онопко',
      'Топольницкая',
      'Нионго',
      'Ирвинг'
    ];
    return getRandomValue(nameList) + ' ' + getRandomValue(surnameList);
  };

  var getRandomWizardCoatColor = function () {
    var colors = [
      'rgb(101, 137, 164)',
      'rgb(241, 43, 107)',
      'rgb(146, 100, 161)',
      'rgb(56, 159, 117)',
      'rgb(215, 210, 55)',
      'rgb(0, 0, 0)'
    ];
    return getRandomValue(colors);
  };

  var getRandomWizardEyesColor = function () {
    var colors = ['black', 'red', 'blue', 'yellow', 'green'];
    return getRandomValue(colors);
  };

  var getRandomWizard = function () {
    var name = getRandomWizardFullName();
    var coatColor = getRandomWizardCoatColor();
    var eyesColor = getRandomWizardEyesColor();
    return {name: name, coatColor: coatColor, eyesColor: eyesColor};
  };

  var setup = document.querySelector('.setup');
  var setupSimilar = document.querySelector('.setup-similar');
  var setupSimilarList = document.querySelector('.setup-similar-list');
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var getRandomWizards = function () {
    var wizardList = [];
    for (var i = 0; i < 4; i++) {
      wizardList.push(getRandomWizard());
    }
    return wizardList;
  };

  var createWizard = function (wizard) {
    var view = wizardTemplate.cloneNode(true);
    var wizardName = view.querySelector('.setup-similar-label');
    wizardName.textContent = wizard.name;
    var wizardCoat = view.querySelector('.wizard-coat');
    wizardCoat.style.fill = wizard.coatColor;
    var wizardEyes = view.querySelector('.wizard-eyes');
    wizardEyes.style.fill = wizard.eyesColor;
    setupSimilarList.appendChild(view);
    return view;
  };

  var showSetup = function () {
    setup.classList.remove('hidden');
    showSimilarList();
  };

  var showSimilarList = function () {
    var similarList = document.createDocumentFragment();
    var wizards = getRandomWizards();
    wizards.forEach(function (wizard) {
      similarList.appendChild(createWizard(wizard));
    });
    setupSimilarList.appendChild(similarList);
    setupSimilar.classList.remove('hidden');
  };

  showSetup();
})();
