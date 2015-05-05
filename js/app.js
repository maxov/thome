(function (window, document) {

  var button = $('#name-button');
  var list = $('#name-list');
  var possib = $('#total-possible');
  var maxFrag = $('#max-frag');
  var maxFragDisplay = $('#max-frag-display');

  var minLength = 2;
  var maxLength = 2;

  var nameNum = window.names.length;

  var randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var times = function (n, fn) {
    var list = [];
    for (var i = 1; i <= n; i++) {
      list.push(fn(i));
    }
    return list;
  };

  var generateNames = function (names) {
    return function () {
      var length = randomInt(minLength, maxLength);
      return times(length, function () {
        return names[randomInt(0, names.length - 1)];
      }).join('');
    };
  };

  var totalPossibleCalc = function (min, max, gen) {
    var ans = 0;
    for (var i = min; i <= max; i++) {
      ans += Math.pow(gen, i);
    }
    return ans;
  };

  var possible = function () {
    maxLength = maxFrag.val();
    var totalPossible = totalPossibleCalc(minLength, maxLength, nameNum);
    maxFragDisplay.html(maxLength);
    possib.html(totalPossible);
  };

  var defaultGenerator = generateNames(window.names);

  var gen = function () {
    var names = times(15, defaultGenerator);

    list.empty();

    names
      .map(function (name) {
        return name.substring(0, 1).toUpperCase() + name.substring(1);
      })
      .map(function (name) {
        var listElem = $('<li>' + name + '</li>');
        return listElem;
      }).forEach(function (listElem) {
        list.append(listElem);
      });
  };

  maxFrag.on('input', possible);
  button.on('click', gen);

  possible();
  gen();

})(window, document);
