import Button from '@/components/Button';
import { Html5Qrcode } from 'html5-qrcode';
import { QrcodeErrorCallback, QrcodeSuccessCallback } from 'html5-qrcode/core';
import { CameraDevice } from 'html5-qrcode/esm/camera/core';
import { Html5QrcodeCameraScanConfig } from 'html5-qrcode/html5-qrcode';
import { ChangeEvent, useEffect, useState } from 'react';

// TODO
// Unfinished/unoptimized state
// To be improved

let html5QrCode: Html5Qrcode;

const createConfig = (props: Html5QrcodeCameraScanConfig) => {
  let config: Html5QrcodeCameraScanConfig = {
    fps: props.fps || 10,
  };
  if (props.qrbox) {
    config.qrbox = props.qrbox;
  }
  if (props.aspectRatio) {
    config.aspectRatio = props.aspectRatio;
  }
  if (props.disableFlip !== undefined) {
    config.disableFlip = props.disableFlip;
  }
  return config;
};

interface ScannerProps extends Html5QrcodeCameraScanConfig {
  onResult: (decodedText: string) => void;
  onError?: QrcodeErrorCallback;
  verbose?: boolean;
}

const Scanner = ({ onResult, onError, verbose, ...rest }: ScannerProps) => {
  const [cameraList, setCameraList] = useState<CameraDevice[]>([]);
  const [activeCamera, setActiveCamera] = useState<CameraDevice>();

  useEffect(() => {
    html5QrCode = new Html5Qrcode('reader');
    getCameras();
    const oldRegion = document.getElementById('qr-shaded-region');
    oldRegion && oldRegion.remove();
  }, []);

  const handleClickAdvanced = () => {
    const qrCodeSuccessCallback: QrcodeSuccessCallback = (decodedText, decodedResult) => {
      onResult(decodedText);
      handleStop();
    };
    html5QrCode.start({ facingMode: 'environment' }, createConfig(rest), qrCodeSuccessCallback, onError).then(() => {
      // const oldRegion = document.getElementById("qr-shaded-region");
      // if (oldRegion) oldRegion.innerHTML = "";
    });
  };

  const getCameras = () => {
    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          console.log(JSON.stringify(devices));
          setCameraList(devices);
          setActiveCamera(devices[0]);
        }
      })
      .catch(() => {
        setCameraList([]);
      });
  };

  const onCameraChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.selectedIndex) {
      let selectedCamera = e.target.options[e.target.selectedIndex];
      console.info(selectedCamera);
      let cameraId = selectedCamera.dataset.key;
      setActiveCamera(cameraList.find((cam) => cam.id === cameraId));
    }
  };

  const handleStop = () => {
    try {
      html5QrCode.stop().then(() => {
        html5QrCode.clear();
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <div id="reader"></div>
      {JSON.stringify(cameraList)}
      <Button onClick={() => handleClickAdvanced()}>start</Button>
      <Button onClick={() => handleStop()}>stop pro</Button>
    </div>
  );
};

export default Scanner;
