import axios from 'axios';
import logger from "../utils/logger";

axios.get('http://localhost:8080/api/productos/')
    .then(response => logger.logInfo(`Status de la respuesta: ${response.status}, contenido: \n${JSON.stringify(response.data)}`))
    .catch(error => logger.logError(error));

axios.get('http://localhost:8080/api/productos/6366e653ac78b8773584ce24')
    .then(response => logger.logInfo(`Status de la respuesta: ${response.status}, contenido: \n${JSON.stringify(response.data)}`))
    .catch(error => logger.logError(error));

axios.put('http://localhost:8080/api/productos/6366e653ac78b8773584ce24',
    {
        title: "Limon con semillas",
        price: "300",
        thumbnail: "https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_limao-512.png"
    })
    .then(response => logger.logInfo(`Status de la respuesta: ${response.status}, contenido: \n${JSON.stringify(response.data)}`))
    .catch(error => logger.logError(error));


axios.delete(`http://localhost:8080/api/productos/6366e653ac78b8773584ce24`)
    .then(response => logger.logInfo(`Status de la respuesta: ${response.status}, contenido: \n${JSON.stringify(response.data)}`))
    .catch(error => logger.logError(error));

axios.post('http://localhost:8080/api/productos/add', {
    title: "Limon cuadradas",
    price: "200",
    thumbnail: "https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_limao-512.png"
})
    .then(response => logger.logInfo(`Status de la respuesta: ${response.status}, contenido: \n${JSON.stringify(response.data)}`))
    .catch(error => logger.logError(error));

axios.delete('http://localhost:8080/api/productos')
    .then(response => logger.logInfo(`Status de la respuesta: ${response.status}, contenido: \n${JSON.stringify(response.data)}`))
    .catch(error => logger.logError(error));