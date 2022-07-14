import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core';

export function useForm(initialFValues, validateOnChange = false, validate) {


    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});
    // const [inputFields, setInputFields] = useState([initialFValuest])
    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        if (validateOnChange)
            validate({ [name]: value })
    }

    // const handleChangeInput = (id, event) => {
    //     const newInputFields = inputFields.map(i => {
    //       if(id === i.id) {
    //         i[event.target.name] = event.target.value
    //       }
    //       return i;
    //     })
        
    //     setInputFields(newInputFields);
    //     if (validateOnChange)
    //         validate({ [event.target.name] : event.target.value })
    //   }
    


    const resetForm = () => {
        setValues(initialFValues);
        // setValues([initialFValuest]);
        setErrors({})
    }



    return {
        values,
        setValues,
        // inputFields, setInputFields,
        errors,
        setErrors,
        handleInputChange,
        // handleChangeInput,
        resetForm

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

