import React from 'react';
import PropTypes from 'prop-types';
import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {Notes} from '../api/notes';

import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

// export const NoteList = (props) => {
//   return (
//     <div className="item-list">
//       <NoteListHeader />
//       { props.notes.length > 0 ? undefined : <NoteListEmptyItem />}
//       { props.notes.map((note) => {
//         return (
//           <NoteListItem key={note._id} note={note} />
//         );
//       })}
//     </div>
//   );
// };


export class NoteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    }
  }

  renderNotes() {
    return this.props.notes
        .filter((note) => {
          if (note.title.indexOf(this.state.searchTerm) !== -1) {
            return note
          };
        })
        .map((note) => {
          return (
              <NoteListItem key={note._id} note={note} />
          );
        });

  }

  handleSearchTermChange(e) {
    let searchTerm = e.target.value;
    this.setState({searchTerm});
  }

  clearSearch() {
    this.setState({searchTerm: ''});
  }

  render () {
    return (
        <div className="item-list">
          <NoteListHeader />
          <div className="item-list__search">
            <input
                type='search'
                placeholder="Search for a note"
                onChange={this.handleSearchTermChange.bind(this)} value={this.state.searchTerm} />
            <button
                onClick={this.clearSearch.bind(this)}
                className="button button--secondary">
              Clear
            </button>
          </div>
          { this.props.notes.length > 0 ? undefined : <NoteListEmptyItem />}
          { this.renderNotes() }
        </div>
    )
  }
}

NoteList.propTypes = {
  notes: PropTypes.array.isRequired
}

export default createContainer(()=> {
  const selectedNoteId = Session.get('selectedNoteId');
  Meteor.subscribe('notes');
  return {
    notes: Notes.find({}, {sort: {updatedAt: -1}}).fetch().map((note) => {
      return {
        ...note,
        selected: note._id === selectedNoteId
      }
    })
  }
}, NoteList)