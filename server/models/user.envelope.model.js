import { Schema as _Schema, model } from 'mongoose';
import tagSchema from './tag.model';
import summarySchema from './user.envelope.summary.model';

const Schema = _Schema;
const ObjectId = Schema.ObjectId;
 
const Envelope = new Schema({
    envelope_id: ObjectId,
    name: {
        type: Schema.Types.String
    },
    tags: [tagSchema],
    summary: [summarySchema] // represents the amounts from each account in this envelope; the total is the amount in the envelope
});

export default model('Envelope', Envelope);