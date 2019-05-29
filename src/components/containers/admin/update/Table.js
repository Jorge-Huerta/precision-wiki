import React, {Component} from "react";
import API from "../../../API/api";
import shortid from "shortid";

import MaterialTable from "material-table";

class Table extends Component {
  state = {
    columns: [
      {title: "Curso", field: "title"},
      {title: "Descripción", field: "description"}
    ],
    courses: [{id: "", title: "", description: "", route: ""}]
  };

  componentDidMount() {
    API.get("/courses").then(response => {
      this.setState({courses: response.data});
    });
  }

  render() {
    return (
      <MaterialTable
        title="Gestión de Cursos"
        columns={this.state.columns}
        data={this.state.courses}
        editable={{
          onRowAdd: newData => {
            newData = {
              id: shortid.generate(),
              title: newData.title,
              description: newData.description,
              route: `/${newData.title
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")}`
            };
            this.setState({courses: [...this.state.courses, newData]});
            return API.post("/courses", newData)
              .then(res => {
                return console.log(res);
              })
              .catch(err => {
                return console.log(err);
              });
            console.log(this.state.courses);
          },
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              return API.put(`/courses/${oldData.id}`, {
                id: newData.id,
                title: newData.title,
                description: newData.description,
                route: newData.route
              })
                .then(res => {
                  console.log(res);
                })
                .catch(err => {
                  console.log(err);
                });
              const data = this.state;
              const index = data.indexOf(oldData);
              data.courses[index] = newData;
              this.setState({courses: newData});
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              return API.delete(`/courses/${oldData.id}`)
                .then(res => {
                  console.log(res);
                })
                .catch(err => {
                  console.log(err);
                });
              const data = [this.state.courses];
              const index = data.indexOf(oldData);
              data.splice(index, 1);
              this.setState({courses: data});
            })
        }}
      />
    );
  }
}

export default Table;
