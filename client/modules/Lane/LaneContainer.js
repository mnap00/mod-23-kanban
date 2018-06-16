import { connect } from 'react-redux';

import * as laneActions from './LaneActions';
import { createNote } from '../Note/NoteActions';
import Lane from './Lane';

const mapStateToProps = (state, ownProps) => ({
  laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId]),
});

const mapDispatchToProps = {
  ...laneActions,
  addNote: createNote,
  createLane: laneActions.createLaneRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Lane);
