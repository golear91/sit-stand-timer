'use strict';

const INTERVAL_STORAGE_KEY: string = 'interval-storage-key';

chrome.storage.local.get(INTERVAL_STORAGE_KEY, function (result) {
  let interval: number = 30;
  if (result[INTERVAL_STORAGE_KEY] != 'undefined') {
    interval = result[INTERVAL_STORAGE_KEY];
  }
  $('#foo').slider({
    value: interval,
    formatter: function (value) {
      return `${value} minutes`;
    }
  })
    .on('slideStop', (ev) => {
      let obj = {};
      obj[INTERVAL_STORAGE_KEY] = ev.value;
      chrome.storage.local.set(obj);
    });
});


/*
{
  min:0,
  max: 120,
  step: 10,
  orientation: 'horizontal',
  value: 30,
  tooltip: 'show',
  handle: 'round'
});
*/
/*
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});
*/
console.log('\'Allo \'Allo! Option');