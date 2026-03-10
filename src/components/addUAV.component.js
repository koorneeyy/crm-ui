import { useState, useEffect } from 'react';
import { withRouter } from '../common/with-router';

import UAVDataService from "../services/uav.service";
import LocationDataService from "../services/location.service";

function AddUAV(props) {
  const [state, setState] = useState({
      id: null,
      title: "",
      description: "",
      published: false,
      locations: [],
      models: [],
      brands: [],
      selectedLocId: "",
    });
const [selectedLocation, setSelectedLocation] = useState('');
const [selectedBrand, setSelectedBrand] = useState('');
const [selectedModel, setSelectedModel] = useState('');
const handleLocationChange = (event) => {
  setSelectedLocation(event.target.value);
};
const handleBrandChange = (event) => { 
  console.log('!!!',event.target.value);
  console.log('state.brands ',state.brands);
  const index = state.brands.findIndex(item => item.id === +event.target.value);

  console.log('!!!',event.target.value, index);
  console.log(state.brands[index].models);
  setSelectedBrand(event.target.value);
  setState(prev => ({ ...prev, models: state.brands[index].models}));  
};
const handleModelChange = (event) => {
  setSelectedModel(event.target.value);
};

useEffect(() => {
    LocationDataService.getAll()
      .then(response => {
        console.log (response.data);
        setState(prev => ({ ...prev, locations: response.data}));  
      })
      .catch(e => {
        console.log(e);
      });
    UAVDataService.getAllBrands()
      .then(response => {
        console.log (response.data);
        setState(prev => ({ ...prev, brands : response.data}));  
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  
  const onChangeTitle = (e) => {
    const title = e.target.value;
    setState(prev => ({ ...prev, title }));
  }

  const onChangeDescription = (e) => {
    const description = e.target.value;
    setState(prev => ({ ...prev, description }));
    // console.log(this.state.locations);  !!!!!!
  }

  const saveUAV = () => {
    console.log("location: ", selectedLocation)
    var data = {
      title: state.title,
      description: state.description,
      location: {id: selectedLocation},
      model: {id: selectedModel}
    };

    UAVDataService.create(data)
      .then(response => {
        const id = response.data.id;
        const title = response.data.title;
        const description = response.data.description;
        const published = response.data.published;
        const submitted = true;
        setState(prev => ({...prev, id, title, description, published, submitted}))
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  const newUAV = () => {
    setState(prev => ({
      id: null,
      title: "",
      description: "",
      published: false,
      submitted: false
    }));
  }

  return (
    <div className="submit-form">
      {state.submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newUAV}>
            Add
          </button>
        </div>
      ) : (
        <div>

          <div>
            <label htmlFor="description">Виробник</label>
            <select
              value={selectedBrand}
              onChange={handleBrandChange}
              className='form-control'
            >
              {/* Add a default disabled option if needed */}
              <option value="" disabled>Виберіть виробника</option>
              {state.brands.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="description">Модель</label>
            <select
              value={selectedModel}
              onChange={handleModelChange}
              className='form-control'
            >
              {/* Add a default disabled option if needed */}
              <option value="" disabled>Виберіть модель</option>              
              {(state.models || []).map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="title">Номер</label>
            <input
              type="number"
              className="form-control"
              id="title"
              required
              value={state.title}
              onChange={onChangeTitle}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Коментар</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={state.description}
              onChange={onChangeDescription}
              name="description"
            />
          </div>
          
          <div>
            <label htmlFor="description">Локація</label>
            <select
              value={selectedLocation}
              onChange={handleLocationChange}
              className='form-control'
            >
              {/* Add a default disabled option if needed */}
              <option value="" disabled>Виберіть місцезнаходження</option>
              {state.locations.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>


          <div>
            <button onClick={saveUAV} className="btn btn-success form-control">
              Додати
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default withRouter(AddUAV);