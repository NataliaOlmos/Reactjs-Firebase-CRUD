import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { toast } from 'react-toastify'


const LinkForm = (props) => {

    const initialStateValues = {
        url: '',
        name: '',
        description: ''
    };

    const [values, setValues] = useState(initialStateValues);

    const handleInputChange = e => {
        const{name, value} = e.target;
        setValues({...values, [name]: value})
    }

    const validateURL = (str) => {
        let pattern = new RegExp(
            "^(https?:\\/\\/)?" + 
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + 
            "((\\d{1,3}\\.){3}\\d{1,3}))" + 
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
            "(\\?[;&a-z\\d%_.~+=-]*)?" + 
              "(\\#[-a-z\\d_]*)?$",
            "i"
          );
          return !!pattern.test(str);
    } 

    const handleSubmit = e => {
        e.preventDefault();
        if(!validateURL(values.url)){
            return toast('Invalid URL', {
                type: 'warning',
                autoClose: 2000,
            })
        }
        console.log(validateURL(values.url));
        props.addOrEditLink(values);
        setValues({...initialStateValues})
    }


    const getLinkById = async(id) => {
      const doc = await db.collection('links').doc(id).get();
      console.log(doc.data())
      setValues({...doc.data()})
    }

    useEffect(() => {
        console.log(props.currentId);
        if(props.currentId === "" ){
            setValues({...initialStateValues});
        }else{
            getLinkById(props.currentId);
            console.log(props.currentId);
        }
    }, [props.currentId])

    return (
        <form className="card card-body bg-primary" onSubmit={handleSubmit}>
            <div className="form-group input-group">
                <div className="input-group-text bg-dark">
                    <i className="material-icons">insert_link</i>
                </div>
                <input
                    type="text"
                    className="form-control"
                    placeholder="https://someurl.com"
                    name="url"
                    onChange={handleInputChange}
                    value={values.url} />
            </div>
            <div className="form-group input-group">
                <div className="input-group-text bg-dark">
                    <i className="material-icons">create</i>
                </div>
                <input type="text"
                    className="form-control"
                    name="name"
                    placeholder="Website name"
                    onChange={handleInputChange}
                    value={values.name} 
                    />
            </div>
            <div className="form-group">
                <textarea name="description"
                    rows="3"
                    className="form-control"
                    placeholder="Description"
                    onChange={handleInputChange}
                    value={values.description}
                />
            </div>
            <button className="btn btn-primary btn-dark">
                {props.currentId === "" ? "Save": "Update"}
            </button>
        </form>
    )
}

export default LinkForm;