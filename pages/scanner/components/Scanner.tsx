import React, { RefObject, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import Quagga, { QuaggaJSCodeReader, QuaggaJSReaderConfig, QuaggaJSResultObject } from '@ericblade/quagga2';

function getMedian(arr: number[]) {
  arr.sort((a, b) => a - b);
  const half = Math.floor(arr.length / 2);
  if (arr.length % 2 === 1) {
    return arr[half];
  }
  return (arr[half - 1] + arr[half]) / 2;
}

function getMedianOfCodeErrors(decodedCodes: { error?: number; code: number; start: number; end: number }[]) {
  const errors = decodedCodes.filter((x) => x.error !== undefined).map((x) => x.error);
  return getMedian(errors as number[]);
}

const defaultConstraints = {
  width: 400,
  height: 200,
};

const defaultLocatorSettings = {
  patchSize: 'medium',
  halfSample: true,
};

const defaultDecoders: QuaggaJSCodeReader[] = ['ean_reader'];

interface Props {
  onDetected: (result: QuaggaJSResultObject) => any;
  scannerRef: RefObject<Element | string>;
  onScannerReady?: () => void;
  cameraId?: string;
  facingMode?: string;
  constraints?: {};
  locator?: {};
  numOfWorkers?: number;
  decoders?: (QuaggaJSReaderConfig | QuaggaJSCodeReader)[];
  locate?: boolean;
}

const Scanner = ({
  onDetected,
  scannerRef,
  onScannerReady,
  cameraId,
  facingMode,
  constraints = defaultConstraints,
  locator = defaultLocatorSettings,
  numOfWorkers = 0,
  decoders = defaultDecoders,
  locate = true,
}: Props) => {
  const windowSize = useRef<{ width: number; height: number }>();

  const errorCheck = useCallback(
    (result: QuaggaJSResultObject) => {
      console.log(result.codeResult.decodedCodes);
      if (!onDetected) {
        return;
      }
      const err = getMedianOfCodeErrors(result.codeResult.decodedCodes);
      // if Quagga is at least 75% certain that it read correctly, then accept the code.
      if (err < 0.5 && result) {
        onDetected(result);
      }
    },
    [onDetected]
  );

  const handleProcessed = (result: QuaggaJSResultObject) => {
    const drawingCtx = Quagga.canvas.ctx.overlay;

    if (result && result.codeResult && result.codeResult.code) {
      //drawingCtx.fillText(result.codeResult.code, 10, 20);
    }
  };

  useEffect(() => {
    windowSize.current = {
      width: window.innerWidth,
      height: 180,
    };
  }, []);

  useLayoutEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          constraints: {
            ...constraints,
            width: windowSize.current?.width,
            height: windowSize.current?.height,
            ...(cameraId && { deviceId: cameraId }),
            ...(!cameraId && { facingMode }),
          },
          ...(scannerRef.current ? { target: scannerRef.current } : {}),
        },
        locator,
        numOfWorkers,
        decoder: { readers: decoders },
        locate,
      },
      (err) => {
        Quagga.onProcessed(handleProcessed);

        if (err) {
          return console.log('Error starting Quagga:', err);
        }
        if (scannerRef && scannerRef.current) {
          Quagga.start();
          if (onScannerReady) {
            onScannerReady();
          }
        }
      }
    );

    Quagga.onDetected(errorCheck);

    return () => {
      Quagga.offDetected(errorCheck);
      Quagga.offProcessed(handleProcessed);
      Quagga.stop();
    };
  }, [cameraId, onDetected, onScannerReady, scannerRef, errorCheck, constraints, locator, decoders, locate]);

  return null;
};

export default Scanner;
