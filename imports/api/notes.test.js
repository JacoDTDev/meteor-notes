import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Notes } from './notes';

if (Meteor.isServer) {
  describe('notes', function () {
      //seed data
      //test data
    const noteOne = {
      _id: 'testNoteId1',
      title:'test title',
      body:'My body for note',
      updatedAt:0,
      userId:'testUserId'
    };
    const noteTwo = {
        _id: 'testNoteId2',
        title:'Things to buy',
        body:'Couch',
        updatedAt:0,
        userId:'testUserId2'
    };

    beforeEach(function () {
      Notes.remove({}); //this do not effect our normal data
      Notes.insert(noteOne);
      Notes.insert(noteTwo);
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

    it('should not remove note if invalid _id',function () {
      expect(()=>{
        Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId});
      }).toThrow();
    });
    //success update test
    it('should update note',function () {
        const title ='This is an updated title'; //change the title to the new one

        Meteor.server.method_handlers['notes.update'].apply({
            userId:noteOne.userId
        },[
            noteOne._id,
            {title}
        ]);

        const note = Notes.findOne(noteOne._id); //finding the changed note and se it equal to an const

        expect(note.updatedAt).toBeGreaterThan(0); //check that the new timestamp is showing
        expect(note).toInclude({
            title: title, // new way of showing this is just to have title by it self
            body: noteOne.body//to check that the body did not change.
        });
    });

    //error if extra updates
    it('should throw error if extra updates provided', function () {
        expect(()=>{
            Meteor.server.method_handlers['notes.update'].apply({
                userId:noteOne.userId
            },[
                noteOne._id,
                {title:'new title', yourName:'Jaco'} //yourname is the extra data
            ]);
        }).toThrow();
    });
    //fail if unauthorised user
    it('should not update if user was not creator',function () {
        const title ='This is an updated title'; //change the title to the new one

        Meteor.server.method_handlers['notes.update'].apply({
            userId:'testid'
        },[
            noteOne._id,
            {title}
        ]);

        const note = Notes.findOne(noteOne._id); //finding the changed note and se it equal to an const

        expect(note).toInclude(noteOne);
    });

      it('should not update note if unauthenticated',function () {
          expect(()=>{
              Meteor.server.method_handlers['notes.update'].apply({},[noteOne._id]);
          }).toThrow();
      });

      it('should not update note if invalid _id',function () {
          expect(()=>{
              Meteor.server.method_handlers['notes.update'].apply({userId: noteOne.userId});
          }).toThrow();
      });
      //test publication
      it('should return a users notes',function () {
          const res = Meteor.server.publish_handlers.notes.apply({userId: noteOne.userId});
          const notes = res.fetch();

          expect(notes.length).toBe(1);
          expect(notes[0]).toEqual(noteOne);
      });
      //test if the user has no note must get no notes.
      it('should return zero notes for user that has none',function () {
          const res = Meteor.server.publish_handlers.notes.apply({userId: 'testid'});
          const notes = res.fetch();

          expect(notes.length).toBe(0);
      });
  });
}
