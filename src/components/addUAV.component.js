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
      selectedLocId: "",
    });
const [selectedLocation, setSelectedLocation] = useState('');
const handleChange = (event) => {
    setSelectedLocation(event.target.value);
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
            <label htmlFor="description">Description</label>
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
            <select value={selectedLocation} onChange={handleChange}>
              {/* Add a default disabled option if needed */}
              {/* <option value="" disabled>Виберіть місцезнаходження</option> */}
              {state.locations.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div></div>
          <button onClick={saveUAV} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default withRouter(AddUAV);