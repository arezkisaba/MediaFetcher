import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import ModalComponent from './components/ModalComponent';
import { ModalTypeEnum } from './components/ModalTypeEnum';
import { GetTorrentSearchResultResponse } from '@shared/src/models/GetTorrentSearchResultResponse.js';
import { AddTorrentDownloadRequest } from '@shared/src/models/AddTorrentDownloadRequest.js';
import { GetTorrentDownloadResponse } from '@shared/src/models/GetTorrentDownloadResponse.js';

const SearchPage: React.FC = () => {
    const [query, setQuery] = useState<string>('the acolyte');
    const [results, setResults] = useState<GetTorrentSearchResultResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<ModalTypeEnum>(ModalTypeEnum.None);
    const [progressData, setProgressData] = useState<GetTorrentDownloadResponse[]>([]);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:4445/api/torrent-search?q=${query}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data: GetTorrentSearchResultResponse[] = await response.json();
            setResults(data);
        } catch (error) {
            console.error("There was an error fetching the results!", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (link: string) => {
        setModalOpen(true);
        setLoading(true);
        try {
            const request: AddTorrentDownloadRequest = {
                PageLink: link
            };
            const response = await fetch('http://localhost:4445/api/torrent-downloads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });

            if (response.status === 400) {
                setModalType(ModalTypeEnum.Warning);
            } else if (!response || response.status === 500) {
                setModalType(ModalTypeEnum.Error);
            } else {
                setModalType(ModalTypeEnum.Success);
            }

            setTimeout(() => {
                setModalOpen(false);
                setModalType(ModalTypeEnum.None);
            }, 2000);
        } catch (error) {
            setModalType(ModalTypeEnum.Error);
        } finally {
            setLoading(false);
        }
    };

    const fetchProgress = async () => {
        try {
            const response = await fetch('http://localhost:4445/api/torrent-downloads');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data: GetTorrentDownloadResponse[] = await response.json();
            setProgressData(data);
        } catch (error) {
            console.error("There was an error fetching the progress data!", error);
        }
    };

    useEffect(() => {
        const interval = setInterval(fetchProgress, 2000);
        return () => clearInterval(interval);
    }, []);

    const getProgress = (link: string) => {
        const match = progressData.find(item => item.PageLink === link);
        return match ? match.Progress : 0;
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-12 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Torrent Search
                    </h2>
                </div>
                <div className="mt-8 space-y-6">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <button
                        onClick={handleSearch}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Search
                    </button>
                </div>
                {loading ? (
                    <div className="flex justify-center">
                        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
                    </div>
                ) : (
                    results.length > 0 && (
                        <div className="mt-8 flex justify-center">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Title
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Size
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Seeders
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Leechers
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Download
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {results.map((result) => (
                                        <tr key={result.Link} className="relative">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                <a href={result.Link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900">
                                                    {result.Title}
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.Size}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.Seeders}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.Leechers}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <button onClick={() => handleDownload(result.Link)} className="text-indigo-600 hover:text-indigo-900">
                                                    <Download className="h-5 w-5" />
                                                </button>
                                            </td>
                                            <td className="absolute inset-x-0 bottom-0 h-2 bg-indigo-600" style={{ width: `${getProgress(result.Link)}%` }}></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                )}
            </div>

            <ModalComponent ModalOpen={modalOpen} ModalType={modalType} Loading={loading} />

        </div>
    );
};

export default SearchPage;
