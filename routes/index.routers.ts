import {  Router } from 'https://deno.land/x/oak/mod.ts'

import * as indexCtrl from '../controllers/index.controllers.ts' 

const router = new Router();

router.get('/', ({response}) => {
    response.body = 'hello word'
});

router.get('/user', indexCtrl.getUsers);

export default router;