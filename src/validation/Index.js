import ElemValidation from './ElemValidation';

const Index = (configForm) => 
{
    const { formData, elements } = configForm,
        formErrors = {};

    for(name in elements)
    {
        const oneElem = elements[name];

        if(oneElem.validation)
        {
            const value = formData[name] ? formData[name] : '',
                error = ElemValidation(value, oneElem.validation);
            
            if(error)
            {
                formErrors[name] = error;
            }
        }
    }
    return formErrors;
};

export default Index;