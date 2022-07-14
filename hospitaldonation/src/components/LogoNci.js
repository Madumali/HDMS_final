import nciNew from '../components/images/nciNew2.svg'; // gives image path

const LogoNci = () => {
    // <img
    //   alt="Logo"
    //   src="/images/nciNew2.png"
    //   {...props}
    // />
    return(
      <div>
           
           <img src={nciNew} alt="this is nci" style = {{maxHeight:60, maxWidth: 200, margin: "8px auto 0 auto", paddingBottom:0}}/>   
           
      </div>
  )
    };
  
  export default LogoNci;
  