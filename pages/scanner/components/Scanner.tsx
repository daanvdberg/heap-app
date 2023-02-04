import React, { RefObject, useCallback, useLayoutEffect } from 'react';
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
  width: 640,
  height: 480,
};

const defaultLocatorSettings = {
  patchSize: 'medium',
  halfSample: true,
};

const defaultDecoders: QuaggaJSCodeReader[] = ['upc_reader'];

interface Props {
  onDetected: (result: QuaggaJSResultObject) => any;
  scannerRef?: RefObject<Element | string>;
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
  numOfWorkers = navigator.hardwareConcurrency || 0,
  decoders = defaultDecoders,
  locate = true,
}: Props) => {
  const errorCheck = useCallback(
    (result: QuaggaJSResultObject) => {
      if (!onDetected) {
        return;
      }
      const err = getMedianOfCodeErrors(result.codeResult.decodedCodes);
      // if Quagga is at least 75% certain that it read correctly, then accept the code.
      if (err < 0.25 && result) {
        onDetected(result);
      }
    },
    [onDetected]
  );

  const handleProcessed = (result: QuaggaJSResultObject) => {
    const drawingCtx = Quagga.canvas.ctx.overlay;

    if (result && result.codeResult && result.codeResult.code) {
      drawingCtx.fillText(result.codeResult.code, 10, 20);
    }
  };

  useLayoutEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          constraints: {
            ...constraints,
            ...(cameraId && { deviceId: cameraId }),
            ...(!cameraId && { facingMode }),
          },
          target: scannerRef && scannerRef.current ? scannerRef.current : undefined,
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
