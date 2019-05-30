import React, {useCallback} from "react";
import {useDropzone} from "react-dropzone";
import API from "../../API/api";

const Zone = () => {
  async function createUser(body) {
    const response = await API.post("/files", {
      body: JSON.stringify(body)
    });
  }

  const maxSize = 10485760;

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
  }, []);

  const {
    isDragActive,
    getRootProps,
    getInputProps,
    isDragReject,
    acceptedFiles,
    rejectedFiles
  } = useDropzone({
    onDrop,
    accept: "image/png, application/pdf, application/vnd.ms-powerpoint",
    minSize: 0,
    maxSize
  });

  const isFileTooLarge =
    rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;

  return (
    <div className="container text-center mt-5">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {!isDragActive && "Clickea o arrastra para añadir archivos!"}
        {isDragActive && !isDragReject && "Arrastra archivos!"}
        {isDragReject && "Tipo de archivo inválido :c"}
        {isFileTooLarge && (
          <div className="text-danger mt-2">Archivo muy grande</div>
        )}
        <ul className="list-group mt-2">
          {acceptedFiles.length > 0 &&
            acceptedFiles.map(acceptedFile => (
              <li className="list-group-item list-group-item-success">
                {acceptedFile.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Zone;
