/* global $*/

function fetch(query) {
  return $.ajax({
    url: "//en.wikipedia.org/w/api.php",
    data: { action: "query", list: "search", srsearch: query, format: "json" },
    dataType: "jsonp",
  });
}

function render(results) {
  var $sr = $("search-result");
  var html = results.map(function(result) {
    return '<a class="result"' +
           '   href="https://en.wikipedia.org/wiki/'+result.title+'">' +
           '  <h2>'+result.title+'</h2>' +
           '  <div>'+result.snippet+'</div>' +
           '</a>';
  }).join("\n\n");
  $sr.html("");
  $(html).appendTo($sr);
}

$("#wikisearch").on("submit", function(e) {
  e.preventDefault();
  var query = $("#wikiquery").val();
  fetch(query)
    .done(function(data) {
      console.log(data);
      render(data.query.search);
    });
});