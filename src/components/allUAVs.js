import { useState, useEffect } from "react";
import UAVDataService from "../services/uav.service";
import { AllCommunityModule } from 'ag-grid-community';
import { AgGridProvider } from 'ag-grid-react';
import { AgGridReact } from 'ag-grid-react';


function UAVsList(props) {
  useEffect(() => {
    retrieveUAVs();
  }, []);

  const modules = [AllCommunityModule];
  const [state, setState] = useState({
      UAVs: [],
      currentUAV: null,
      currentIndex: null,
      searchTitle: ""
  })


const colDefs = [
    { field: "id" , headerName: "ID", width:70},
    { field: "title", headerName: "Номер", width:100},
    { field: "description", headerName: "Коментар", width:250},
    { field: "published", headerName: "Списаний", width:80},
    { field: "location.name", headerName  : "Розташування", width:150}
  ]
const gridOptions = {
    suppressCellSelection: true, 
    rowSelection: {
     mode: 'singleRow', // singleRow or 'multiRow'
      // suppressRowClickSelection: true,
      // 3. Enable selection when clicking the row itself
      // enableClickSelection: true,
    }
  }

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value
    setState(prev => ({ ...prev, searchTitle }));
  }

  const retrieveUAVs = () => {
    UAVDataService.getAll()
      .then(response => {
        setState(prev => ({ ...prev, UAVs: response.status === 204 ? [] : response.data}));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  const refreshList = () => {
    retrieveUAVs();
    setState(prev => ({ ...prev, currentUAV: null, currentIndex: null}));
  }

  const onSelectionChanged = (event) => {
    if (event.selectedNodes.length > 0  ) {
      setState(prev => ({ ...prev, currentIndex: event.selectedNodes[0].data.id}));  
    } else {
      setState(prev => ({ ...prev, currentIndex: null}));  
    }
  }

  const removeById = () => {
    UAVDataService.delete(state.currentIndex)
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  const searchTitle = () => {
    setState(prev => ({ ...prev, currentUAV: null, currentIndex: null}));
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
        </div>
        <div>
          <AgGridProvider modules={modules}>
            <div style={{ height: 400, width: 800 }}>
              <AgGridReact
                  rowData={state.UAVs}
                  columnDefs={colDefs}
                  gridOptions={gridOptions}
                  onSelectionChanged={onSelectionChanged}
              />
            </div>
          </AgGridProvider>
        </div>      
        {/* <button className="m-3 btn btn-sm btn-danger" onClick={removeAllUAV}>
          Видалити всі
        </button> */}
          <button disabled={!state.currentIndex} className="m-3 btn btn-sm btn-danger" onClick={removeById}>
          Видалити обраний
        </button>
      </div>      
    );

}
export default UAVsList;