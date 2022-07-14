import { green, red } from '@mui/material/colors';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Controls from '../../../components/controls/Controls';
import{ PermissionLetter } from './PermissionLetter';

const Print = ()=> {
    const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div>
  <Controls.Button type="submit" text="Print" onClick={handlePrint} color="error" style={{ marginTop:50}}/>
      <PermissionLetter ref={componentRef} />
    
    
    </div>
  );
}
export default Print;
