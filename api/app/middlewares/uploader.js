const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

module.exports = (req, res, next) => {
  try {
    const form = new formidable.IncomingForm();
    return form.parse(req, async (err, fields, files) => {
      if (err) return next(err);

      if (!files.avatar) {
        req.user = fields;
        return next();
      }

      const host = process.env.SERVER_HOST;
      const port = process.env.SERVER_PORT;
      const protocol = process.env.SERVER_SSL ? process.env.SERVER_SSL : 'http';

      const filePath = `${req.userId}-${files.avatar.name}`;
      const oldPath = files.avatar.path;
      const newPath = `${path.resolve('uploads')}/${filePath}`;

      fs.rename(oldPath, newPath, (errRename) => {
        if (errRename) throw Error(errRename);

        return console.log('Uploaded');
      });

      const user = {
        ...fields,
        avatar_url: `${protocol}://${host}:${port}/${filePath}`,
      };

      req.user = user;
      return next();
    });
  } catch (err) {
    return next(err);
  }
};
