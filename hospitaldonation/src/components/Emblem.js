import emblem from '../components/images/emblem.png'; // gives image path

const Emblem = () => {
    // <img
    //   alt="Logo"
    //   src="/images/nciNew2.png"
    //   {...props}
    // />
    return(
      <div>
           
           <img src={emblem} alt="this is emblem" style = {{height:70, width: 65, margin: "8px auto 0 auto", paddingBottom:0}}/>   
           
      </div>
  )
    };
  
  export default Emblem;