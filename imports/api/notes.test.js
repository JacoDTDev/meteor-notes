import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Notes } from './notes';

if (Meteor.isServer) {
  describe('notes', function () {
    //seed data
    //test data
    beforeEach(function () {
      Notes.remove({}); //this do not effect our normal data
      Notes.insert({
        _id: 'testNoteId1',
        title:'test title',
        body:'My body for note',
        updatedAt:0,
        userId:'testUserId'
      });
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
      Meteor.server.method_handlers['notes.remove'].apply({userId: 'testUserId'},['testNoteId1']);

      expect(Notes.findOne({_id:'testNoteId1'})).toNotExist();
    });
    
    it('should not remove note if unauthenticated',function () {
      expect(()=>{
        Meteor.server.method_handlers['notes.remove'].apply({},['testNoteId1']);
      }).toThrow();
    });

    it('should not remove note if invalid_id',function () {
      expect(()=>{
        Meteor.server.method_handlers['notes.remove'].apply({userId: 'testUserId'});
      }).toThrow();
    });
  });
}
