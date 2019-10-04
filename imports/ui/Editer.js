import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';

import {Notes} from "../api/notes";

export class Editor extends React.Component{
    render(){
        //We get a note
        //We get an id, but it`s not a match
        //WE get nothing
        if(this.props.note){
            return(
                <p>We got the note!</p>
            );
        }else{
            return(
                <p>
                    {this.props.selectedNoteId?'Note not found.':'Pick or create a note to get started'}
                </p>
            );
        }
    }
}

Editor.propTypes ={
    notes: React.PropTypes.object,
    selectedNoteId: React.PropTypes.string
};

export default createContainer(()=>{
    const selectedNoteId = Session.get('selectedNoteId');

    return{
        selectedNoteId,
        note: Notes.findOne(selectedNoteId)
    };
}, Editor);