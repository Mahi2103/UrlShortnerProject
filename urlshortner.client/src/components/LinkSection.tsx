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
  QrCode,
} from "lucide-react";

interface Link {
  id: string;
  shortLink: string;
  originalUrl: string;
  clicks: number;
  createdAt: string;
  expiresAt: string | null;
  qrCodeUrl: string;
}

const LinksSection: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5295/api/shorturl/all"
        );

        const mappedLinks: Link[] = response.data.map((link: any) => ({
          id: link.id,
          shortLink: link.shortCode,
          originalUrl: link.originalUrl,
          clicks: link.clicks,
          createdAt: link.createdAt,
          expiresAt: link.expiresAt,
          qrCodeUrl: link.qrCodeUrl,
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
      await navigator.clipboard.writeText(`http://localhost:5295/${shortLink}`);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = async (shortLink: string, originalUrl: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Shortened URL",
          text: `Check out this link: ${originalUrl}`,
          url: `https://${shortLink}`,
        });
      } catch {
        handleCopy(shortLink, "share-fallback");
      }
    } else {
      handleCopy(shortLink, "share-fallback");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5295/${id}`);
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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Your Links</h2>
        <div className="text-sm text-gray-500">{links.length} total links</div>
      </div>

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
                          href={`http://localhost:5295/${link.shortLink}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {`http://localhost:5295/${link.shortLink}`}
                        </a>
                      </span>
                    </div>

                    <p
                      className="text-gray-600 text-sm mb-3"
                      title={link.originalUrl}
                    >
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
                      onClick={() =>
                        handleShare(link.shortLink, link.originalUrl)
                      }
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Share link"
                    >
                      <Share2 className="w-5 h-5" />
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
                  <div>
                    <p className="text-gray-600 text-sm">
                      <a
                        href={link.qrCodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View QR Code
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {links.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ExternalLink className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No links yet
          </h3>
          <p className="text-gray-500">
            Create your first shortened link to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default LinksSection;
