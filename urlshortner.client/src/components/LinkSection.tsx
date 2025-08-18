import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Copy,
  Share2,
  Trash2,
  ExternalLink,
  BarChart3,
  Calendar,
  Clock,
  X,
} from "lucide-react";

interface Link {
  id: string;
  shortLink: string;
  originalUrl: string;
  clicks: number;
  createdAt: string;
  expiresAt: string | null;
  qrCodeUrl: string;
  browser?: string;
  device?: string;
  ipAddress?: string;
}

const token = localStorage.getItem("token");

const LinksSection: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedLink, setSelectedLink] = useState<Link | null>(null);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get("http://localhost:5295/api/shorturl/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const mappedLinks: Link[] = response.data.map((link: any) => ({
          id: link.id,
          shortLink: link.shortCode,
          originalUrl: link.originalUrl,
          clicks: link.clicks,
          createdAt: link.createdAt,
          expiresAt: link.expiresAt,
          qrCodeUrl: link.qrCodeUrl,
          browser: link.browser,
          device: link.device,
          ipAddress: link.ipAddress,
        }));

        setLinks(mappedLinks);
      } catch (err) {
        console.error("Failed to fetch links:", err);
      }
    };

    fetchLinks();
  }, []);

  const handleCopy = async (shortLink: string, id: string) => {
    try {
      await navigator.clipboard.writeText(`http://localhost:5295/r/${shortLink}`);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5295/api/shorturl/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLinks(links.filter((link) => link.id !== id));
    } catch (err) {
      console.error("Failed to delete link:", err);
    }
  };
  
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const isExpired = (expirationDate: string | null) =>
    expirationDate ? new Date(expirationDate) < new Date() : false;

  const getDaysUntilExpiry = (expirationDate: string | null) => {
    if (!expirationDate) return 0;
    const diffTime = new Date(expirationDate).getTime() - new Date().getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Your Links</h2>
        <div className="text-sm text-gray-500">{links.length} total links</div>
      </div>

      {/* Links List */}
      <div className="grid gap-4">
        {links.map((link) => {
          const expired = isExpired(link.expiresAt);
          const daysUntilExpiry = getDaysUntilExpiry(link.expiresAt);

          return (
            <div
              key={link.id}
              className={`bg-white rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 ${
                expired ? "border-red-200 bg-red-50/30" : "border-gray-200"
              }`}
            >
              <div className="p-6">
                {/* Header with actions */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-3">
                      {expired && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Expired
                        </span>
                      )}
                      {!expired &&
                        daysUntilExpiry <= 7 &&
                        daysUntilExpiry > 0 && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Expires in {daysUntilExpiry} days
                          </span>
                        )}
                    </div>

                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-blue-600 font-semibold text-lg">
                        <a
                          href={`http://localhost:5295/r/${link.shortLink}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.shortLink}
                        </a>
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-3" title={link.originalUrl}>
                      {link.originalUrl}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleCopy(link.shortLink, link.id)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Copy link"
                    >
                      {copiedId === link.id ? (
                        <div className="w-5 h-5 text-green-600">✓</div>
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>

                    <button
                      onClick={() => handleDelete(link.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete link"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">
                        {link.clicks.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500">clicks</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        Created {formatDate(link.createdAt)}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span
                        className={`text-sm ${
                          expired ? "text-red-600" : "text-gray-500"
                        }`}
                      >
                        {expired ? "Expired" : "Expires"}{" "}
                        {link.expiresAt ? formatDate(link.expiresAt) : "-"}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedLink(link);
                      setShowModal(true);
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    View Analytics
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && selectedLink && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold mb-4">Analytics</h3>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">QR Code</p>
                <img
                  src={selectedLink.qrCodeUrl}
                  alt="QR Code"
                  className="w-32 h-32 mt-2"
                />
              </div>

              <div>
                <p className="text-sm text-gray-500">IP Address</p>
                <p className="font-medium">{selectedLink.ipAddress ?? "N/A"}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Device</p>
                <p className="font-medium">{selectedLink.device ?? "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {links.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ExternalLink className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No links yet</h3>
          <p className="text-gray-500">Create your first shortened link to get started.</p>
        </div>
      )}
    </div>
  );
};

export default LinksSection;
