//resource : http://codepen.io/thedoer/pen/EKbrpO?editors=0010
function wikipediaviewer(query){
   $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&grnnamespace=0&prop=extracts&exlimit=max&explaintext&exintro&gsrsearch=" + query + "&callback=?", function(result) {
      // button Choose For Me ready to be clicked again
      $("#submit").attr("disabled", false);
      if (result.hasOwnProperty("query")) {
         $.each(result.query.pages, function(key, page){
            var extract = page.extract.length > 464 ? page.extract.substring(0,464) + "..." : page.extract;
            $("#article-list").append('<li><h2><a target="_blank" href="http://en.wikipedia.org/?curid=' + page.pageid + '">' + page.title + '</a></h2>' + '<p>' + extract + '</p>' + '</li>');
         });
      }
   });
}

$(document).ready(function() {
	$("#blank").hide();
	$("#submit").on("click", function(e){
		$("#article-list").html("");

		$("#article-list").fadeIn(500);
		
		if ($("#query").val() === "") {
			$("#blank").fadeIn(200);

		} else {
			$(this).attr("disabled", true);
			wikipediaviewer($("#query").val());
			$("#blank").hide();
		}
		e.preventDefault();
	});
});