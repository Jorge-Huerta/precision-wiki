import React, {Component} from "react";
import API from "../../../API/api";
import MaterialTable from "material-table";

class Management extends Component {
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
      title="Inscripción de Cursos"
      columns={this.state.columns}
      data={this.state.courses}
        actions={[
          {
            icon: "library_add",
            tooltip: "Inscribir Curso",
          }
        ]}
      />
    );
  }
}

export default Management;
