import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { BsArrowLeft, BsArrowRight, BsHouseDoor } from 'react-icons/bs';
import './PDFcontent.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Url } from '../../url';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PdfContent = () => {
    const { title } = useParams();
    const [data, setData] = useState({});
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);


    const fetchData = async () => {
        try {
            const res = await axios.get(`${Url}api/newsletter/data/${title}`);
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const Nextpage = () => {
        if (pageNumber < numPages) {
            setPageNumber(pageNumber + 1);
        }
    };

    const Prevpage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    };

    function removeTextLayerOffset() {
        const textLayers = document.querySelectorAll('.react-pdf__Page__textContent');
        textLayers.forEach((layer) => {
            layer.style.display = 'none';
        });
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title]);

    return (
        <div className="wrap">
            <div className="controls">
                <button onClick={Prevpage} disabled={pageNumber === 1}>
                    <BsArrowLeft />
                </button>
                <span className="page-number">
                    Page {pageNumber} of {numPages}
                </span>
                <button onClick={Nextpage} disabled={pageNumber === numPages}>
                    <BsArrowRight />
                </button>
                <button onClick={()=>setPageNumber(1)} className="home-icon">
                    <BsHouseDoor />
                </button>
            </div>
            <Document
                file={`http://localhost:3000/newsletterUpload/${data.pdf_url}`}
                onLoadSuccess={onDocumentLoadSuccess}
                onContextMenu={(e) => e.target.value}
                className="pdf__container"
            >
                <Page pageNumber={pageNumber} onLoadSuccess={removeTextLayerOffset} />
            </Document>
        </div>
    );
};

export default PdfContent;
