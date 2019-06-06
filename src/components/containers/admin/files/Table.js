import React, {Component} from "react";
import API from "../../../API/api";

import MaterialTable from "material-table";

class Table extends Component {
  state = {
    columns: [
      {title: "Título", field: "title"},
      {title: "Link", field: "description"}
    ],
    courses: [{id: "", description: "", title: "", link: "", topics: []}]
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
        parentChildData={(row, rows) => rows.find(topics => topics.id === row.parentId)}
        editable={{
          onRowAdd: newData => {
            this.setState({courses: [...this.state.courses.topics, newData]});
            return API.post("/courses/topics", newData)
              .then(res => {
                console.log(res);
              })
              .catch(err => {
                console.log(err);
              });
          },
          onRowUpdate: (newData, oldData) => {
            const data = this.state.courses;
            const index = data.indexOf(oldData);
            data[index] = newData;
            this.setState({courses: data});

            return API.put(`/courses/courses/${oldData.id}`, {
              title: newData.title,
              link: newData.description
            })
              .then(res => {
                console.log(res);
              })
              .catch(err => {
                console.log(err);
              });
          },
          onRowDelete: oldData => {
            const data = this.state.courses;
            const index = data.indexOf(oldData);
            data.splice(index, 1);
            this.setState({courses: data});
            return API.delete(`/courses/courses/${oldData.id}`)
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
