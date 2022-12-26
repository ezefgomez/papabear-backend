import * as path from "https://deno.land/std@0.146.0/path/mod.ts";
import { Application, Router,Context,helpers } from 'https://deno.land/x/oak@v7.3.0/mod.ts';
import {oakCors} from "https://deno.land/x/cors@v1.2.2/oakCors.ts";

const app = new Application();
app.use(oakCors())

const port: number = 8000;

const colorArray:any=[]
const router = new Router();
const moduleDir = path.dirname(path.fromFileUrl(import.meta.url));
const publicDir = path.join(moduleDir, "public");

function getPublicFile(...filePath: string[]): Promise<Uint8Array> {
	return Deno.readFile(path.join(publicDir, ...filePath));
}

router.get("/",async (ctx:Context,next) => {
	ctx.response.body = await getPublicFile("form.html");
	ctx.response.type = "text/html";
	await next();
}); 

router.post('/save',async (ctx:Context)=>{
	const color= await ctx.request.body().value
	colorArray.push(color)
	const encoder=new TextEncoder()
    const res=encoder.encode(colorArray)
	await Deno.writeFile('colors.txt',res)
	ctx.response.status=200	
	ctx.response.body=`Agregado ${color}, colores guardados ${colorArray}`

})

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port });
console.log(`server is running on port: ${port}`);