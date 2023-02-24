import Button from '@/components/Button';
import ReleaseSearchResultItem from '@/components/ReleaseSearchResultItem';
import { QuaggaJSResultObject } from '@ericblade/quagga2';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';
import { SearchRelease } from '../../types/discogs';
import { trpc } from '../../utils/trpc';

const Scanner = dynamic(() => import('@/pages/scanner/components/Scanner'), {
  ssr: false,
});

function ScannerPage() {
  const scannerRef = useRef(null);

  const hardwareConcurrency = useRef(0);
  const [allowScanning, setAllowScanning] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<QuaggaJSResultObject | null>();

  const { status, data } = trpc.discogs.resources.searchBarcode.useQuery<SearchRelease>(
    { barcode: scanResult?.codeResult.code },
    { enabled: !!scanResult?.codeResult.code }
  );

  useEffect(() => {
    if (navigator.hardwareConcurrency) {
      hardwareConcurrency.current = navigator.hardwareConcurrency;
    }
    if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
      const checkMedia = async () => {
        const data = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
      };
      checkMedia()
        .then(() => setAllowScanning(true))
        .catch(() => setAllowScanning(false));
    }
  }, []);

  useEffect(() => {
    if (status === 'success') {
      setScanning(false);
    }
  }, [status, data]);

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 flex flex-col-reverse justify-between pt-[60px]">
      <Button size="large" className="m-4" onClick={() => setScanning((prev) => !prev)}>
        {scanning ? 'Stop Scanning' : 'Scan Record'}
      </Button>

      <div className="flex-grow overflow-auto">
        <h4 className="border-b border-slate-300 bg-slate-200 px-4 py-3 text-sm text-slate-600">Results</h4>
        <div className="mt-4 grid grid-cols-1 gap-4">
          {JSON.stringify(scanResult)}
          {status === 'success' && data.results.length
            ? data.results.map((release) => <ReleaseSearchResultItem key={release.id} release={release} />)
            : status === 'success'
            ? 'Nothing found...'
            : ''}
        </div>
      </div>

      {!allowScanning ? (
        <div className="flex h-[180px] items-center justify-center bg-slate-900 p-4 text-sm italic text-amber-700">
          Please allow access to your camera
        </div>
      ) : (
        <div ref={scannerRef} className="relative h-[180px] w-full bg-slate-900">
          <canvas
            className="drawingBuffer"
            style={{
              position: 'absolute',
              top: 0,
            }}
          />
          {scanning ? (
            <Scanner
              scannerRef={scannerRef}
              onDetected={(result) => setScanResult(result)}
              numOfWorkers={hardwareConcurrency.current}
            />
          ) : null}
        </div>
      )}
    </div>
  );
}

export default ScannerPage;
