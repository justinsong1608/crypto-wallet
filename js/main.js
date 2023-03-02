var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.coincap.io/v2/assets');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  if (localStorage.getItem('cryptocurrency')) {
    for (var t = 0; t < data.coins.length; t++) {
      $tBody.appendChild(renderCrypto(data.coins[t]));
    }
  } else {
    for (var i = 0; i < 50; i++) {
      data.coins.push(xhr.response.data[i]);
    }
    for (var k = 0; k < data.coins.length; k++) {
      $tBody.appendChild(renderCrypto(data.coins[k]));
    }
  }
});
xhr.send();

document.addEventListener('DOMContentLoaded', event => {
  viewSwap(data.view);
});

var $tBody = document.querySelector('tbody');

function renderCrypto(crypto) {
  var $tr = document.createElement('tr');

  var $tdOne = document.createElement('td');
  $tdOne.textContent = crypto.rank;
  $tr.appendChild($tdOne);

  var $tdTwo = document.createElement('td');
  $tdTwo.textContent = crypto.name + '(' + crypto.symbol + ')';
  $tr.appendChild($tdTwo);

  var $tdThree = document.createElement('td');
  $tdThree.textContent = '$' + parseFloat(crypto.priceUsd).toFixed(2);
  $tr.appendChild($tdThree);

  var $tdFour = document.createElement('td');
  $tdFour.textContent = parseFloat(crypto.changePercent24Hr).toFixed(2) + '%';
  $tr.appendChild($tdFour);

  var $tdFive = document.createElement('td');
  $tdFive.textContent = parseInt(parseFloat(crypto.marketCapUsd).toFixed(0)).toLocaleString();
  $tr.appendChild($tdFive);

  var $tdSix = document.createElement('td');
  $tdSix.textContent = parseInt(parseFloat(crypto.volumeUsd24Hr).toFixed(0)).toLocaleString();
  $tr.appendChild($tdSix);

  var $tdSeven = document.createElement('td');
  $tdSeven.textContent = parseInt(parseFloat(crypto.supply).toFixed(0)).toLocaleString();
  $tr.appendChild($tdSeven);

  var $tdEight = document.createElement('td');
  $tr.appendChild($tdEight);

  var $iTag = document.createElement('i');
  $iTag.setAttribute('class', 'fa-solid fa-plus');
  $tdEight.appendChild($iTag);

  return $tr;
}

var $homePage = document.querySelector('div[data-view=home-page]');
var $converterPage = document.querySelector('div[data-view=converter-page]');
var $walletPage = document.querySelector('div[data-view=wallet-page]');
function viewSwap(view) {
  if (view === 'home-page') {
    $homePage.setAttribute('class', '');
    data.view = view;
    $converterPage.setAttribute('class', 'hidden');
    $walletPage.setAttribute('class', 'hidden');
  } else if (view === 'converter-page') {
    $converterPage.setAttribute('class', '');
    data.view = view;
    $homePage.setAttribute('class', 'hidden');
    $walletPage.setAttribute('class', 'hidden');
  } else if (view === 'wallet-page') {
    $walletPage.setAttribute('class', '');
    data.view = view;
    $homePage.setAttribute('class', 'hidden');
    $converterPage.setAttribute('class', 'hidden');
  }
}

var $coinsTab = document.querySelector('#coin-tab');
var $converterTab = document.querySelector('#converter-tab');
var $walletTab = document.querySelector('#wallet-tab');
$coinsTab.addEventListener('click', function () { viewSwap('home-page'); });
$converterTab.addEventListener('click', function () { viewSwap('converter-page'); });
$walletTab.addEventListener('click', function () { viewSwap('wallet-page'); });
var $form = document.querySelector('form');

function convert(event) {
  event.preventDefault();
  var $totalCalculated = document.querySelector('#total-calculated');
  var currencyOne = $form.elements.currencyone.value;
  var currencyTwo = $form.elements.currencytwo.value;
  var amount = $form.elements.amount.value;
  var yourTotal;
  var totalSymbol;
  var totalWorth;
  for (var i = 0; i < data.coins.length; i++) {
    var lowerCaseOne = currencyOne.toLowerCase();
    var firstWordCapOne = lowerCaseOne[0].toUpperCase();
    if (lowerCaseOne.replace(lowerCaseOne[0], firstWordCapOne) === data.coins[i].name) {
      yourTotal = parseFloat(parseInt(parseFloat(amount).toFixed(2)) * parseInt(parseFloat(data.coins[i].priceUsd).toFixed(2))).toFixed(2);
      break;
    }
  }

  for (var k = 0; k < data.coins.length; k++) {
    var lowerCaseTwo = currencyTwo.toLowerCase();
    var firstWordCapTwo = lowerCaseTwo[0].toUpperCase();
    if (lowerCaseTwo.replace(lowerCaseTwo[0], firstWordCapTwo) === data.coins[k].name) {
      totalSymbol = data.coins[k].symbol;
      totalWorth = yourTotal / parseInt(parseFloat(data.coins[k].priceUsd).toFixed(2));
      break;
    }
  }
  var finalTotal = $totalCalculated.textContent = parseFloat(totalWorth).toFixed(5) + ' ' + totalSymbol;
  return finalTotal;
}
$form.addEventListener('submit', convert);
