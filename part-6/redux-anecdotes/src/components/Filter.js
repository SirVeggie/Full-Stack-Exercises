import React from 'react';
import { connect } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

//====| Presentation |====//

function Filter({ filter, onType }) {
	return (
    <div>
      Filter <input value={filter} onChange={onType} />
    </div>	
	);
}

//====| Logic |====//

function mapState(state) {
  return { filter: state.filter };
}

function mapDispatch(dispatch) {
  return { onType: event => dispatch(setFilter(event.target.value)) };
}

const ConnectedFilter = connect(mapState, mapDispatch)(Filter);

export default ConnectedFilter;