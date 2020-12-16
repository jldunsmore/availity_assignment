import React from 'react';
import { Tabs, useTabState, Panel } from '@bumaga/tabs';

import './App.css';
import './Tabs.css';
import LISPChecker from './panels/lisp_checker/LISPChecker';
import Registration from './panels/registration/Registration';
import EnrollmentFiles from './panels/enrollment_files/EnrollmentFiles';

const cn = (...args) => args.filter(Boolean).join(' ')

const Tab = ({ children }) => {
  const { isActive, onClick } = useTabState()

  return (
    <button className={cn('tab', isActive && 'active')} onClick={onClick}>
      {children}
    </button>
  )
}

// const Panel = ({ children }) => {
//   const isActive = usePanelState();
  
//   return isActive ? <p>{children}</p> : null;
// }

function App() {
  return (
    <Tabs>
      <div className='tabs'>        
        <div className='tab-list'>          
        <Tab>LISP Checker</Tab>
          <Tab>Registration</Tab>
          <Tab>Enrollment Files</Tab>
        </div>

        <div className='tab-progress'>          
          <Panel><LISPChecker /></Panel>
          <Panel><Registration /></Panel>
          <Panel><EnrollmentFiles /></Panel>
        </div>
      </div>
    </Tabs>
  );
}

export default App;
