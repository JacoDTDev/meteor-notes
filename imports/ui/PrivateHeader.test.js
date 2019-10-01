import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';

import {PrivateHeader} from "./PrivateHeader";

if(Meteor.isClient){
    describe('PrivateHeader', function () {
       it('should set button text to logout', function () {
           const wrapper = mount(<PrivateHeader title ='Test title' handleLogout={()=>{}}/>);
           const buttonText = wrapper.find('button').text();

           expect(buttonText).toBe('Logout');
       });

       it('should use title prop as h1 text',function () {
           const title = 'Test title here';
           //use mount to render Privateheader with title
           const wrapper = mount(<PrivateHeader title ={title} handleLogout={()=>{}}/>);
           //Use find to find h1 -> get its text value. store in variable
           const actualTitle = wrapper.find('h1').text();
           //Expect h1 text value to equal the variable
           expect(actualTitle).toBe(title);
       });
       // //using spies to test action-listeners
       //  it('should call the function',function () {
       //     const spy = expect.createSpy();
       //
       //     spy(3,5,123);
       //     spy('Jaco');
       //     //debugger;// will pause the chrome dev tools
       //     expect(spy).toHaveBeenCalledWith(3,5,123);
       //   //  expect(spy).toHaveNotBeenCalled();
       //     expect(spy).toHaveBeenCalled();
       //  });

        it('should call handleLogout on click', function () {
            const spy = expect.createSpy();
            const wrapper = mount(<PrivateHeader title ="Title" handleLogout={spy}/>);

            wrapper.find('button').simulate('click');

            expect(spy).toHaveBeenCalled();
        });
    });
}
