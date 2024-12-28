import { useState } from "react";

const MessageImages = ({
  message,
  handleDownloadImage,
}: {
  message: any;
  handleDownloadImage: (data: any) => void;
}) => {
  const [showMore, setShowMore] = useState(false);

  const imagesToDisplay = showMore ? message.image : message.image.slice(0, 4);

  const handleShowMoreClick = () => {
    setShowMore(!showMore);
  };

  const handleDownload = (item: any, index: number) => {
    const link = document.createElement("a");
    link.href = item.url;
    link.download = `image-${index}.jpg`; // Customize file name
    link.click();
  };

  return (
    <div className="grid gap-4 grid-cols-2 my-2.5">
      {imagesToDisplay.map((item: any, index: number) => (
        <div key={index} className="group relative">
          <div
            className={`absolute w-full h-full ${
              item.isDownloaded
                ? "bg-gray-900/50 opacity-0 transition-opacity"
                : "bg-gray-900/50 opacity-100 transition-opacity"
            }  duration-300 rounded-lg flex items-center justify-center`}
          >
            <button
              onClick={async () => {
                await handleDownloadImage({
                  id: message._id,
                  imageId: item.id,
                });
                await handleDownload(item, index);
              }}
              data-tooltip-target={`download-image-${index}`}
              className="inline-flex items-center justify-center rounded-full h-8 w-8 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50"
            >
              <svg
                className="w-4 h-4 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
                />
              </svg>
            </button>
            <div
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              Download image
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </div>
          <img src={item.url} className="rounded-lg h-32 w-full" />
        </div>
      ))}

      {message.image.length > 4 && !showMore && (
        <div className="group relative">
          <button
            onClick={handleShowMoreClick}
            className="absolute w-full h-full bg-gray-900/90 hover:bg-gray-900/50 transition-all duration-300 rounded-lg flex items-center justify-center"
          >
            <span className="text-xl font-medium text-white">+7</span>
            <div
              id="download-image"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              Download image
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </button>
          <img
            src="https://flowbite.com/docs/images/blog/image-1.jpg"
            className="rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default MessageImages;
