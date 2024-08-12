const express = require('express');
const router = express.Router();
const { 
    getAllCategories, 
    getCategoryById, 
    createCategory, 
    updateCategory, 
    deleteCategory 
} = require('../controller/catgoryController');
const validateToken = require('../Middleware/validatToken');
const admin = require('../Middleware/admin');

router.route('/')
    .get(getAllCategories)
    .post(validateToken, admin, createCategory);

router.route('/:id')
    .get(getCategoryById)
    .patch(validateToken, admin, updateCategory)
    .delete(validateToken, admin, deleteCategory);

module.exports = router;
