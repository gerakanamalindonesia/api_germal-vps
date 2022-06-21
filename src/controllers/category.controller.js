const pool = require("../config/database");
const cloudinary = require("../util/cloudinary");
const { v4: uuidv4 } = require("uuid");
const { errorHanlderQuery } = require("../util/error_response");
const {
  dataNullHandle,
  successLoad,
  successDataHandle,
} = require("../util/success_response");

/**
 * Get all category
 * Mengambil data kategori
 * @method: GET
 * @response : semua data kategori, baik yang active maupun inactive
 */
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

/**
 * Add new category
 * Menambahkan data kategori baru
 * @method: POST
 * @body : category, isActive
 * @response : data yang berhasil diinsert
 */
exports.addNewCategory = async (req, res) => {
  const { category, isActive } = req.body;

  const client = await pool.connect();

  try {
    // upload file to cloudinary
    const resImage = await cloudinary.uploader.upload(req.file.path, {
      folder: "categories",
    });

    const newCatQry =
      "INSERT INTO tb_category(id, category, isactive, image) VALUES($1,$2,$3,$4) RETURNING id, category";
    const newCatPrm = [uuidv4(), category, isActive, resImage.url];
    const response = await client.query(newCatQry, newCatPrm);
    return res.status(201).send({
      message: "Success melakukan insert category",
      data: response.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Terjadi kesalahan saat melakukan insert category",
      error: error,
    });
  } finally {
    client.release();
  }
};

/**
 * Get active/inactive category
 * Mengambil data actegory yang berstatus active / inactive
 * @method : get
 * @param : isactive (active / inactive)
 * @response : data category sesuai dengan parameter isactive
 */
exports.getCategoryWithStatus = async (req, res) => {
  const client = await pool.connect();

  try {
    const catStatusQey =
      "SELECT id, category, isactive, image FROM tb_category WHERE isactive = $1";
    const response = await client.query(catStatusQey, req.query.isactive);

    if (response.length === 0) {
      dataNullHandle(res);
    } else {
      return res.status(200).send({
        message: "Success get category by isactive",
        data: response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Terjadi kesalahan saat melakukan insert category",
      error: error,
    });
  } finally {
    client.release();
  }
};
