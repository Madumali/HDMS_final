import { green, red } from '@mui/material/colors';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Controls from '../../components/controls/Controls';

import { CurrentDonation } from './CurrentDonation';

const Print = ()=> {
    const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div>
  <Controls.Button type="submit" text="Print" onClick={handlePrint} color="error" style={{ marginTop:30}}/>
      <CurrentDonation ref={componentRef} />
    
      {/* <button >Print this out!</button> */}
    </div>
  );
}
export default Print;
