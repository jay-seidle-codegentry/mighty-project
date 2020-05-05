import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;
 
const Tags = new Schema({
    tag: {
        type: Schema.Types.String
    }
});

export default model('Tags', Tags);