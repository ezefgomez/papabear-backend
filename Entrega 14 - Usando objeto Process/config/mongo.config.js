import mongoose from 'mongoose';

export default class mongoConnect {
    constructor() {
        this.connection = this.createConnection();
    }

    createConnection() {
        const uri = 'mongodb://localhost:27017/coder';
        // const uri =
        //     'mongodb+srv://<username>:<password>@cluster0.x8dxdrh.mongodb.net/test/test?retryWrites=true&w=majority';
        const options = { useNewUrlParser: true, useUnifiedTopology: true };

        mongoose.connect(uri, options).then((err) => {
            err;
        });
    }
}