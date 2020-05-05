import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;
 
const Summary = new Schema({
    account_id: {
        type: Schema.Types.ObjectId
    },
    balance: {
        type: Schema.Types.Number
    },
    asOf: {
        type: Schema.Types.Date
    }
});

export default model('Summary', Summary);