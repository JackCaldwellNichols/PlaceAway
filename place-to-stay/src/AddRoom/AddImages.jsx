import { Paper } from '@mui/material'
import React, { useCallback, useState } from 'react'
import {useDropzone} from 'react-dropzone'
import ImagesList from './ImagesList'
import ProgressList from './ProgressList'

const AddImages = () => {
    const [files, setFiles] = useState([])

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles)
        console.log(acceptedFiles)
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {'image/*' : []}
    })
        



  return (
    <>
      <Paper sx={{cursor: 'pointer', background: '#fafafa', color: '#bdbdbd', border: '1px dashed #ccc', '&:hover' : {border: '1px solid #ccc'}}}>
        <div style={{padding: '16px'}} {...getRootProps()}>
            <input {...getInputProps()}/>
            {isDragActive ? (
                <p style={{color: 'green'}}>Drop the files here</p>
            ) : (
                <p>Drop your files here, or click to upload </p>
            )}
            <em>(Images with *.png, *.jpg or *.jpeg are accepted.)</em>
        </div>
    </Paper>
    <ProgressList {...{files}}/>
    <ImagesList />
    </>
  )
}

export default AddImages