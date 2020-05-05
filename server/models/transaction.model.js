import { Schema as _Schema, model } from 'mongoose';
import tagSchema from './tag.model';

const Schema = _Schema;
 
const Transaction = new Schema({
    user_id: {
        type: Schema.Types.ObjectId
    },
    date: {
        type: Schema.Types.Date
    },
    amount: {
        type: Schema.Types.Number
    },
    type: {                         // credit, debit ??
        type: Schema.Types.String
    },
    description: {
        type: Schema.Types.String
    },
    bundledTransactions: [Schema.ObjectId],
    tags: [tagSchema],
    account_id: {
        type: Schema.Types.ObjectId
    },
    envelope_id: {
        type: Schema.Types.ObjectId
    }
});

export default model('Transaction', Transaction);