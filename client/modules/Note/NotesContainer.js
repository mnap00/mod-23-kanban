import { connect } from 'react-redux';

import * as noteActions from './NoteActions';
import Notes from './Notes';

const mapDispatchToProps = {
  ...noteActions,
};

export default connect(
  null,
  mapDispatchToProps,
)(Notes);
