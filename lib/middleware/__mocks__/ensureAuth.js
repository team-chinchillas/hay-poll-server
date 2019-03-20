
module.exports = () => (req, res, next) => {
  req.user = {
    email: 'test@gmail.com'
  };
  next();
};
