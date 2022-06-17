const pool = require("../config/database");
const {
  errorHandleConnectionDB,
  errorHanlderQuery,
} = require("../util/error_response");
const { dataNullHandle, successLoad } = require("../util/success_response");

exports.getAllCategory = async (req, res) => {
  const client = await pool.connect();
  try {
    const catQry =
      "SELECt id, category, isactive, image FROM tb_category ORDER BY id DESC";
    const response = await client.query(catQry);
    if (response.rows.length === 0) {
      dataNullHandle(res);
    } else {
      successLoad(res, response.rows);
    }
  } catch (error) {
    console.log(error);
    errorHanlderQuery(400, "get all categories", err, res);
  } finally {
    client.release();
  }
};
