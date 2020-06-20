import { Application, Router } from 'https://deno.land/x/oak/mod.ts'

const router = new Router();
const app = new Application();

router.get('/', ({response}) => {
    response.body = 'hello word'
});

app.use(router.routes());

console.log('server running on port', 3000);

await app.listen({port:3000});