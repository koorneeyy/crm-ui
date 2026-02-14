import React, { useState, useCallback, useEffect } from "react";
import UAVDataService from "../services/uav.service";
import { withRouter } from '../common/with-router';

function UAV(props) {
  const [currentUAV, setCurrentUAV] = useState({
    id: null,
    title: "",
    description: "",
    published: false
  });
  const [message, setMessage] = useState("");

  const getUAV = useCallback((id) => {
    UAVDataService.get(id)
      .then(response => {
        setCurrentUAV(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    const id = props.router?.params?.id;
    if (id) getUAV(id);
  }, [props.router, getUAV]);

  const onChangeTitle = (e) => {
    const title = e.target.value;
    setCurrentUAV(prev => ({ ...prev, title }));
  };

  const onChangeDescription = (e) => {
    const description = e.target.value;
    setCurrentUAV(prev => ({ ...prev, description }));
  };

  const updatePublished = (status) => {
    const data = {
      id: currentUAV.id,
      title: currentUAV.title,
      description: currentUAV.description,
      published: status
    };

    UAVDataService.update(currentUAV.id, data)
      .then(response => {
        setCurrentUAV(prev => ({ ...prev, published: status }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateUAV = () => {
    UAVDataService.update(currentUAV.id, currentUAV)
      .then(response => {
        console.log(response.data);
        setMessage("The UAV was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteUAV = () => {
    UAVDataService.delete(currentUAV.id)
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
      {currentUAV && currentUAV.id ? (
        <div className="edit-form">
          <h4>Tutorial</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={currentUAV.title}
                onChange={onChangeTitle}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={currentUAV.description}
                onChange={onChangeDescription}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentUAV.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentUAV.published ? (
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
              Публікувати
            </button>
          )}

          <button
            className="badge badge-danger mr-2"
            onClick={deleteUAV}
          >
            Видалить
          </button>

          <button
            type="button"
            className="badge badge-success"
            onClick={updateUAV}
          >
            Змінити
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

export default withRouter(UAV);
