history.pushState(null, null, location.href);
window.onpopstate = function(event) {
    history.go(1);
};
history.replaceState(null, null, document.URL);
