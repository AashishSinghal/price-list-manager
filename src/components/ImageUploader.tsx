import { useEffect, useState } from "react";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import { Cloudinary } from "@cloudinary/url-gen";

interface ImageUploaderProps {
  onChange: (Images: string[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onChange }) => {
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    console.log(files);
    if (!files) {
      return;
    }

    const newImages = Array.from(files);
    setImages([...images, ...newImages]);

    const newPreviewUrls = Array.from(files).map((file) =>
      window.URL.createObjectURL(file)
    );
    // setPreviewUrls([...previewUrls, ...newPreviewUrls]);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviewUrls = [...previewUrls];
    newPreviewUrls.splice(index, 1);
    setPreviewUrls(newPreviewUrls);
  };

  const handleImageUpload = async (image: File): Promise<string | null> => {
    const cloudinary = new Cloudinary({
      cloud: {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
      },
      url: {
        secure: true,
        apiVersion: "v1_1",
      },
    });

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
    const ImageObj = await response.json();
    setPreviewUrls([...previewUrls, ImageObj.public_id]);
    return ImageObj;
  };

  const handleFormSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const uploadedImages: any[] = [];

    for (const image of images) {
      const uploadedImageUrl = await handleImageUpload(image);
      if (uploadedImageUrl) {
        uploadedImages.push(uploadedImageUrl);
      }
    }
    console.log("uploadedImages - ", uploadedImages);
    setPreviewUrls([
      ...previewUrls,
      ...uploadedImages.map((image) => image.public_id),
    ]);
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
      <div className="m-1 flex gap-1">
        <input
          type="file"
          multiple
          name="image"
          onChange={handleInputChange}
          className="file-input-bordered file-input w-full max-w-xs"
        />
        <button className="btn-primary btn" onClick={handleFormSubmit}>
          Upload
        </button>
      </div>
      <CloudinaryContext
        cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!}
      >
        <div className="flex gap-1">
          {previewUrls.map((previewUrl, index) => (
            <div key={index} className="flex flex-col gap-1">
              <Image
                publicId={previewUrl}
                cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
              >
                <Transformation width="150" crop="scale" />
              </Image>
              <button type="button" onClick={() => handleRemoveImage(index)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      </CloudinaryContext>
    </div>
  );
};

export default ImageUploader;
