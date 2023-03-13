var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.coincap.io/v2/assets');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  if (data.coins.length > 1) {
    data.coins = [];
    for (var i = 0; i < 50; i++) {
      data.coins.push(xhr.response.data[i]);
    }
    for (var k = 0; k < data.coins.length; k++) {
      $tBody.appendChild(renderCrypto(data.coins[k]));
    }
  } else {
    for (var t = 0; t < 50; t++) {
      data.coins.push(xhr.response.data[t]);
    }
    for (var p = 0; p < data.coins.length; p++) {
      $tBody.appendChild(renderCrypto(data.coins[p]));
    }
  }
});
xhr.send();

function updateInfo() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.coincap.io/v2/assets');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if (data.coins.length > 1) {
      data.coins = [];
      $tBody.remove();
      var $newTBody = document.createElement('tbody');
      var $table = document.querySelector('table');
      $table.appendChild($newTBody);
      $tBody = document.querySelector('tbody');
      for (var i = 0; i < 50; i++) {
        data.coins.push(xhr.response.data[i]);
      }
      for (var k = 0; k < data.coins.length; k++) {
        $tBody.appendChild(renderCrypto(data.coins[k]));
      }
    }
  });
  xhr.send();
}

setInterval(updateInfo, 30000);

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
  $tdThree.textContent = '$' + parseFloat(parseFloat(crypto.priceUsd).toFixed(2)).toLocaleString();
  $tr.appendChild($tdThree);

  var $tdFour = document.createElement('td');
  $tdFour.textContent = parseFloat(crypto.changePercent24Hr).toFixed(2) + '%';
  $tr.appendChild($tdFour);

  var $tdFive = document.createElement('td');
  $tdFive.setAttribute('class', 'nothing');
  $tdFive.textContent = parseFloat(parseFloat(crypto.marketCapUsd).toFixed(0)).toLocaleString();
  $tr.appendChild($tdFive);

  var $tdSix = document.createElement('td');
  $tdSix.setAttribute('class', 'nothing');
  $tdSix.textContent = parseFloat(parseFloat(crypto.volumeUsd24Hr).toFixed(0)).toLocaleString();
  $tr.appendChild($tdSix);

  var $tdSeven = document.createElement('td');
  $tdSeven.setAttribute('class', 'nothing');
  $tdSeven.textContent = parseFloat(parseFloat(crypto.supply).toFixed(0)).toLocaleString();
  $tr.appendChild($tdSeven);

  var $tdEight = document.createElement('td');
  $tr.appendChild($tdEight);

  var $iTag = document.createElement('i');
  if (data.myWallet.length > 0) {
    if (data.myWallet.find(item => item.id === crypto.id) === undefined) {
      $iTag.setAttribute('class', 'fa-solid fa-plus');
      $tdEight.appendChild($iTag);
    } else {
      $iTag.setAttribute('class', 'fa-solid fa-plus hidden');
      $tdEight.appendChild($iTag);
    }
  } else {
    $iTag.setAttribute('class', 'fa-solid fa-plus');
    $tdEight.appendChild($iTag);
  }
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
var $converter = document.querySelector('#converter');

function convert(event) {
  event.preventDefault();
  var $totalCalculated = document.querySelector('#total-calculated');
  var currencyOne = $converter.elements.currencyone.value;
  var currencyTwo = $converter.elements.currencytwo.value;
  var amount = $converter.elements.amount.value;
  var yourTotal;
  var totalSymbol;
  var totalWorth;
  for (var i = 0; i < data.coins.length; i++) {
    var lowerCaseOne = currencyOne.toLowerCase();
    var firstWordCapOne = lowerCaseOne[0].toUpperCase();
    if (lowerCaseOne.replace(lowerCaseOne[0], firstWordCapOne) === data.coins[i].name) {
      yourTotal = parseFloat(parseFloat(amount).toFixed(2) * parseFloat(parseFloat(data.coins[i].priceUsd).toFixed(2))).toFixed(2);
      break;
    }
  }

  for (var k = 0; k < data.coins.length; k++) {
    var lowerCaseTwo = currencyTwo.toLowerCase();
    var firstWordCapTwo = lowerCaseTwo[0].toUpperCase();
    if (lowerCaseTwo.replace(lowerCaseTwo[0], firstWordCapTwo) === data.coins[k].name) {
      totalSymbol = data.coins[k].symbol;
      totalWorth = yourTotal / parseFloat(parseFloat(data.coins[k].priceUsd).toFixed(2));
      break;
    }
  }
  var finalTotal = $totalCalculated.textContent = parseFloat(totalWorth).toFixed(5) + ' ' + totalSymbol;
  return finalTotal;
}
$converter.addEventListener('submit', convert);

var $totalForm = document.querySelector('#add-modal');
var $overlay = document.querySelector('.overlay');
var $table = document.querySelector('table');
$table.addEventListener('click', handleClick);
function handleClick(event) {
  if (event.target.nodeName === 'I') {
    $overlay.className = 'overlay';
    var $closestCrypto = event.target.closest('tr');
    var $tr = document.querySelectorAll('tr');
    for (var i = 1; i < data.coins.length + 1; i++) {
      if ($closestCrypto === $tr[i]) {
        data.add.push(data.coins[i - 1]);
      }
    }
  }
}
function cancel(event) {
  if (event.target.id === 'cancel-button-total') {
    $overlay.className = 'overlay hidden';
    data.add = [];
  }
}
$totalForm.addEventListener('click', cancel);

$totalForm.addEventListener('submit', function () {
  event.preventDefault();
  var count = $totalForm.elements.total.value;
  data.add[0].total = count;
  data.myWallet.push(data.add[0]);
  $card.appendChild(renderMyWallet(data.add[0]));
  for (var i = 0; i < data.coins.length; i++) {
    var $addIcon = document.querySelectorAll('.fa-plus');
    if (data.add[0].name === data.coins[i].name) {
      $addIcon[i].setAttribute('class', 'fa-solid fa-plus hidden');
    }
  }
  data.add = [];
  $totalAmount.textContent = addYourTotal(data.myWallet);
  $overlay.className = 'overlay hidden';
  $totalForm.reset();
});

var $card = document.querySelector('#card');
function renderMyWallet(coin) {
  var $div = document.createElement('div');
  $div.setAttribute('class', 'card-wrapper');

  var $h3 = document.createElement('h3');
  $h3.textContent = coin.name + '(' + coin.symbol + ')';
  $div.appendChild($h3);

  var $divChild = document.createElement('div');
  $divChild.setAttribute('class', 'card-container');
  $div.appendChild($divChild);

  var $pOne = document.createElement('p');
  var $spanOne = document.createElement('span');
  $pOne.textContent = 'Rank: ';
  $spanOne.textContent = coin.rank;
  $pOne.append($spanOne);
  $divChild.appendChild($pOne);

  var $pTwo = document.createElement('p');
  var $spanTwo = document.createElement('span');
  $pTwo.textContent = 'Price: ';
  $spanTwo.textContent = '$' + parseFloat(parseFloat(coin.priceUsd).toFixed(2)).toLocaleString();
  $pTwo.append($spanTwo);
  $divChild.appendChild($pTwo);

  var $pThree = document.createElement('p');
  var $spanThree = document.createElement('span');
  $pThree.textContent = '24%: ';
  $spanThree.textContent = parseFloat(coin.changePercent24Hr).toFixed(2) + '%';
  $pThree.append($spanThree);
  $divChild.appendChild($pThree);

  var $pFour = document.createElement('p');
  var $spanFour = document.createElement('span');
  $pFour.textContent = 'Market Cap: ';
  $spanFour.textContent = parseFloat(parseFloat(coin.marketCapUsd).toFixed(0)).toLocaleString();
  $pFour.append($spanFour);
  $divChild.appendChild($pFour);

  var $pFive = document.createElement('p');
  var $spanFive = document.createElement('span');
  $pFive.textContent = 'Volume(24h): ';
  $spanFive.textContent = parseFloat(parseFloat(coin.volumeUsd24Hr).toFixed(0)).toLocaleString();
  $pFive.append($spanFive);
  $divChild.appendChild($pFive);

  var $pSix = document.createElement('p');
  var $spanSix = document.createElement('span');
  $pSix.textContent = 'Circulating Supply: ';
  $spanSix.textContent = parseFloat(parseFloat(coin.supply).toFixed(0)).toLocaleString();
  $pSix.append($spanSix);
  $divChild.appendChild($pSix);

  var $pSeven = document.createElement('p');
  var $spanSeven = document.createElement('span');
  $spanSeven.setAttribute('class', 'edit-total');
  $pSeven.textContent = 'Total: ';
  $spanSeven.textContent = coin.total;
  $pSeven.append($spanSeven);
  $div.appendChild($pSeven);

  var $editDiv = document.createElement('div');
  $editDiv.setAttribute('class', 'edit-minus');
  $div.appendChild($editDiv);

  var $editTag = document.createElement('i');
  $editTag.setAttribute('class', 'fa-regular fa-pen-to-square fa-l');
  $editDiv.appendChild($editTag);

  var $iTag = document.createElement('i');
  $iTag.setAttribute('class', 'fa-solid fa-minus fa-xl');
  $editDiv.appendChild($iTag);

  return $div;
}

for (var k = 0; k < data.myWallet.length; k++) {
  $card.appendChild(renderMyWallet(data.myWallet[k]));
}

function addYourTotal(arr) {
  var totalCount = 0;
  for (var i = 0; i < data.myWallet.length; i++) {
    totalCount += ((parseFloat(parseFloat(data.myWallet[i].priceUsd).toFixed(2))) * parseFloat(parseFloat(data.myWallet[i].total).toFixed(2)));
  }
  return '$' + totalCount.toLocaleString();
}
var $totalAmount = document.querySelector('#total-amount');

$totalAmount.textContent = addYourTotal(data.myWallet);

var $overlayDelete = document.querySelectorAll('.overlay')[1];

function deleteCoin(event) {
  if (event.target.classList.contains('fa-minus')) {
    $overlayDelete.className = 'overlay';
    var $closestCrypto = event.target.closest('.card-wrapper');
    var $cardWrapper = document.querySelectorAll('.card-wrapper');
    for (var i = 0; i < data.myWallet.length + 1; i++) {
      if ($closestCrypto === $cardWrapper[i]) {
        data.delete.push(data.myWallet[i]);
        data.delete.push($cardWrapper[i]);
      }
    }
  }
}
$card.addEventListener('click', deleteCoin);

var $modalButton = document.querySelector('#delete-buttons');
function cancelDelete(event) {
  if (event.target.id === 'cancel-button-delete') {
    $overlayDelete.className = 'overlay hidden';
    data.delete = [];
  }
}
$modalButton.addEventListener('click', cancelDelete);

function confirmDelete(event) {
  if (event.target.id === 'confirm-button-delete') {
    $overlayDelete.className = 'overlay hidden';
    for (var i = 0; i < data.myWallet.length; i++) {
      if (data.delete[0] === data.myWallet[i]) {
        data.myWallet.splice(i, 1);
        data.delete[1].remove();
        $totalAmount.textContent = addYourTotal(data.myWallet);
        var $addIcon = document.querySelectorAll('.fa-plus');
        $addIcon[parseInt(data.delete[0].rank) - 1].className = 'fa-solid fa-plus';
        data.delete = [];
      }
    }
  }
}
$modalButton.addEventListener('click', confirmDelete);

var $overlayEdit = document.querySelectorAll('.overlay')[2];
function openEdit(event) {
  if (event.target.classList.contains('fa-pen-to-square')) {
    $overlayEdit.className = 'overlay';
    var $closestCrypto = event.target.closest('.card-wrapper');
    var $cardWrapper = document.querySelectorAll('.card-wrapper');
    for (var i = 0; i < data.myWallet.length + 1; i++) {
      if ($closestCrypto === $cardWrapper[i]) {
        data.edit.push(data.myWallet[i]);
      }
    }
  }
}

$card.addEventListener('click', openEdit);

var $cancelEdit = document.querySelector('#cancel-button-edit');

$cancelEdit.addEventListener('click', function () {
  $overlayEdit.className = 'overlay hidden';
  data.edit = [];
});

var $editForm = document.querySelector('#edit-modal');

$editForm.addEventListener('submit', function () {
  event.preventDefault();
  var count = $editForm.elements.edit.value;
  data.edit.total = count;
  for (var i = 0; i < data.myWallet.length; i++) {
    if (data.edit[0].name === data.myWallet[i].name) {
      data.myWallet[i].total = data.edit.total;
    }
  }

  $overlayEdit.className = 'overlay hidden';
  var $editTotalPrice = document.querySelectorAll('.edit-total');
  for (var k = 0; k < data.myWallet.length; k++) {
    if (data.edit[0].name === data.myWallet[k].name) {
      $editTotalPrice[k].textContent = data.edit.total;
    }
  }
  $totalAmount.textContent = addYourTotal(data.myWallet);
  data.edit = [];
  $editForm.reset();
});
