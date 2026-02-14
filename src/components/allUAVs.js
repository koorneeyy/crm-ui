import { useState, useEffect, withRouter } from "react";
import UAVDataService from "../services/uav.service";
import { Link } from "react-router-dom";

function UAVsList(props) {
  useEffect(() => {
    retrieveUAVs();
  }, []);


  const [state, setState] = useState({
      UAVs: [],
      currentUAV: null,
      currentIndex: -1,
      searchTitle: ""
  })

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value
    setState(prev => ({ ...prev, searchTitle }));
  }

  const retrieveUAVs = () => {
    UAVDataService.getAll()
      .then(response => {
        setState(prev => ({ ...prev, UAVs: response.data}));  
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  const refreshList = () => {
    retrieveUAVs();
    setState(prev => ({ ...prev, currentUAV: null, currentIndex: -1}));
  }

  const setActiveUAV = (UAV, index) => {
    setState(prev => ({ ...prev, currentUAV: UAV, currentIndex: index}));
  }

  const removeAllUAV = () => {
    UAVDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  const searchTitle = () => {
    setState(prev => ({ ...prev, currentUAV: null, currentIndex: -1}));
    UAVDataService.findByTitle(state.searchTitle)
      .then(response => {
      setState(prev => ({ ...prev, UAVs: response.data}));  
      console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={state.searchTitle}
              onChange={onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Список засобів</h4>

          <ul className="list-group">
            {state && state.UAVs &&
              state.UAVs.map((UAV, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === state.currentIndex ? "active" : "")
                  }
                  onClick={() => setActiveUAV(UAV, index)}
                  key={index}
                >
                  {UAV.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={removeAllUAV}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {state.currentUAV ? (
            <div>
              <h4>Засіб</h4>
              <div>
                <label>
                  <strong>Назва:</strong>
                </label>{" "}
                {state.currentUAV.title}
              </div>
              <div>
                <label>
                  <strong>Опис:</strong>
                </label>{" "}
                {state.currentUAV.description}
              </div>
              <div>
                <label>
                  <strong>Статус:</strong>
                </label>{" "}
                {state.currentUAV.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/all/" + state.currentUAV.id}
                className="badge badge-warning"
              >
                Змінити
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Клікніть на засіб...</p>
            </div>
          )}
        </div>
      </div>
    );
  //}
}

// export default withRouter(UAVsList);
 //export default withRouter(UAVsList);
export default UAVsList;