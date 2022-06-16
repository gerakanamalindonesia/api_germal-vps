const errorHandle = (statusCode, err, res) => {
  console.log(err);
  return res.status(statusCode).send({
    message: "Terjadi kesalahan",
    error: err,
  });
};

const errorDataExists = (data, res) => {
  return res.status(409).send({
    message: `Data ${data} sudah ada`,
  });
};

const errorHanlderQuery = (statusCode, type, err, res) => {
  console.log(err);
  return res.status(statusCode).send({
    message: `Terjadi kesalahan saat melakukan query ${type}`,
    error: err,
  });
};

const errorHandleConnectionDB = (statusCode, err, res) => {
  console.log(err);
  return res.status(statusCode).send({
    message: `Terjadi kesalahan pada koneksi database`,
    error: err,
  });
};

module.exports = {
  errorHandle,
  errorDataExists,
  errorHanlderQuery,
  errorHandleConnectionDB,
};
