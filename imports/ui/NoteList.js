import React from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import {Notes} from '../api/notes';
import NoteListHeader from "./NoteListHeader";
import NoteListItem from "./NoteListItem";

export const NoteList = (props) => {
  return(
   <div>
       <NoteListHeader/>
       {/*
       Use map method to cover notes array into jsx array
       Set up key prop equal to _id
       Setup notes prop
       */}
       {props.notes.map((note)=>{
           return <NoteListItem key={note._id} note={note}/>
       })}
       NoteList {props.notes.length}
   </div>
  );
};

NoteList.propTypes ={
    notes: React.PropTypes.array.isRequired
};
export default createContainer(()=>{
    Meteor.subscribe('notes'); //what to get the notes created by this user

    return{
        notes: Notes.find().fetch()
    };
},NoteList);
//fetch the information from the database