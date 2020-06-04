import React from 'react';

import Input from './Input';
import Select from './Select';
import Checkbox from './Checkbox';
import Submit from './Submit';
import Img from './Img'; 


const SwitchElements = ({ dataElem, storeForm }) => 
{
    const { name } = dataElem,
        { type } = dataElem.element;

    switch (type) 
    {
        case 'input':
            return <Input key={name} dataElem={dataElem} storeForm={storeForm} />;
        case 'picker':
            return <Select key={name} dataElem={dataElem} storeForm={storeForm} />;
        case 'switch':
            return <Checkbox key={name} dataElem={dataElem} storeForm={storeForm} />;
        case 'submit':
            return <Submit key={name} dataElem={dataElem} storeForm={storeForm} />;
        case 'imagePicker':
            return <Img key={name} dataElem={dataElem} storeForm={storeForm} />;
        default: 
            return null;
    }
};
export default SwitchElements;