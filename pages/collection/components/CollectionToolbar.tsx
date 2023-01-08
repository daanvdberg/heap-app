import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import Select from 'react-select'

interface CollectionToolbarProps {
    count: number;
    type?: 'grid' | 'list';
}

const options = [
    { value: 'all', label: 'All Releases' },
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

const CollectionToolbar = ({ count, type = 'grid'}: CollectionToolbarProps) => {
    return (
        <div className="flex justify-between items-center bg-white rounded-md shadow-lg mb-6 py-3 px-4">
            <div className="flex items-center">
                <Select className="w-44" defaultValue={options[0]} options={options} placeholder="Filter Category" theme={(theme) => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        primary25: '#0891b2',
                        primary: '#0891b2',
                    },
                })} />
                <div className="ml-4 text-sm">
                    {count > 0 ? `${count} Releases` : 'No Releases'}
                </div>
            </div>
            <div className="flex relative items-center">
                <button className={`px-4 py-2.5 inline-flex items-center justify-center border rounded-l-md border-gray-200 text-center focus:bg-primary bg-white [&.active]:bg-gray-100${type === 'grid' ? ' active' : ''}`}>
                    <FontAwesomeIcon icon={solid('border-all')} className="h-4 w-4 mr-1" />
                </button>
                <button className={`px-4 py-2.5 inline-flex items-center justify-center border border-l-0 rounded-r-md border-gray-200 text-center focus:bg-primary bg-white[&.active]:bg-gray-100${type === 'list' ? ' active' : ''}`}>
                    <FontAwesomeIcon icon={solid('list')} className="h-4 w-4 mr-1" />
                </button>
            </div>
        </div>
    );
}

export default CollectionToolbar;