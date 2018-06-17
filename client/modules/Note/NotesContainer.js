import { connect } from 'react-redux';

import { editNote, updateNoteRequest, deleteNoteRequest } from './NoteActions';
import Notes from './Notes';

const mapDispatchToProps = {
  updateNote: updateNoteRequest,
  deleteNote: deleteNoteRequest,
  editNote,
};

export default connect(
  null,
  mapDispatchToProps,
)(Notes);
