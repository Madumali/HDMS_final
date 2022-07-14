import hdmsLogo5 from '../components/images/hdms logo5.png'; // gives image path

const Logo = () => {
    // <img
    //   alt="Logo"
    //   src="/images/nciNew2.png"
    //   {...props}
    // />
    return(
      <div>
           
           
           <img src={hdmsLogo5} alt="this is car image" style = {{height:70, width: 200, margin: "8px auto", paddingBottom:0}}/>
           
      </div>
  )
    };
  
  export default Logo;
  