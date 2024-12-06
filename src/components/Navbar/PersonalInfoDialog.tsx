import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { PersonalInfo } from "@/app/types/portfolio.types";

interface PersonalInfoDialogProps {
  isOpen: boolean;
  onOpenChange: (x: boolean) => void;
  personalInfo: PersonalInfo;
  savePersonalInfo?: (x: PersonalInfo) => void;
}

const PersonalInfoDialog: React.FC<PersonalInfoDialogProps> = ({
  isOpen,
  onOpenChange,
  personalInfo,
  savePersonalInfo,
}) => {
  const [localPersonalInfo, setLocalPersonalInfo] =
    useState<PersonalInfo>(personalInfo);

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

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogOverlay />
      <DialogContent className="overflow-auto max-h-svh space-y-2">
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
            name="linkedin"
            value={localPersonalInfo.socialMedia?.linkedin}
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
          <label className="block mb-1">Facebook URL</label>
          <input
            type="text"
            name="facebook"
            value={localPersonalInfo.socialMedia?.facebook}
            onChange={handleSocialMediaChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="">
          <label className="block mb-1">Instagram URL</label>
          <input
            type="text"
            name="instagram"
            value={localPersonalInfo.socialMedia?.instagram}
            onChange={handleSocialMediaChange}
            className="border p-2 w-full"
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
