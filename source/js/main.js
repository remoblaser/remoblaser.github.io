SimpleJekyllSearch({
  searchInput: document.getElementById('search-input'),
  resultsContainer: document.getElementById('results-container'),
  json: 'http://blog.remoblaser.ch/search.json',
  searchResultTemplate: '<li><a href="{url}" title="{title}">{title}</a></li>',
  noResultsText: '<li class="no-results">No results found :(</li>',
  limit: 10,
  fuzzy: false
});

$(document).ready(function() {
  $('.sliding-panel-button,.sliding-panel-fade-screen,.sliding-panel-close').on('click touchstart',function (e) {
    $('.sliding-panel-content,.sliding-panel-fade-screen').toggleClass('is-visible');
    e.preventDefault();
  });

  setTimeout(showSubscribePanel, 4000);
});

document.onkeypress = function (e) {
  e = e || window.event;
  if(e.charCode === 115)
  {
    $('#search-input').focus();
  }
};

function showSubscribePanel()
{
  $('.subscribe .close').click(function()
  {
    $('.site-footer').css('padding-bottom', '2em');
    $('.subscribe').fadeOut();
  });
  $('.site-footer').css('padding-bottom', '108px');
  $('.subscribe').fadeIn();
}