$(function() {
  var isLoaded = false;
  var elmComments = $("section.comments");
  var elmWindow = $(window);

  function loadDisqusScript() {
    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
    dsq.src = 'https://' + disqus_shortname + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
  }

  function onWindowScroll() {
    if ( !isLoaded && (elmWindow.scrollTop() + $(window).height() > elmComments.offset().top)) {
      isLoaded = true;
      loadDisqusScript();
    }
  }

  $(window).scroll(_.debounce(onWindowScroll, 10));


});
