var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.coincap.io/v2/assets');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  for (var i = 0; i < 50; i++) {
    data.coins.push(xhr.response.data[i]);
  }
});
xhr.send();

function renderCrypto(crypto) {
  var $tr = document.createElement('tr');

  var $tdOne = document.createElement('td');
  $tdOne.textContent = crypto.rank;
  $tr.appendChild($tdOne);

  var $tdTwo = document.createElement('td');
  $tdTwo.textContent = crypto.name + '(' + crypto.symbol + ')';
  $tr.appendChild($tdTwo);

  var $tdThree = document.createElement('td');
  $tdThree.textContent = parseFloat(crypto.changePercent24Hr).toFixed(2) + '%';
  $tr.appendChild($tdThree);

  var $tdFour = document.createElement('td');
  $tdFour.textContent = parseFloat(crypto.priceUsd).toFixed(2);
  $tr.appendChild($tdFour);

  var $tdFive = document.createElement('td');
  $tdFive.textContent = parseFloat(crypto.marketCapUsd).toFixed(0);
  $tr.appendChild($tdFive);

  var $tdSix = document.createElement('td');
  $tdSix.textContent = parseFloat(crypto.volumeUsd24Hr).toFixed(0);
  $tr.appendChild($tdSix);

  var $tdSeven = document.createElement('td');
  $tdSeven.textContent = parseFloat(crypto.maxSupply).toFixed(0);
  $tr.appendChild($tdSeven);

  var $tdEight = document.createElement('td');
  $tr.appendChild($tdEight);

  var $iTag = document.createElement('i');
  $iTag.setAttribute('class', 'fa-solid fa-plus');
  $tdEight.appendChild($iTag);

  return $tr;
}

renderCrypto(crypto);
