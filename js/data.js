/* exported data */
var data = {
  view: 'home-page',
  coins: [],
  myWallet: []
};

window.addEventListener('beforeunload', event => {
  var steralData = JSON.stringify(data);
  localStorage.setItem('cryptocurrency', steralData);
});

if (localStorage.getItem('cryptocurrency')) {
  var previous = localStorage.getItem('cryptocurrency');
  data = JSON.parse(previous);
}
