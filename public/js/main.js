const socket = io();

socket.on("connect", () =>{
    console.log("Conectado al servidor")
})

socket.on("personas_registradas", (people) => {
    const url = "http://localhost:3000/index.hbs";
    fetch(url).then((resp) => {
    console.log(resp)
    return resp.text()
    }).then((text) => {
        const template = Handlebars.compile(text)
        const html = template({people: people})
        document.querySelector("#people").innerHTML = html
    })
});

socket.on("NEW_MESSAGE", (msg) => {
    appendMessage(msg)
})