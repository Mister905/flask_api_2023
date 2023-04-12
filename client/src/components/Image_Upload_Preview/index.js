import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #000",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

function Image_Upload_Preview(props) {
  
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    onDrop: (acceptedFiles) => {
      acceptedFiles.map((file, index) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          acceptedFiles[index].base64 = event.target.result;
        };
        reader.onerror = (error) => {
          console.log(error);
        };
        reader.readAsDataURL(file);
      });

      props.setFieldValue("images", [...props.images, ...acceptedFiles]);

      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const removeFile = (file) => () => {
    const updatedFiles = [...files];
    updatedFiles.splice(updatedFiles.indexOf(file), 1);
    setFiles(updatedFiles);
  };

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <button style={{position: "absolute", color: "black"}} onClick={removeFile(file)}>X</button>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section className="container">
      <div
        {...getRootProps()}
        style={{ border: "1px solid #000", padding: "1rem" }}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  );
}

export default Image_Upload_Preview;
