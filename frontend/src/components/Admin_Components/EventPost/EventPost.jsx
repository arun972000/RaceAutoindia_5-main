/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */

import { useMemo, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios';
import { FaFileImage } from "react-icons/fa";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const EventPost = () => {   



    const [isFileSelected, setIsFileSelected] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('')
    const [event_date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [keywords, setKeywords] = useState('');
    const [image_url, setImage_url] = useState(null);


    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
      
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
      
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['link', 'image'],
        ['clean']                                         // remove formatting button
      ];

      const module={
        toolbar:toolbarOptions,
      }
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



    const handleKeywordsChange = (e) => {
        setKeywords(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !content || !event_date || !location || !category || !keywords || !image_url) {
            alert('Please fill in all required fields.');
            return;
        }

        const formData = new FormData();


        formData.append('title', title);
        formData.append('content', content)
        formData.append('event_date', event_date);
        formData.append('location', location);
        formData.append('category', category);
        formData.append('keywords', keywords);
        formData.append('image_url', image_url);


        try {
            await axios.post("http://localhost:3000/api/event/upload", formData)

        } catch (err) {
            console.log(err)
        }
        // for (const pair of formData.entries()) {
        //     console.log(pair[0], pair[1]);
        // }

    };

    return (
        <div className="col-12">
            <div className="shadow-sm p-3 mb-5  mt-5 bg-white rounded border-0">
                <div className="row">
                    <div className="col-md-6">
                        <Form.Group controlId="formTitle" className="mb-3" >
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                value={title}
                                
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formContent" className="mb-3">
                            <Form.Label>Content</Form.Label>
                            <ReactQuill modules={module} theme="snow" value={content} onChange={setContent} />
                        </Form.Group>

                        <Form.Group controlId="formDate" className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={event_date}
                                onChange={(e) => setDate(e.target.value)}
                                
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formLocation" className="mb-3">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter location"
                                value={location}
                                
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </div>
                    <div className="col-md-6">
                        <Form.Group controlId="formCategory" className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                value={category}
                                
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            >
                                <option value="Business">Business</option>
                                <option value="Festival">Festival</option>
                                <option value="Popular">Popular</option>
                            </Form.Control>
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



                        <Button variant="primary" onClick={handleSubmit}>
                            Submit
                        </Button>

                    </div>
                </div>




            </div>
        </div>
    );
};

export default EventPost;
