const socket = io.connect();

let pantalla = document.getElementById('pantalla');
let botonChat = document.getElementById('btnChat');
botonChat.addEventListener('click', () => { validar() });

function validar() {
    let user = document.getElementById('userChat').value;
    let mensaje = document.getElementById('messageChat').value;
    if (mensaje === "" || user === "") {
        alert('Favor ingresar los campos requeridos');
    }
    else {
        let nuevoMensaje = {
            user: document.getElementById('userChat').value,
            mensaje: document.getElementById('messageChat').value
        };
        socket.emit('new-message', nuevoMensaje);
        document.getElementById('messageChat').value = "";
    };
}

let date = new Date();
newDate =   [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/') + ' ' + 
            [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');

function renderMessage(data) {
    let html = data.map((elem, i) => {
        return (`
        <div>
        Usuario: <strong style="color:blue">${elem.user}</strong></span>
        (a las <span>${newDate.toString()}</span>)
        dijo: <i style="color:green">${elem.mensaje}</i></div>`);
    }).join(' ');
    document.getElementById('pantalla').innerHTML = html;
}

socket.on('new-message-server', (data) => {
    renderMessage(data);
});


function oldMsg(data) {
    let html2 = data.map((elem, i) => {
        return (`
        <div>
        Usuario: <strong style="color:blue">${elem.message.user}</strong></span>
        (a las <span>${newDate.toString()}</span>)
        dijo: <i style="color:green">${elem.message.mensaje}</i></div>`);
    }).join(' ');
    document.getElementById('pantallaOld').innerHTML = html2;
}

document.getElementById("btnOldMsg").addEventListener("click", function () {
    fetch('http://localhost:8080/mensajes')
        .then(res => res.json())
        .then(data => oldMsg(data))
        .catch(err => console.log(err))
});


document.getElementById('btnForm').addEventListener('click', () => { validarForm() });

function validarForm() {
    let title = document.getElementById('title').value;
    let price = document.getElementById('price').value;
    let thumbnail = document.getElementById('thumbnail').value;
    if (title === "" || price === "" || thumbnail === "") {
        alert('Favor ingresar los campos requeridos');
    } else {
        let newProd = {
            title: document.getElementById('title').value,
            price: document.getElementById('price').value,
            thumbnail: document.getElementById('thumbnail').value
        };
        socket.emit('new-producto', newProd)
        
        document.getElementById('title').value = ""
        document.getElementById('price').value = ""
        document.getElementById('thumbnail').value = ""
    };
}


const fragment = document.createDocumentFragment();
const tabla = document.getElementById('tableProd');
const template = document.getElementById('templateList').content;

document.addEventListener('DOMContentLoaded', e => { fetchData() });

const fetchData = async () => {
    const res = await fetch('http://localhost:8080/api/productos');
    const data = await res.json();
    verProdHtml(data);
}

const verProdHtml = data => {
    data.forEach(producto => {

        template.getElementById('prodTitle').textContent = producto.title;
        template.getElementById('prodPrice').textContent = producto.price;
        template.getElementById('prodImg').setAttribute("src", producto.thumbnail);

        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    });
    tabla.appendChild(fragment)
};


socket.on('new-prod-server', async data => {
    let array = [] 
    array.push(await data)
    verProdHtml(array)
    
});