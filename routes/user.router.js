import express from 'express';
var router = express.Router();

import * as UserController from '../controller/user.controller.js';

router.post("/save",UserController.save);

router.get("/fetch",UserController.fetch);

router.delete("/delete",UserController.deleteUser);

router.patch("/update",UserController.update);

router.post("/login",UserController.login);

export default router;