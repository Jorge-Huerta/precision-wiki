import React, {Component} from "react";
import API from "../../../API/api";

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
            newData.route = `/${newData.title
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")}`;
            this.setState({courses: [...this.state.courses, newData]});

            return API.post("/courses", newData)
              .then(res => {
                console.log(res);
              })
              .catch(err => {
                console.log(err);
              });
          },
          onRowUpdate: (newData, oldData) => {
            const data = [...this.state.courses];
            const index = data.indexOf(oldData);
            data[index] = newData;
            this.setState({courses: data});

            return API.put(`/courses/${oldData.id}`, {
              title: newData.title,
              description: newData.description,
              route: `/${newData.title
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")}`
            })
              .then(res => {
                console.log(res);
              })
              .catch(err => {
                console.log(err);
              });
          },
          onRowDelete: oldData => {
            const data = [...this.state.courses];
            const index = data.indexOf(oldData);
            data.splice(index, 1);
            this.setState({courses: data});

            return API.delete(`/courses/${oldData.id}`)
              .then(res => {
                console.log(res);
              })
              .catch(err => {
                console.log(err);
              });
          }
        }}
        localization={{
          toolbar: {
            searchTooltip: "Buscar",
            searchPlaceholder: "Buscar..."
          },
          header: {
            actions: "Acciones"
          },
          body: {
            emptyDataSourceMessage: "No hay datos disponibles",
            filterRow: {
              filterTooltip: "Filtrar"
            }
          },
          pagination: {
            labelRowsSelect: "Filas",
            labelDisplayedRows: " {from}-{to} de {count}",
            firstTooltip: "Ir al inicio",
            previousTooltip: "Página anterior",
            nextTooltip: "Página siguiente",
            lastTooltip: "Ir al final"
          }
        }}
      />
    );
  }
}

export default Table;
