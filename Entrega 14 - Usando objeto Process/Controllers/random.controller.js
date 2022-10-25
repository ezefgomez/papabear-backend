import { fork } from 'child_process';
import { __dirname, __dirJoin } from '../utils/helper.util.js';

class randomClass {
    getRandom(req, res) {
        res.render('random');
    }

    getNumber(req, res) {
        let param = req.query.number;              
        const directory = __dirJoin(__dirname, '../public/js/');

        const child = fork(directory + 'randomGenerator.js');

        child.send({ 'number': parseInt(param) })
        child.on('message', data => res.send(data));  
    }
}

export default randomClass;