import { useState } from 'react';
import { withRouter } from '../common/with-router';

import TutorialDataService from "../services/tutorial.service";
import LocationDataService from "../services/location.service";

function AddTutorial(props) {
  const [state, setState] = useState({
      id: null,
      title: "",
      description: "",
      published: false
    });

  
  const onChangeTitle = (e) => {
    const title = e.target.value;
    setState(prev => ({ ...prev, title }));
  }

  const onChangeDescription = (e) => {
    const description = e.target.value;
    setState(prev => ({ ...prev, description }));
    // console.log(this.state.locations);  !!!!!!
  }

  const saveTutorial = () => {
    var data = {
      title: state.title,
      description: state.description
    };

    TutorialDataService.create(data)
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

  const newTutorial = () => {
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
          <button className="btn btn-success" onClick={newTutorial}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
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
          
          <button onClick={saveTutorial} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default withRouter(AddTutorial);