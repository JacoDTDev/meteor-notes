import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema'

export const Notes = new Mongo.Collection('notes');

Meteor.methods({
  'notes.insert'() {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Notes.insert({
      title: '',
      body: '',
      userId: this.userId,
      updatedAt: moment().valueOf()
    });
  },
  'notes.remove'(_id){
    //check for userId,else throw Error
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    //SimpleSchme to validate _id string with length greater than 1
    new SimpleSchema({
     _id:{
        type: String,
        min: 1
     }
    }).validate({_id});
    //Notes.remove to remove the notes
    Notes.remove({_id, userId:this.userId});

  }
});
