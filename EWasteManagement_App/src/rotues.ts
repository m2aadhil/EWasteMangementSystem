const express = require('express');

import * as UserController from "./controllers/user.controller";
import * as RequestController from "./controllers/request.controller";
import * as HomeController from "./controllers/home.controller";

var router = express.Router();

router.route('/init').get(HomeController.getInit);

//user
router.route('/create/:type').post(UserController.createContributor);
router.route('/getall/:type').get(UserController.getAllUsers);
router.route('/login/:type/:login/:password').get(UserController.loginContributor);
router.route('/resetpassword/:type/:login').get(UserController.resetPassword);
router.route('/company/getrating/:login/:company').get(UserController.getCompanyRating);
router.route('/company/addrating/:login/:company/:rating').get(UserController.addCompanyRating);

//requests
router.route('/request/create/:login').post(RequestController.createRequest);
router.route('/request/update/:login/:id').post(RequestController.updateRequest);
router.route('/request/contributor/getall/:login').get(RequestController.getRequestsByContributor);
router.route('/request/distributor/getall/:login').get(RequestController.getRequestsByDistributor);
router.route('/request/company/getall/:login').get(RequestController.getRequestsByCompany);
router.route('/request/get/:id').get(RequestController.getRequestsById);

//router.route('/movie').post(movieCtrl.postMovie);

export default router;