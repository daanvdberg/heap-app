import ReleaseSearchResultItem from '@/components/ReleaseSearchResultItem';
import { QuaggaJSResultObject } from '@ericblade/quagga2';
import React, { useEffect, useRef, useState } from 'react';
import Scanner from '@/pages/scanner/components/Scanner';
import { SearchRelease } from '../../types/discogs';
import { trpc } from '../../utils/trpc';

function ScannerPage() {
  const scannerRef = useRef(null);

  const [allowScanning, setAllowScanning] = useState(false);
  const [scanning, setScanning] = useState(true);
  const [scanResult, setScanResult] = useState<QuaggaJSResultObject>();

  const { status, data } = trpc.discogs.resources.searchBarcode.useQuery<SearchRelease>(
    { barcode: scanResult?.codeResult.code },
    { enabled: !!scanResult?.codeResult.code }
  );

  useEffect(() => {
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

  if (!allowScanning) {
    return <div>Please use this feature on a device with a camera.</div>;
  }

  return (
    <div>
      {status === 'success' && data.results.length ? (
        <div>
          <h4>Match(es) found</h4>
          <div className="mt-4 grid grid-cols-1 gap-4">
            {data.results.map((release) => (
              <ReleaseSearchResultItem key={release.id} release={release} />
            ))}
          </div>
        </div>
      ) : null}
      {scanning ? (
        <div ref={scannerRef} style={{ position: 'relative' }}>
          <canvas
            className="drawingBuffer"
            style={{
              position: 'absolute',
              top: 0,
              display: 'block',
              width: '100%',
              height: '36vh',
            }}
          />
          <Scanner scannerRef={scannerRef} onDetected={(result) => setScanResult(result)} />
        </div>
      ) : null}
    </div>
  );
}

export default ScannerPage;
