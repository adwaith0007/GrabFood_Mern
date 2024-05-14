import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import ReactCrop, { convertToPixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

// eslint-disable-next-line react/prop-types
function ImageCropComponent({ handleSubmit, handleImageChange, onClose }) {
    const [crop, setCrop] = useState<MyCropType | undefined>();
  const [imageSrc, setImageSrc] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

 

  interface MyCropType {
    unit: "%" | "px";
    width: number;
    height: number;
    x: number;
    y: number;
  }

  const generatePreview = (imageSrc, canvas, crop) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d Content");
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
    if (!file) return console.error("No file selected.");

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageUrl = reader.result?.toString() || "";
      setImageSrc(imageUrl);
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
    const crop: MyCropType = {
      unit: "%",
      width: 50,
      height: 50,
      x: 25,
      y: 25,
    };
    setCrop(crop);
  };

  function dataURLtoFile(dataUrl, filename) {
    // Convert the data URL to a Blob
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const blob = new Blob([u8arr], { type: mime });

    // Create a File object from the Blob
    return new File([blob], filename, { type: mime });
  }

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 z-50 flex items-center justify-center">
    <div className="bg-white p-8 z-50 rounded-md shadow-md w-[400px]">
    <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <AiOutlineClose size={24} />
          </button>
        </div>
        {[...Array(4)].map((_, index) => (
          <input
            key={index}
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => {
              onSelectFile(e);
              setImageIndex(index);
            }}
            className="block my-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
          />
        ))}
        <div className="flex">
          <div>
            {imageSrc && (
              <div>
                <ReactCrop
                  crop={crop}
                  onChange={( percentCrop) => setCrop(percentCrop)}
                  keepSelection
                >
                  <img
                    ref={imgRef}
                    src={imageSrc}
                    alt=""
                    onLoad={onImageLoad}
                    className="w-[40vh]"
                  />
                </ReactCrop>
              </div>
            )}
          </div>
          <div>
            {crop && (
              <canvas
                ref={previewCanvasRef}
                className="m-4"
                style={{
                  border: "1px solid white",
                  objectFit: "contain",
                  width: 150,
                  height: 150,
                }}
              />
            )}
          </div>
        </div>
        <a
          onClick={() => {
            generatePreview(
              imgRef.current,
              previewCanvasRef.current,
              convertToPixelCrop(
                crop,
                imgRef.current.width,
                imgRef.current.height
              )
            );
            const dataUrl = previewCanvasRef.current.toDataURL();
            const croppedImageFile = dataURLtoFile(
              dataUrl,
              `cropped_image_${imageIndex}.jpg`
            );
            handleImageChange(croppedImageFile, imageIndex);
          }}
          className=" border border-teal-600 px-2 py-1 mx-2 cursor-pointer"
        >
          Crop Image
        </a>
        <a
          onClick={() => handleSubmit(false)}
          className=" border border-teal-600 px-2 py-1 mx-2 cursor-pointer"
        >
          upload images
        </a>
      </div>
    </div>
  );
}

export default ImageCropComponent;