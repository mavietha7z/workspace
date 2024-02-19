import express from 'express';
import middleware from '../middleware';
import websiteController from '../controllers/website.controller';
import partnerController from '../controllers/partner.controller';
import settingController from '../controllers/setting.controller';

const router = express.Router();

// Get home page
router.get('/', (req, res) => {
    res.render('index.ejs', { hostname: req.hostname });
});

// Get router login
router.get('/admincp/login', websiteController.loginAdmin);

// API update telcos
router.post('/api/telcos', middleware.verifyAdmin, settingController.updateTelco);

// Get router admincp
router.get('/admincp', middleware.checkLogin, websiteController.admincpController);

// API update partners
router.post('/api/partners', middleware.verifyAdmin, partnerController.updatePartner);

// API update setting
router.post('/api/settings', middleware.verifyAdmin, settingController.updateSetting);

// Get router telcos
router.get('/admincp/telcos', middleware.checkLogin, websiteController.telcoController);

// Get router setting
router.get('/admincp/settings', middleware.checkLogin, websiteController.settingController);

// Get router partners
router.get('/admincp/partners', middleware.checkLogin, websiteController.partnerController);

export default router;
