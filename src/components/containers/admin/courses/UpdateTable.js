import React, {useState, useEffect} from "react";
import API from "../../../API/api";

import MaterialTable from "material-table";

const handleAdd = event => {
  const formatedRoute = event.title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const course = {
    title: event.title,
    description: event.description,
    route: `/${formatedRoute}`
  };

  API.post("/courses", {
    course
  }).then(res => {
    console.log(res);
    console.log(res.data);
  });
};

const UpdateTable = props => {
  const [state, setState] = React.useState({
    columns: [
      {title: "Curso", field: "title"},
      {title: "Descripción", field: "description"}
    ]
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await API.get("/courses").then(result =>
        setData(result.data)
      );
    };
    fetchData();
  }, []);

  return (
    <MaterialTable
      title="Gestión de Cursos"
      columns={state.columns}
      data={data}
      editable={{
        onRowAdd: newData => {
          new Promise(resolve => {
            resolve();
            const data = [...data];
            data.push(newData);
            setState({...state, data});
            handleAdd(newData);
          });
        },
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...data];
              data[data.indexOf(oldData)] = newData;
              setState({...state, data});
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({...state, data});
            }, 600);
          })
      }}
    />
  );
};

export default UpdateTable;
