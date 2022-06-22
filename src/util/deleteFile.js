async function deleteFile(folder, image) {
  let arrImg = image.split("/");
  let lastElImg = arrImg[arrImg.length - 1];
  let getIdImg = lastElImg.split(".");

  await cloudinary.uploader.destroy(`${folder}/${getIdImg[0]}`);
}

module.exports = { deleteFile };
