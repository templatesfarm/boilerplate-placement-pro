import React, { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { PersonalInfoType } from "./personalInfo.types";
import FileUpload from "../FileUpload/FileUpload";

interface PersonalInfoDialogProps {
  isOpen: boolean;
  onOpenChange: (x: boolean) => void;
  personalInfo: PersonalInfoType;
  savePersonalInfo?: (x: PersonalInfoType) => void;
}

const PersonalInfoDialog: React.FC<PersonalInfoDialogProps> = ({
  isOpen,
  onOpenChange,
  personalInfo,
  savePersonalInfo,
}) => {
  const [localPersonalInfo, setLocalPersonalInfo] =
    useState<PersonalInfoType>(personalInfo);

  useEffect(() => {
    setLocalPersonalInfo(personalInfo);
  }, [personalInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalPersonalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSocialMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalPersonalInfo((prev) => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [name]: value,
      },
    }));
  };

  const handleSave = async () => {
    await savePersonalInfo?.(localPersonalInfo);
    handleOpenChange();
  };

  const handleOpenChange = () => {
    onOpenChange(false);
  };

  const handleFileData = useCallback(
    ({ fileName, fileUrl }: { fileName?: string; fileUrl?: string }) => {
      console.log("🚀 ~ handleImageUrl ~ fileName:", fileName, fileUrl);
      setLocalPersonalInfo((prev) => ({
        ...prev,
        resumeName: fileName,
      }));
    },
    []
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogOverlay />
      <DialogContent className="overflow-auto max-h-[90%] space-y-2 z-50">
        <DialogTitle>Edit Personal Information</DialogTitle>
        <DialogDescription>
          Update your personal information below.
        </DialogDescription>
        <div className="">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={localPersonalInfo.name}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="">
          <label className="block mb-1">Phone Number</label>
          <input
            type="text"
            name="contactNumber"
            value={localPersonalInfo.contactNumber}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={localPersonalInfo.email}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="">
          <label className="block mb-1">LinkedIn URL</label>
          <input
            type="text"
            name="linkedIn"
            value={localPersonalInfo.socialMedia?.linkedIn}
            onChange={handleSocialMediaChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="">
          <label className="block mb-1">GitHub URL</label>
          <input
            type="text"
            name="github"
            value={localPersonalInfo.socialMedia?.github}
            onChange={handleSocialMediaChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="">
          <label className="block mb-1">YouTube URL</label>
          <input
            type="text"
            name="youtube"
            value={localPersonalInfo.socialMedia?.youtube}
            onChange={handleSocialMediaChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="">
          <label className="block mb-1">X URL</label>
          <input
            type="text"
            name="xdotcom"
            value={localPersonalInfo.socialMedia?.xdotcom}
            onChange={handleSocialMediaChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mt-4">
          <p className="text-sm text-blue-500">
            File Uploaded: {localPersonalInfo.resumeName}
          </p>
          <FileUpload
            handleFileData={handleFileData}
            message="Upload PDF or Word file only"
          />
        </div>
        <div className=" flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PersonalInfoDialog;
