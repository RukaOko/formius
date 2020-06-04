const AllElements = {
    container: {
        marginTop: 5,
        padding: 5
    },
    title: {
        text: {
            fontSize: 16,
            fontWeight: '900'
        }
    },
    description: {
        view: {
            marginTop: 5
        },
        text: {
            fontSize: 14
        }
    },
    error: {
        text: {
            color: 'red',
            fontSize: 14,
            paddingLeft: 7
        }
    },
    hint: {
        text: {
            fontSize: 14,
            color: 'grey'
        }
    }, 
    submit: {
        touchableOpacity: {
            borderRadius: 5,
            backgroundColor: '#0072FF',
            marginVertical: 40,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            height: 40,
            paddingHorizontal: 20
        },
        buttonTitle: {
            fontSize: 20,
            fontWeight: '900',
            color: 'white'
        }
    },
    input: {
        marginTop: 5,
        padding: 5,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: 'grey'
    },
    picker: {},
    switch: {},
    imagePicker: {
        img: {
            width: 300,
            height: 300,
            borderRadius: 150,
            alignSelf: 'center'
        },
        touchableOpacity: {
            borderRadius: 5,
            backgroundColor: 'grey',
            alignSelf: 'center',
            paddingHorizontal: 15,
            paddingVertical: 5,
            marginRight: 50,
            marginVertical: 5
        },
        buttonTitle: {
            fontSize: 18,
            color: 'white'
        }
    },
};
export default AllElements;