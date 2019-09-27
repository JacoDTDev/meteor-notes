import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Notes } from './notes';

if (Meteor.isServer) {
  describe('notes', function () {
    const noteOne = {
      _id: 'testNoteId1',
      title:'test title',
      body:'My body for note',
      updatedAt:0,
      userId:'testUserId'
    };
    //seed data
    //test data
    beforeEach(function () {
      Notes.remove({}); //this do not effect our normal data
      Notes.insert(noteOne);
    });
    //insert note test
    it('should insert new note', function () {
      const userId = 'testid';
      const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId });

      expect(Notes.findOne({ _id, userId })).toExist();
    });

    it('should not insert note if not authenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.insert']();
      }).toThrow();
    });
    //remove note test
    it('should remove note if authenticated', function () {
      Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId},[noteOne._id]);

      expect(Notes.findOne({_id:noteOne._id})).toNotExist();
    });
    
    it('should not remove note if unauthenticated',function () {
      expect(()=>{
        Meteor.server.method_handlers['notes.remove'].apply({},[noteOne._id]);
      }).toThrow();
    });

    it('should not remove note if invalid_id',function () {
      expect(()=>{
        Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId});
      }).toThrow();
    });
    it('should update note',function () {
      Meteor.server.method_handlers['notes.update'].apply()
    });
  });
}
