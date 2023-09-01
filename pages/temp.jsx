This is my Index.html  

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tasks</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

This is my App.jsx

import { useState, useEffect } from 'react'
import Page1 from '../pages/Page1'
import Page2 from '../pages/Page2'
import Page3 from '../pages/Page3'

//npm react-webcam

function App() {

  return (
    <>
    <Page2 />
    </>
  )
}

export default App



This is App.jsx with mod1

import { useState, useEffect } from 'react'
import Page1 from '../pages/Page1'
import Page2 from '../pages/Page2'
import Page3 from '../pages/Page3'
import { BrowserRouter as Router , Route , Link , Routes } from 'react-router-dom'

//npm react-webcam

export default function App() {

  return (
   <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Page1 />} />
          <Route exact path="page2" element={<Page2 />} />
          <Route exact path="page3" element={<Page3 />} />
        </Routes>
        <div>
          <ul>
            <li>
              <Link to='/'>Page1</Link>
            </li>
          </ul>

          <ul>
            <li>
              <Link to='page2'>Page2</Link>
            </li>
          </ul>

          <ul>
            <li>
              <Link to='page3'>Page3</Link>
            </li>
          </ul>
        </div>
      </Router>

   </div>
  )
}



This is my Page1.jsx

import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";


export default function Page1() {
  useEffect(() => {
    getdata();
  }, []);

  const [data, setdata] = useState([]);
  const [option, setoption] = useState({
    page: '',
    pagesize: '',
    order: "desc",
    sort: "popular",
    fromdate: '',
    todate: ''
  });

  async function getdata() {
    const url = `https://api.stackexchange.com/2.2/tags?page=${option.page}&pagesize=${option.pagesize}&order=${option.order}&sort=${option.sort}&fromdate=${option.fromdate}&todate=${option.todate}&filter=default&site=stackoverflow`;
    try {
      const response = await fetch(url);
      const responseData = await response.json();
      const mappeddata = responseData.items.map(node => ({
        name: node.name,
        count: node.count
      }));

      setdata(mappeddata);
    } catch (error) {
      console.error("Error fetching or parsing data:", error);
      alert("Data not supplied properly");
    }
  }

  function handlechange(event) {
    const { name, value } = event.target;
    setoption(prev => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <>
    <div className="page1body">
    <div className="page-container">
      <p className="title">Zolve Task 1</p>
      <div className="spacebox-pg1"></div>
      <div className="nameclass">
        <label>
          Page:
          <input
            type="number"
            name="page"
            value={option.page}
            onChange={handlechange}
          />
        </label>

        <label>
          Page Size:
          <input
            type="number"
            name="pagesize"
            value={option.pagesize}
            onChange={handlechange}
          />
        </label>

        <label>
          From Date:
          <input
            type="date"
            name="fromdate"
            value={option.fromdate}
            onChange={handlechange}
          />
        </label>

        <label>
          To Date:
          <input
            type="date"
            name="todate"
            value={option.todate}
            onChange={handlechange}
          />
        </label>

        <select
          value={option.sort}
          onChange={handlechange}
          name="sort"
          className="sort"
        >
          <option value="popular">popular</option>
          <option value="activity">activity</option>
          <option value="name">name</option>
        </select>

        <select
          value={option.order}
          onChange={handlechange}
          name="order"
          className="order"
        >
          <option value="asc">asc</option>
          <option value="desc">desc</option>
        </select>

        <button onClick={getdata} className="getdata">Get Data</button>
      </div>

      <Chart
        width={'1200px'}
        height={'600px'}
        chartType="Bar"
        loader={<div>Loading Chart</div>}
        data={[
          ['Name', 'Count'],
          ...data.map(item => [item.name, item.count])
        ]}
        options={{
          chart: {
            title: 'Tag Count',
            subtitle: 'Tag count from Stack Overflow API'
          },
          vAxis: {
            format: '0' // Use 0 to display whole numbers
          }
        }}
      />
    </div>
    </div>
    </>
  );
}



This is my Page2.jsx

import { useState, useEffect , useRef} from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default function Page2(){
    const query =(window.location.search)
    console.log(query.slice(3))

    //const [val ,setval] = useState('')
    const textval = useRef(null)

    function handleClick(){
    textval.current.select();
    const text = textval.current.value
    //console.log(text)
    if(text.length < 1){
        alert("The Input Box is Empty")
      }
      else{
        
        document.execCommand('copy');
        alert(`Text copied to clipboard \nThe text is "${text}"`)
        
      }
    }
   
   
    //https://c4.wallpaperflare.com/wallpaper/12/895/634/uncharted-uncharted-4-a-thief-s-end-logo-wallpaper-preview.jpg 
    //https://substackcdn.com/image/fetch/w_1166,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack.com%2Fimg%2Fhome_page%2Fhero_image.png
    return(
        <>
        <div className='spacebox1'>

        </div>
        <div className='p2head'>
        <h4 >Zolve Task 2</h4>
        </div>
        <div className='task2image'>
            <img  className='task2-image' src="https://c4.wallpaperflare.com/wallpaper/12/895/634/uncharted-uncharted-4-a-thief-s-end-logo-wallpaper-preview.jpg " alt="ps4image" />
        </div>
        <div className='spacebox1'>

        </div>
        <div className='textbox' >
            <input type="text" ref={textval}  placeholder='Type something... '  defaultValue={window.location.search.slice(3,)}  className='textfield'/>
            <button className='buttonfield' onClick={handleClick}>Copy to clipboard</button>
        </div>
        <div className='spacebox1'>

        </div>
        <div>
            <h4 className='readtext'>To perform copy-query-to-clipboard, type in this format (: http://localhost:3000?q=text you want)</h4>
        </div>
       
        </>
    )
}



This is my Page3.jsx

import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import Avatar from 'react-avatar-edit';


export default function Page3() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [isWebcamAvailable, setIsWebcamAvailable] = useState(true);
  const [isWebcamAccessDenied, setIsWebcamAccessDenied] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [editedImg, setEditedImg] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const checkCameraAvailability = useCallback(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      setIsWebcamAvailable(false);
      return;
    }

    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        const hasWebcam = devices.some(device => device.kind === 'videoinput');
        if (!hasWebcam) {
          setIsWebcamAvailable(false);
          return;
        }

        navigator.mediaDevices.getUserMedia({ video: true })
          .catch(error => {
            if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
              setIsWebcamAccessDenied(true);
              window.alert("Webcam access is denied. Please grant permission to access your webcam.");
            }
          });
      })
      .catch(error => {
        console.error("Error enumerating devices:", error);
      });
  }, []);

  const startCamera = useCallback(() => {
    checkCameraAvailability();
    if (isWebcamAvailable && !isWebcamAccessDenied) {
      setIsCameraOn(true);
    } else if (isWebcamAvailable && isWebcamAccessDenied) {
      window.alert("Webcam access was denied. Cannot start the camera.");
    }
  }, [checkCameraAvailability, isWebcamAvailable, isWebcamAccessDenied]);

  const stopCamera = useCallback(() => {
    setIsCameraOn(false);
    setImgSrc(null);
    setEditedImg(null);
  }, []);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();

      if (!imageSrc) {
        window.alert("Failed to capture screenshot. Webcam may not be available.");
        return;
      }
      setImgSrc(imageSrc);
      setIsCameraOn(false);
    }
  }, []);

  const onCrop = useCallback(preview => {
    setEditedImg(preview);
  }, []);

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      alert("Photo uploaded");
    }, 1000); // 1 seconds
  };

  const handleHome = () => {
    setIsCameraOn(true);
    setImgSrc(null);
    setEditedImg(null);
  };

  return (
    <>
    <div className="camerabody">
      <div className="page-container">
        <h3 className="p3-heading">Task 3 Alam</h3>
        {isCameraOn ? (
          <div className="camera-container">
            <Webcam
              height={480}
              width={480}
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />
            <button className="p3-button" onClick={capture}>Capture photo</button>
            <button className="p3-button" onClick={stopCamera}>Stop Camera</button>
          </div>
        ) : (
          <div className="camera-container">
            {imgSrc ? (
              <div>
                <Avatar
                  width={390}
                  height={295}
                  onCrop={onCrop}
                  onClose={() => setEditedImg(null)}
                  src={imgSrc}
                />
                <img src={editedImg} alt="Edited Preview" />
                <button className="p3-button" onClick={handleUpload} disabled={isUploading}>
                  {isUploading ? "Uploading..." : "Upload"}
                </button>
                <button className="p3-button" onClick={handleHome}>Capture Again</button>
              </div>
            ) : (
              <div>
                {isWebcamAvailable ? (
                  <button className="p3-button" onClick={startCamera}>Start Camera</button>
                ) : (
                  <p>No webcam device detected.</p>
                )}
                {isWebcamAccessDenied && !isCameraOn && (
                  <p>Webcam access is denied. Please grant permission to access your webcam.</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      </div>
    </>
  );
}
