import { MouseEvent, useEffect, useState } from "react";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import { Cloudinary } from "@cloudinary/url-gen";

interface ImageUploaderProps {
  onChange: (Images: string[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onChange }) => {
  const [images, setImages] = useState<File[]>([]);
  const [isPreviewLoading, setIsPreviewLoading] = useState<boolean>(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    console.log(files);
    if (!files) {
      return;
    }
    // Setting Images array to images state
    const newImages = Array.from(files);
    setImages([...images, ...newImages]);

    // const newPreviewUrls = Array.from(files).map((file) =>
    //   window.URL.createObjectURL(file)
    // );
    // setPreviewUrls([...previewUrls, ...newPreviewUrls]);
  };

  const handleRemoveImage = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    index: number
  ) => {
    event.preventDefault();
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviewUrls = [...previewUrls];
    newPreviewUrls.splice(index, 1);
    setPreviewUrls(newPreviewUrls);
  };

  const handleImageUpload = async (image: File): Promise<any | null> => {
    // get cloudinary instance
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET) {
      throw new Error("Upload Preset not available !!");
    }
    const cloudinary = new Cloudinary({
      cloud: {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
      },
      url: {
        secure: true,
        apiVersion: "v1_1",
      },
    });

    // creating fordata to be sent in the API call
    const formData = new FormData();
    formData.append("file", image);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET
    );
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );
    // converting cloudinary response to image object
    const ImageObj = await response.json();
    return ImageObj;
  };

  const handleUploadSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIsPreviewLoading(true);
    const uploadedImages: any[] = [];
    // traverse the array of images and upload to cloudinary and get the image object back
    for (const image of images) {
      const uploadedImageUrl = await handleImageUpload(image);
      if (uploadedImageUrl) {
        uploadedImages.push(uploadedImageUrl.secure_url);
      }
    }
    console.log("uploadedImages - ", uploadedImages);

    // set the preview URL for image preview
    setPreviewUrls([
      ...previewUrls,
      ...uploadedImages.map((image) => image.public_id),
    ]);
    setIsPreviewLoading(false);
    // sending the image url data to upper scope/ parent for pushing to DB.
    onChange(uploadedImages);
  };

  useEffect(() => {
    console.log("images - ", images);
    console.log("previewURLs - ", previewUrls);
  }, [images, previewUrls]);

  return (
    <div className="m-3 flex flex-col">
      <label className="label">
        <span className="label-text">Pick a Image file</span>
      </label>
      <div className="m-1 flex gap-3">
        <input
          type="file"
          multiple
          name="image"
          // step 1 - Handle Input change and Set Images to images State.
          onChange={handleInputChange}
          className="file-input-bordered file-input w-full max-w-xs"
        />
        {/* step 2 - on handleUploadSubmit */}
        <button className="btn-primary btn" onClick={handleUploadSubmit}>
          Upload
        </button>
      </div>
      <br />
      <CloudinaryContext
        cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!}
      >
        {images ? (
          isPreviewLoading && <progress className="progress w-56"></progress>
        ) : (
          <div className="carousel-center carousel rounded-box max-w-md space-x-4 bg-neutral p-4">
            {previewUrls.map((previewUrl, index) => (
              <div
                key={index}
                className=" carousel-item relative flex flex-col"
              >
                <Image
                  id="image"
                  publicId={previewUrl}
                  cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                >
                  <Transformation width="150" height="150" crop="scale" />
                </Image>
                <label
                  htmlFor="image"
                  className="btn-sm btn-circle btn absolute right-2 top-2"
                  onClick={(event) => handleRemoveImage(event, index)}
                >
                  x
                </label>
              </div>
            ))}
          </div>
        )}
      </CloudinaryContext>
    </div>
  );
};

export default ImageUploader;
