const dataNullHandle = (res) => {
  return res.send({
    message: "Data belum ada / data tidak ditemukan",
  });
};

const successLoad = (res, results) => {
  return res.send({
    message: "Data berhasil diload",
    data: results,
  });
};

const successDataHandle = (type, res) => {
  if (type === "save") {
    return res.send({
      message: "Data berhasil disimpan",
      data: res,
    });
  } else if (type === "update") {
    return res.send({
      message: "Data berhasil diupdate",
    });
  } else if (type === "delete") {
    return res.send({
      message: "Data berhasil dihapus",
    });
  }
};

module.exports = { dataNullHandle, successLoad, successDataHandle };
