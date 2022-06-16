const pool = require("../config/database");
const {
  errorHandleConnectionDB,
  errorHanlderQuery,
} = require("../util/error_response");
const { dataNullHandle, successLoad } = require("../util/success_response");

exports.getAllCategory = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      errorHandleConnectionDB(500, err, res);
    } else {
      const getCategoryQry =
        "SELECT id, category, isActive, image FROM tb_category ORDER BY id DESC";
      connection.query(getCategoryQry, (err, resultsCategories) => {
        connection.release();

        if (err) {
          errorHanlderQuery(400, "get all categories data", err, res);
        }

        if (resultsCategories.length === 0) {
          dataNullHandle(res);
        } else {
          successLoad(res, resultsCategories);
        }
      });
    }
  });
};
