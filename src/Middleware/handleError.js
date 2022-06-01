const handleError = (err, req, res, next) => {
  console.log("err", err);
  res.status(500).json({ message: "something went wrong" });
};

module.exports = handleError;
