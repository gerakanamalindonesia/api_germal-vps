const pool = require("../config/database");

/**
 * Get all subcategories
 * Mengambil data subcategory
 * @method : GET
 * @response : data sub categories
 */
exports.getAllSubCategories = async (req, res) => {
  const client = await pool.connect();

  try {
    const subCatQry =
      "SELECT tb_subcategory.id, tb_subcategory.subcategory, tb_subcategory.categoryid, tb_category.category FROM tb_subcategory JOIN tb_category ON tb_category.id = tb_subcategory.categoryid ORDER BY tb_category.createdat DESC";
    const response = client.query(subCatQry);

    if (response.rows.length === 0) {
      return res.send({
        message: "Data berhasil diload",
      });
    } else {
      return res.send({
        message: "Data berhasil diload",
        data: response.rows,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Terjadi kesalahan saat melakukan query get all subcategories",
      error: error,
    });
  } finally {
    client.release();
  }
};
