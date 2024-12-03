// components/ImageUpload.tsx
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type PropType  = {
  setImageUrl: (x: string) => void;
}

const FileUpload:React.FC<PropType> = ({ setImageUrl }) => {
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image) return alert("Please select an image to upload.");
    setUploading(true);

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData, 
      });
      const data = await response.json() || null;
      console.log("🚀 ~ handleUpload ~ url:", data)
      if (response.ok && !!data) { 
        setUploadedUrl(data.url);
        setImageUrl(data.url);
      }
    } catch (err) {
      const error = err as Error;
      console.error("Error uploading image:", error);
      setError(error.message)
      alert("Failed to upload the image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="file">Upload an image</Label>
      <Input type="file" id="file" accept="image/*" onChange={handleFileChange} />
      <Button disabled={!image || uploading} onClick={handleUpload}>
        {uploading ? "Uploading..." : "Upload"}
      </Button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {!!uploadedUrl && (
        <div className="mt-4">
          <p>Image uploaded successfully:</p>
          {/* <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">
            {uploadedUrl}
          </a> */}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
