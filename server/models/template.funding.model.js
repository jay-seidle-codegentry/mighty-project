import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;
 
const Funding = new Schema({
    envelope_id: {
        type: Schema.Types.ObjectId
    },
    amount: {
        type: Schema.Types.Number
    }
});

export default model('Funding', Funding);