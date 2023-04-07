import ReleaseSearchResultItem from '@/components/ReleaseSearchResultItem';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { SearchRelease } from '../../types/discogs';
import { trpc } from '../../utils/trpc';

const Scanner = dynamic(() => import('@/pages/scanner/components/Scanner'), {
  ssr: false,
});

function ScannerPage() {
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>();

  const { status, data } = trpc.discogs.resources.searchBarcode.useQuery<SearchRelease>(
    { barcode: scanResult },
    { enabled: !!scanResult }
  );

  useEffect(() => {
    if (status === 'success') {
      setScanning(false);
    }
  }, [status, data]);

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 flex flex-col-reverse justify-between pt-[60px]">
      <div className="flex-grow overflow-auto">
        <h4 className="border-b border-slate-300 bg-slate-200 px-4 py-3 text-sm text-slate-600">
          {scanResult ? `Results: "${scanResult}"` : 'Results'}
        </h4>
        <div className="mt-4 grid grid-cols-1 gap-4">
          {status === 'success' && data.results.length
            ? data.results.map((release) => <ReleaseSearchResultItem key={release.id} release={release} />)
            : status === 'success'
            ? 'Nothing found...'
            : ''}
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <Scanner
          fps={10}
          qrbox={{ width: 300, height: 150 }}
          aspectRatio={0.6}
          disableFlip={false}
          onResult={(decodedText) => {
            console.log(decodedText);
            setScanResult(decodedText);
          }}
        />
      </div>
    </div>
  );
}

export default ScannerPage;
