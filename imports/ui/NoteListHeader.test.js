import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';

import {NoteListHeader} from "./NoteListHeader";
import {PrivateHeader} from "./PrivateHeader";

if(Meteor.isClient){
    describe('NoteListHeader',function () {
        it('should call meteorCall on click',function () {
            const spy = expect.createSpy();
            const wrapper = mount(<NoteListHeader meteorCall={spy}/>);

            wrapper.find('button').simulate('click');

            expect(spy).toHaveBeenCalledWith('notes.insert');
        });
    });
}