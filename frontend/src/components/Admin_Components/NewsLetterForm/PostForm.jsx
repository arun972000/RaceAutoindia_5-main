/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useMemo, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios';
import { FaFileImage } from "react-icons/fa";

const NewsLetterPost = () => {
    const [isFileSelected, setIsFileSelected] = useState(false);
    const [title, setTitle] = useState('');
    const [keywords, setKeywords] = useState('');
    const [image_url, setImage_url] = useState(null);
    const [pdf_url, setPdf_url] = useState(null);

    const baseStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#eeee',
        borderStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out'
    };

    const focusedStyle = {
        borderColor: '#2196f3'
    };

    const acceptStyle = {
        borderColor: '#00e676'
    };

    const rejectStyle = {
        borderColor: '#ff1744'
    };

    const onDrop = useCallback(acceptedFiles => {

        setImage_url(acceptedFiles[0]);
        setIsFileSelected(true);
    }, []);

    const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({ onDrop });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [isFocused, isDragAccept, isDragReject]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        const maxSize = 50 * 1024 * 1024; // 50MB in bytes
    
        if (selectedFile && selectedFile.size <= maxSize) {
          setPdf_url(selectedFile);
        } else {
          alert('Please select a file smaller than 50MB.');
          e.target.value = null; 
        }

        
    };

    const handleKeywordsChange = (e) => {
        setKeywords(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !keywords || !image_url || !pdf_url) {
            alert('Please fill in all required fields.');
            return;
        }

        const formData = new FormData();

        formData.append('title', title);
        formData.append('keywords', keywords);
        formData.append('image_url', image_url);
        formData.append('pdf_url', pdf_url);

        try {
            await axios.post("http://localhost:3000/api/newsletter/upload", formData)

        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div className="col-12">
            <div className="shadow-sm p-3 mb-5  mt-5 bg-white rounded border-0">
                <Form onSubmit={handleSubmit} className="mt-4">
                    <Form.Group controlId="formTitle" className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter title"
                            value={title}

                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Form.Group>


                    <Form.Group controlId="formImage_url" className="mb-3">
                        <Form.Label>Select Image</Form.Label>
                        <div {...getRootProps({ style })}>
                            <input {...getInputProps()} style={{ display: 'none' }} />
                            {isFileSelected ? (
                                <p>Image file selected</p>
                            ) : (<div className="text-center">
                                <FaFileImage className="mb-3" style={{ fontSize: 35 }} />
                                <p>Drag 'n' drop image files here, or click to select files</p>
                            </div>
                            )}
                        </div>
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Select PDF</Form.Label>
                        <Form.Control type="file" onChange={handleFileChange} required />
                    </Form.Group>
                    <Form.Group controlId="formKeywords" className="mb-3">
                        <Form.Label>Keywords</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter keywords"
                            value={keywords}

                            onChange={handleKeywordsChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default NewsLetterPost;