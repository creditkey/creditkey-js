var redirect = function redirect(source) {

  var uri = void 0;
  var isModal = source.indexOf('modal');
  isModal <= 0 ? uri = source.replace('modal', 'redirect') : uri = source;
  console.log(source, isModal);

  /*if(navigator.userAgent.match(/Android/i)) */
  //document.location = uri;      
  //else
  /*window.location.replace(uri);*/
};

export default redirect;