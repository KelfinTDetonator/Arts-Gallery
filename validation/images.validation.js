const { validateImage } = require('image-validator')

const fileValidation = async (file) => {
    const isValidImage = await validateImage(file);
    console.log(isValidImage);
    return isValidImage
};

const urlValidation = async (url) => {
    try {
      const isValidImage = await validateImage(url, { throw: true });
      console.log(isValidImage);
      return isValidImage
    } catch (err) {
      console.error(err);
    }
};

module.exports = {
    fileValidation,
    urlValidation,

}