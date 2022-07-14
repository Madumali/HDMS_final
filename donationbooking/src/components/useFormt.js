import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core";

export function useFormt(initialFValues,initialFValuest, validateOnChange = false, validate) {


    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});
    const [inputFields, setInputFields] = useState([initialFValuest]);
    const [inputFieldsd, setInputFieldsd] = useState([]);

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        if (validateOnChange)
            validate({ [name]: value })
    }

     
    const handleChangeInput = (id, event) => {
        const newInputFields = inputFields.map(i => {
          if(id === i.id) {
            i[event.target.name] = event.target.value
          }
          return i;
          
        })
        
        setInputFields(newInputFields);
        if (validateOnChange)
        validate(newInputFields )
      }

      const handleChangeInputd = (id, event) => {
        const newInputFields = inputFieldsd.map(i => {
          if(id === i.id) {
            i[event.target.name] = event.target.value
          }
          return i;
          
        })
        
        setInputFieldsd(newInputFields);
        if (validateOnChange)
        validate(newInputFields )
      }
    


    const resetForm = () => {
        setInputFields([{}]);
        setValues(initialFValues);
        
        setErrors({});
       
    }
    const resetFormt = () => {
        // setInputFields([{}]);
       
        setErrors({});
       
    }


    return {
        values,
        setValues,
        inputFields, setInputFields,
        inputFieldsd, setInputFieldsd,
        errors,
        setErrors,
        handleInputChange,
        handleChangeInput,
        handleChangeInputd,
        resetForm,
        resetFormt

    }
}


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1)
        }
    }
}))

export function Form(props) {

    const classes = useStyles();
    const { children, ...other } = props;
    return (
        <form className={classes.root} autoComplete="off" {...other}>
            {props.children}
        </form>
    )
}

