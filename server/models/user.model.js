import { Schema as _Schema, model } from 'mongoose';
import tagSchema from './tag.model';
import envelopeSchema from './user.envelope.model';
import accountSchema from './user.account.model';
import templateSchema from './template.model';

const Schema = _Schema;
 
const User = new Schema({
    profile_id: {
        type: Schema.Types.ObjectId, // MD5 Hash of Auth0 user id
    },
    tags: [tagSchema],
    envelopes: [envelopeSchema],
    accounts: [accountSchema],
    templates: [templateSchema]
});

export default model('User', User);