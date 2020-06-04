import Regx from './Regx';

const ElemValidation = (value, validation) => 
{
    if(validation.required && value === '')
    {
        return validation.required;
    }
    else if(validation.reg)
    {
        const regLength = validation.reg.length;
        for(let i = 0; i < regLength; i++)
        {
            let error = Regx(value, validation.reg[i]);
            if(error)
            {
                return error;
            }
        }
        return false;
    }
    else
    {
        return false;
    }
};

export default ElemValidation;