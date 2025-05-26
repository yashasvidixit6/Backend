import express from 'express';
var router = express.Router();

import * as CategoryController from '../controller/category.controller.js'; 

router.post("/save",CategoryController.save);

router.get("/fetch",CategoryController.fetch);

router.delete("/delete",CategoryController.deleteUser);

router.patch("/update",CategoryController.update);

export default router;