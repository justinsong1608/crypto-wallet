/* exported data */
var data = {
  coins: []
};

window.addEventListener('beforeunload', event => {
  var steralData = JSON.stringify(data);
  localStorage.setItem('cryptocurrency', steralData);
});

if (localStorage.getItem('code-journal')) {
  var previous = localStorage.getItem('cryptocurrency');
  data = JSON.parse(previous);
}
