export default (name) => {
  let reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  let arr = document.cookie.match(reg)
  if(arr)
    return unescape(arr[2]);
  else
    return null;
}
