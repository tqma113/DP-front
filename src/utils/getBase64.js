const getBase64 = (img, callback) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    if (callback) callback(reader.result)
    resolve(reader.result)
  });
  reader.readAsDataURL(img);
})

export default getBase64
