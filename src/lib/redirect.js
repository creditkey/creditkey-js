const redirect = source => {

  let uri;
  const isModal = source.indexOf('modal');
  isModal <= 0 ? uri = source.replace('modal', 'redirect') : uri = source;

  if(navigator.userAgent.match(/Android/i)) 
    document.location = uri;      
  else
    window.location.replace(uri);
}

export default redirect;
