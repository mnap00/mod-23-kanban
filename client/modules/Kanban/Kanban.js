import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// Import actions
import { createLane } from '../Lane/LaneActions';

// Import components
import Lanes from '../Lane/Lanes';

// Import Style
import styles from './Kanban.css';

const Kanban = (props) => (
  <div>
    <button
      className={styles.AddLane}
      onClick={() => props.createLane({
        name: 'New lane',
      })}
    >
      Add Lane
    </button>
    <Lanes lanes={props.lanes} />
  </div>
);

//Kanban.need = [() => { return fetchLanes(); }];

const mapStateToProps = (state) => ({
  lanes: state.lanes,
});

const mapDispatchToProps = {
  createLane,
};

Kanban.propTypes = {
  lanes: PropTypes.array,
  createLane: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Kanban);
