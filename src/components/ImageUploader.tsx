import { useState } from 'react';
import { ImageUploadResponse, UploadApiResponse, v2 as cloudinary } from 'cloudinary';

interface ImageUploaderProps {
  onChange: (images: string[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onChange }) => {
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) {
      return;
    }

    const newImages = Array.from(files);
    setImages([...images, ...newImages]);

    const newPreviewUrls = Array.from(files).map((file) => URL.createObjectURL(file));
    setPreviewUrls([...previewUrls, ...newPreviewUrls]);
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
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET!);

    try {
      const response = await cloudinary.uploader.upload(formData);
      return response.secure_url;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const uploadedImages: string[] = [];

    for (const image of images) {
      const uploadedImageUrl = await handleImageUpload(image);
      if (uploadedImageUrl) {
        uploadedImages.push(uploadedImageUrl);
      }
    }

    onChange(uploadedImages);
    setImages([]);
    setPreviewUrls([]);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        {previewUrls.map((previewUrl, index) => (
          <div key={index}>
            <img src={previewUrl} alt={`Preview ${index}`} />
            <button type="button" onClick={() => handleRemoveImage(index)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      <input type="file" multiple onChange={handleInputChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default ImageUploader;
