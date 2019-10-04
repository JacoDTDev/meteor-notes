import React from 'react';

import PrivateHeader from './PrivateHeader';
import NoteList from "./NoteList";
import Editor from "./Editer";

export default () => {
  return (
    <div>
      <PrivateHeader title="Dashboard"/>
      <div className="page-content">
          <NoteList/>
          <Editor/>
      </div>
    </div>
  );
};
