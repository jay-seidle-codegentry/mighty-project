import { Schema as _Schema, model } from 'mongoose';
import tagSchema from './tag.model';
import fundingSchema from './template.funding.model';

const Schema = _Schema;
const ObjectId = Schema.ObjectId;
 
const Template = new Schema({
    account_id: ObjectId,
    name: {
        type: Schema.Types.String
    },
    tags: [tagSchema],
    summary: {
        total: {                                // equals total allocation for a template
            type: Schema.Types.Number
        }
    },
    fundings: [fundingSchema]
});

export default model('Template', Template);