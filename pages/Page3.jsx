import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import Avatar from 'react-avatar-edit';
import { Link } from 'react-router-dom';



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
        <h3 className="p3-heading">Task 3 </h3>
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
