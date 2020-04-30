const express = require('express');

import * as UserController from "./controllers/user.controller";
import * as HomeController from "./controllers/home.controller";

var router = express.Router();

router.route('/init').get(HomeController.getInit);

//user
router.route('/create/:type').post(UserController.createContributor);
router.route('/login/:type/:login/:password').get(UserController.loginContributor);

//router.route('/movie').post(movieCtrl.postMovie);

export default router;