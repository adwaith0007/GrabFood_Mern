import { useState, useRef, useCallback } from "react";
import toast from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import ReactCrop, { convertToPixelCrop, Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

function ImageCropComponent({
  handleImageChange,
  onClose,
  aspectRatio,

  maxImage,
}) {
  const [crop, setCrop] = useState<Crop | undefined>();
  const [imageSrc, setImageSrc] = useState("");
  // const [imageIndex, setImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [originalFilename, setOriginalFilename] = useState("");
  // const [showCropButton, setShowCropButton] = useState(true);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const inputRef = useRef(null);

  const MAX_IMAGE_SIZE_MB = 0.244;

  const generatePreview = (imageSrc, canvas, crop) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      toast.error("Failed to get canvas context.");
      return;
    }

    const pixelRatio = window.devicePixelRatio;
    const scaleX = imageSrc.naturalWidth / imageSrc.width;
    const scaleY = imageSrc.naturalHeight / imageSrc.height;

    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = "high";
    ctx.save();

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    ctx.translate(-cropX, -cropY);
    ctx.drawImage(
      imageSrc,
      0,
      0,
      imageSrc.naturalWidth,
      imageSrc.naturalHeight,
      0,
      0,
      imageSrc.naturalWidth,
      imageSrc.naturalHeight
    );

    ctx.restore();
  };

  const onSelectFile = (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("No file selected.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Selected file is not an image.");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      toast.error(`Image size should not exceed ${MAX_IMAGE_SIZE_MB * 1024}KB.`);
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageUrl = reader.result?.toString() || "";
      setImageSrc(imageUrl);
      setOriginalFilename(file.name);
      // setShowCropButton(true);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e) => {
    const { naturalHeight, naturalWidth } = e.currentTarget;
    if (naturalHeight < 150 || naturalWidth < 150) {
      toast.error("Image must be at least 150x150 pixels");
      setImageSrc("");
      return;
    }
    const crop: Crop = {
      unit: "%",
      width: 50,
      height: 50,
      x: 25,
      y: 25,
    };
    setCrop(crop);
  };

  function dataURLtoFile(dataUrl, filename) {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const blob = new Blob([u8arr], { type: mime });
    return new File([blob], filename, { type: mime });
  }

  const formatFilename = (originalName) => {
    const date = new Date().toISOString().replace(/[:.]/g, "-");
    const name = originalName.substring(0, originalName.lastIndexOf("."));
    const extension = originalName.substring(originalName.lastIndexOf("."));
    return `${name}_${date}${extension}`;
  };

  // const handleAddAnotherImage = () => {
  //   setImageSrc("");
  //   setImageIndex((prevIndex) => prevIndex + 1);
  //   setShowCropButton(false); // Hide "Crop Image" button when adding another image
  // };

  const handleCropImage = () => {
    generatePreview(
      imgRef.current,
      previewCanvasRef.current,
      convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height)
    );
    const dataUrl = previewCanvasRef.current.toDataURL();
    const croppedImageFile = dataURLtoFile(
      dataUrl,
      formatFilename(originalFilename)
    );

    if (croppedImageFile instanceof File) {
      const newImageIndex = images.length; // Get the current index for the new image
      setImages([...images, croppedImageFile]);
      handleImageChange(croppedImageFile, newImageIndex); // Pass cropped image file and new index
      setImageSrc(""); // Clear the image source after cropping
      // setShowCropButton(false); // Hide "Crop Image" button after cropping
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onSelectFile({ target: { files: [files[0]] } });
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  return (
    <div
      className="fixed top-0 right-0 left-0 bottom-0 z-50 flex items-center justify-center"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="bg-white p-8 z-50 rounded-[10px]  shadow-md w-[450px]">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 mb-10 "
          >
            <AiOutlineClose size={24} />
          </button>
        </div>

        {!imageSrc && images.length < maxImage && (
          <div className="flex  justify-center mx-5">
            <form className="file-upload-form">
              <label htmlFor="file" className="file-upload-label w-[400px]  ">
                <div className="file-upload-design ">
                  <svg viewBox="0 0 640 512" height="1em">
                    <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                  </svg>
                  <p>Drag and Drop</p>
                  <p>or</p>
                  <span className="browse-button  ">Browse file</span>
                </div>
                <input
                  ref={inputRef}
                  id="file"
                  name="file"
                  type="file"
                  accept="image/*"
                  onChange={onSelectFile}
                  style={{ display: "none" }}
                />
              </label>
            </form>
          </div>
        )}
        {imageSrc && (
          <>
            <ReactCrop
              crop={crop}
              aspect={aspectRatio}
              minHeight={150}
              minWidth={150}
              onChange={(c) => setCrop(c)}
            >
              <img
                ref={imgRef}
                src={imageSrc}
                onLoad={onImageLoad}
                className="w-full max-h-80 object-contain"
              />
            </ReactCrop>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleCropImage}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Crop Image
              </button>

              <label
                htmlFor="file"
                className="bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer"
              >
                Change Image
                <input
                  id="file"
                  type="file"
                  onChange={(e) => {
                    onSelectFile(e);
                  }}
                  ref={inputRef}
                  style={{ display: "none" }}
                />
              </label>
            </div>
          </>
        )}
        <div className="flex flex-wrap mt-4">
          {images.map((image, index) => (
            <div key={index} className="w-24 h-24 m-2">
              <img
                src={URL.createObjectURL(image)}
                alt={`Cropped ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <canvas ref={previewCanvasRef} style={{ display: "none" }} />
        {images.length > 0 && (
          <div className="flex justify-center items-center mt-5">
            <button
              className="bg-green-500 text-white py-2 px-20 rounded-md hover:bg-green-600 transition-all duration-300"
              onClick={onClose}
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageCropComponent;



