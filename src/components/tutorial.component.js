import React, { useState, useCallback, useEffect } from "react";
import TutorialDataService from "../services/tutorial.service";
import { withRouter } from '../common/with-router';

function Tutorial(props) {
  const [currentTutorial, setCurrentTutorial] = useState({
    id: null,
    title: "",
    description: "",
    published: false
  });
  const [message, setMessage] = useState("");

  const getTutorial = useCallback((id) => {
    TutorialDataService.get(id)
      .then(response => {
        setCurrentTutorial(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    const id = props.router?.params?.id;
    if (id) getTutorial(id);
  }, [props.router, getTutorial]);

  const onChangeTitle = (e) => {
    const title = e.target.value;
    setCurrentTutorial(prev => ({ ...prev, title }));
  };

  const onChangeDescription = (e) => {
    const description = e.target.value;
    setCurrentTutorial(prev => ({ ...prev, description }));
  };

  const updatePublished = (status) => {
    const data = {
      id: currentTutorial.id,
      title: currentTutorial.title,
      description: currentTutorial.description,
      published: status
    };

    TutorialDataService.update(currentTutorial.id, data)
      .then(response => {
        setCurrentTutorial(prev => ({ ...prev, published: status }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateTutorial = () => {
    TutorialDataService.update(currentTutorial.id, currentTutorial)
      .then(response => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTutorial = () => {
    TutorialDataService.delete(currentTutorial.id)
      .then(response => {
        console.log(response.data);
        props.router.navigate('/all');
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTutorial && currentTutorial.id ? (
        <div className="edit-form">
          <h4>Tutorial</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={currentTutorial.title}
                onChange={onChangeTitle}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={currentTutorial.description}
                onChange={onChangeDescription}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTutorial.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentTutorial.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button
            className="badge badge-danger mr-2"
            onClick={deleteTutorial}
          >
            Delete
          </button>

          <button
            type="button"
            className="badge badge-success"
            onClick={updateTutorial}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
}

export default withRouter(Tutorial);
