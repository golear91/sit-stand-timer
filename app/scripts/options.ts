'use strict';

$('#foo').slider({
  formatter: function(value) {
    return `${value} minutes`;
  }
})
.on('slide', (ev)=>{
  $('#minutes').html(ev.value.toString());
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