const autocannon=require('autocannon')
const {PassThrough}=require('stream')

function run(url){
    const buff=[]
    const outputStream=new PassThrough

    const inst=autocannon({
        url,
        connections:100,
        duration:20
    })

    autocannon.track(inst,(outputStream))

    outputStream.on('data',data=>buff.push(data))

    inst.on('done',function(){
        process.stdout.write(Buffer.concat(buff))
    })
}

console.log('Running tests /info')
run("http://localhost:8080/info")