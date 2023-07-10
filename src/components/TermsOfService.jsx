import React, {useEffect, useState} from 'react';
import {termsOfService} from "../helpers";
import { Document, Page } from 'react-pdf'
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

export default function TermsOfService() {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    console.log('numPages - ', numPages);
    setNumPages(numPages);
  }

  useEffect(() => {
    document.title = 'Terms of Service | Pustack';
  }, [])

  return (
    <Document file={termsOfService} onLoadSuccess={onDocumentLoadSuccess}>
      {Array(numPages).fill("").map((_, i) => <Page pageNumber={i + 1} />)}
    </Document>
  )
}
