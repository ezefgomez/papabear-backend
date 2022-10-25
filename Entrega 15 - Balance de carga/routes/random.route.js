import { Router } from 'express'
import { fork } from 'child_process'


const generateRandoms = (req, res) => {
    const forked = fork('randomManager.js')
    const cant = req.query.cant || 1e8
    forked.on('message', msg => {
        if(msg.numbers){
            res.json(msg.numbers)
        } else {
            forked.send({cant: cant})
        }
    })
}

const router = Router()

router.get('/randoms', generateRandoms)

export default router