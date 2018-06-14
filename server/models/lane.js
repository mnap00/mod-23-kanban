import mongoose from 'mongoose';
mongoose.plugin(schema => { schema.options.usePushEach = true }); // eslint-disable-line
const Schema = mongoose.Schema;

const laneSchema = new Schema({
  name: { type: 'String', required: true },
  notes: [{ type: Schema.ObjectId, ref: 'Note', required: true }],
  id: { type: 'String', required: true, unique: true },
});

function populateNotes(next) {
  this.populate('notes');
  next();
}

function removeNotes(next) {
  this.notes.forEach(note => {
    note.remove();
  });
  next();
}

laneSchema.pre('find', populateNotes);
laneSchema.pre('findOne', populateNotes);
laneSchema.pre('remove', removeNotes);

export default mongoose.model('Lane', laneSchema);
