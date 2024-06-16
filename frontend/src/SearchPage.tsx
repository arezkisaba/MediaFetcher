import React, { useState } from 'react';
import { Download, Clipboard, CheckCircle } from 'lucide-react';

interface GetResultResponse {
  Title: string;
  Size: string;
  Seeders: number;
  Leechers: number;
  Link: string;
}

interface DownloadResponse {
  magnetUrl: string;
}

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<GetResultResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4446/api/torrents?q=${query}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: GetResultResponse[] = await response.json();
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
      const response = await fetch(`http://localhost:4446/api/torrents/download?q=${encodeURIComponent(link)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result: DownloadResponse = await response.json();
      setModalContent(result.magnetUrl);
    } catch (error) {
      setModalContent("There was an error downloading the torrent.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(modalContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
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
                    <tr key={result.Link}>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            {loading ? (
              <div className="flex justify-center">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
              </div>
            ) : (
              <div className="text-sm text-gray-900 whitespace-pre-wrap">
                {modalContent}
              </div>
            )}
            <div className="mt-4 flex justify-end space-x-2">
              <button onClick={handleCopy} className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {copied ? <CheckCircle className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
              </button>
              <button onClick={() => setModalOpen(false)} className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
