import { connect } from 'react-redux';

import {
  editNote,
  updateNoteRequest,
  deleteNoteRequest,
  moveWithinLane,
} from './NoteActions';
import Notes from './Notes';

const mapDispatchToProps = {
  editNote,
  updateNote: updateNoteRequest,
  deleteNote: deleteNoteRequest,
  moveWithinLane,
};

export default connect(
  null,
  mapDispatchToProps,
)(Notes);
