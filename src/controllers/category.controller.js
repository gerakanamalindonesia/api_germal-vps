const pool = require("../config/database");
const cloudinary = require("../util/cloudinary");
const { v4: uuidv4 } = require("uuid");
const { errorHanlderQuery } = require("../util/error_response");
const { dataNullHandle, successLoad } = require("../util/success_response");
const { deleteFile } = require("../util/deleteFile");

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
    const response = await client.query(catStatusQey, [req.query.isactive]);

    if (response.length === 0) {
      dataNullHandle(res);
    } else {
      return res.status(200).send({
        message: "Success get category by isactive",
        data: response.rows,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Terjadi kesalahan saat melakukan get category by isactive",
      error: error,
    });
  } finally {
    client.release();
  }
};

/**
 * Get detail category
 * Mengambil data category berdasarkan ID category
 * @method : GET
 * @param : id category
 * @response : detail category berdasarkan ID category
 */
exports.getDetailCategory = async (req, res) => {
  const client = await pool.connect();

  try {
    const detailCatQry =
      "SELECT id, category, isactive, image FROM tb_category WHERE id = $1";
    const response = await client.query(detailCatQry, [req.params.id]);

    if (response.length === 0) {
      return res.status(200).send({
        message: "Data tidak ada / tidak ditemukan",
      });
    } else {
      return res.status(200).send({
        message: "Success get category by id",
        data: response.rows,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Terjadi kesalahan saat melakukan get detail category",
      error: error,
    });
  } finally {
    client.release();
  }
};

/**
 * Delete category
 * Menghapus category berdasarkan ID category
 * @method : Delete
 * @parameter : ID category
 */
exports.deleteCategory = async (req, res) => {
  const client = await pool.connect();

  try {
    // ambil image categori, kemudian ambil public IDnya (nama filenya saja tanpa extension)
    const findCatQry = "SELECT image FROM tb_category WHERE id = $1";
    const resFindCat = await client.query(findCatQry, [req.params.id]);

    let arrImg = resFindCat.rows[0].image.split("/");
    let lastElImg = arrImg[arrImg.length - 1];
    let getIdImg = lastElImg.split(".");

    await cloudinary.uploader.destroy("categories/" + getIdImg[0]);

    const delCatQry = "DELETE FROM tb_category WHERE id = $1";
    const response = await client.query(delCatQry, [req.params.id]);

    return res.send({
      message: "Data berhasil dihapus",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Terjadi kesalahan saat melakukan query delete category",
      error: error,
    });
  } finally {
    client.release();
  }
};

/**
 * Update category
 * Melakukan perubahan data category
 * @method : patch
 * @parameter : ID category
 * @body : category, isActive
 * @file : opsioanal, bisa mengupdate gambar maupun tidak
 */
exports.updateCategory = async (req, res) => {
  const { category, isActive } = req.body;

  const client = await pool.connect();

  try {
    if (!req.file) {
      // jika tidak ada gambar yang diupload
      const updateCatQry =
        "UPDATE tb_category SET category = $1 isActive = $2 WHERE id = $3";
      const updateCatPrm = [category, isActive, req.params.id];
      const response = await client.query(updateCatQry, updateCatPrm);

      return res.send({
        message: "Data berhasil diupdate",
        data: response.rows,
      });
    } else {
      // ambil image data yang akan diubah
      const findCatQry = "SELECT image FROM tb_category WHERE id = $1";
      const resFindCat = await client.query(findCatQry, [req.params.id]);

      // delete file di cloudinary
      deleteFile("categories", resFindCat.rows[0].image);

      const updateCatQry =
        "UPDATE tb_category SET category = $1 isActive = $2 image = $3 WHERE id = $4";
      const updateCatPrm = [category, isActive, req.file.path, req.params.id];
      const response = await client.query(updateCatQry, updateCatPrm);

      return res.send({
        message: "Data berhasil diupdate",
        data: response.rows,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      messsage: "Terjadi kesalahan saat melakukan query update category",
      error: error,
    });
  } finally {
    client.release();
  }
};
