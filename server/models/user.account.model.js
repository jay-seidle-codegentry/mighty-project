import { Schema as _Schema, model } from 'mongoose';
import tagSchema from './tag.model';

const Schema = _Schema;
const ObjectId = Schema.ObjectId;
 
const Account = new Schema({
    account_id: ObjectId,
    name: {
        type: Schema.Types.String
    },
    type: {
        type: Schema.Types.String
    },
    tags: [tagSchema],
    map: {                              // comma delimited order of inputs: date,,description,type,,amount
        type: Schema.Types.String
    },
    summary: {
        balance: {
            type: Schema.Types.Number
        },
        asOf: {
            type: Schema.Types.Date
        }
    }
});

export default model('Account', Account);