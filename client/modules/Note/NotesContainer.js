import { connect } from 'react-redux';

import {
  editNote,
  updateNoteRequest,
  deleteNoteRequest,
  moveWithinLane,
} from './NoteActions';
import Notes from './Notes';

const mapDispatchToProps = {
  onValueClick: editNote,
  onUpdate: updateNoteRequest,
  onDelete: deleteNoteRequest,
  moveWithinLane,
};

export default connect(
  null,
  mapDispatchToProps,
)(Notes);
