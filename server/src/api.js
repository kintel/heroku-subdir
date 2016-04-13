import { Router } from 'express';
const pkg = require('../package.json');

const router = new Router();

router.get('/ping', function(req, res) {
  res.json({
    success: true,
    message: "Public ping",
    version: pkg.version
  });
});

export default router;
