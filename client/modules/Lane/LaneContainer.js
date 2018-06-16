import { connect } from 'react-redux';

import {
  deleteLane,
  updateLane,
  editLane,
  createLaneRequest,
} from './LaneActions';
import { createNoteRequest } from '../Note/NoteActions';
import Lane from './Lane';

const mapStateToProps = (state, ownProps) => ({
  laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId]),
});

const mapDispatchToProps = {
  editLane,
  deleteLane,
  updateLane,
  addNote: createNoteRequest,
  createLane: createLaneRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Lane);
