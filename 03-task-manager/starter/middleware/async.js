const asyncWrapper = (asyncfn) => {
  return async (req, res, next) => {
    try {
      await asyncfn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
module.exports = asyncWrapper;
