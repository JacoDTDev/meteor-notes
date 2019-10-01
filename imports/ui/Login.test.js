import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';

import {Login} from './Login';

if (Meteor.isClient){
    describe('Login',function () {

        it('should show error messages',function () {
            const error ='This is not working';
            const wrapper = mount(<Login loginWithPassword={()=>{}}/>);

            wrapper.setState( { error } );
            //Select wrapper p tags. Get text value. Expect it to equal "error" variable above.
            expect(wrapper.find('p').text()).toBe(error);

            wrapper.setState({error:''});
            expect(wrapper.find('p').length).toBe(0);
        });

    });
}