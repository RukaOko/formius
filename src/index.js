import React, { Component } from 'react';

import SettingsDefualt from './settings/Default';
import MainValidation from './validation/Index';
import FormContainer from './containers/FormContainer';


export default class Index extends Component {
  
    state = {
        configForm: {},
        prepareConfig: false,
        snapshot: ''
    }

    prepareConfigForm = ({ configForm }) => 
    {
        if(!configForm.settings)
        {
            configForm.settings = SettingsDefualt;
        }
        if(!configForm.styles)
        {
            configForm.styles = {};
        }
        if(!configForm.styles.containers)
        {
            configForm.styles.containers = {};
        }
        if(!configForm.styles.containers.allContainers)
        {
            configForm.styles.containers.allContainers = {};
        }
        if(!configForm.formErrors)
        {
            configForm.formErrors = {};
        }
        if(!configForm.formData)
        {
            configForm.formData = {};
        }
        if(!configForm.formContainer)
        {
            configForm.formContainer = {
                viewType: 'ScrollView'
            };
        }
        if(!configForm.formContainer.elements && !configForm.formContainer.containers)
        {
            configForm.formContainer.elements = Object.keys(configForm.elements);
        }

        return configForm;
    }
    
    storeForm = (name, value, error) => 
    {
        const { type } = this.state.configForm.elements[name];
        if(type === 'submit')
        {
            const { configForm } = this.state;
            this.submitAction(configForm);
        }
        else
        {
            this.state.configForm.formData[name] = value;
            if(error)
            {
                this.state.configForm.formErrors[name] = error;
            }
            else
            {
                delete this.state.configForm.formErrors[name];
            }

            if(this.state.configForm.elements[name].action)
            {
                this.catchAction(name);
            }
        }
        
    }
    
    submitAction = (configForm) => 
    {
        configForm.formErrors = MainValidation(configForm);
        const snapshot = JSON.stringify(configForm);

        this.setState({ configForm, snapshot });
        this.props.actionCaught(configForm, name);
    }

    catchAction = (name) => 
    {
        const { configForm } = this.state,
            { action } = configForm.elements[name];

        if(action === 'onChange')
        {
            this.state.snapshot = JSON.stringify(configForm);
            this.props.actionCaught(configForm, name);
        }    
        else if(action === 'onChangeValidate')
        {
            configForm.formErrors = MainValidation(configForm);
            this.state.snapshot = JSON.stringify(configForm);
            this.props.actionCaught(configForm, name);
        }
        else if(action === 'submit')
        {
            this.submitAction(configForm);
        }
    } 

    componentDidMount()
    {
        const configForm = this.prepareConfigForm(this.props),
            snapshot = JSON.stringify(configForm),
            prepareConfig = true;
            
        this.setState({ configForm, snapshot, prepareConfig });
    }

    
    static getDerivedStateFromProps(nextProps, prevState)
    {
        const snapshot = JSON.stringify(nextProps.configForm);

        if(prevState.prepareConfig && prevState.snapshot !== snapshot)
        {
            const { configForm } = nextProps;

            return { configForm, snapshot }
        }
        return null;
    }

    shouldComponentUpdate(nextProps, nextState)
    {
        if(this.state.snapshot === nextState.snapshot)
        {
            return false;
        }
        return true;
    }

    
    render() 
    {
        const { prepareConfig, configForm } = this.state;
        
        if(!prepareConfig)
        {
            return null;
        }
        else
        {
            return (
                <FormContainer 
                    containerName="formContainer"
                    containerStructure={configForm.formContainer}
                    configForm={configForm}
                    storeForm={this.storeForm}
                />
            );
        }
    }
}