import React, { useState, useEffect } from 'react';
import { usePersonalStore } from '@/store/personalStore';
import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogDescription } from './ui/dialog';
import { PersonalInfo } from '@/app/types/portfolio.types';

interface PersonalInfoDialogProps {
  isOpen?: boolean;
  onOpenChange?: (x: boolean) => void;
}

const PersonalInfoDialog: React.FC<PersonalInfoDialogProps> = ({ isOpen, onOpenChange }) => {
  const { personalInfo, savePersonalInfo } = usePersonalStore();
  const [localPersonalInfo, setLocalPersonalInfo] = useState<PersonalInfo>(personalInfo);

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
    await savePersonalInfo(localPersonalInfo);
    handleOpenChange();
    
  };

  const handleOpenChange = () => {
    if (onOpenChange) {
      onOpenChange(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogOverlay />
      <DialogContent className='overflow-auto min-h-[90%]'>
        <DialogTitle>Edit Personal Information</DialogTitle>
        <DialogDescription>Update your personal information below.</DialogDescription>
        <div className="mt-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={localPersonalInfo.name}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2">Phone Number</label>
          <input
            type="text"
            name="contactNumber"
            value={localPersonalInfo.contactNumber}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={localPersonalInfo.email}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2">LinkedIn URL</label>
          <input
            type="text"
            name="linkedin"
            value={localPersonalInfo.socialMedia?.linkedin}
            onChange={handleSocialMediaChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2">GitHub URL</label>
          <input
            type="text"
            name="github"
            value={localPersonalInfo.socialMedia?.github}
            onChange={handleSocialMediaChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2">YouTube URL</label>
          <input
            type="text"
            name="youtube"
            value={localPersonalInfo.socialMedia?.youtube}
            onChange={handleSocialMediaChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2">Facebook URL</label>
          <input
            type="text"
            name="facebook"
            value={localPersonalInfo.socialMedia?.facebook}
            onChange={handleSocialMediaChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2">Instagram URL</label>
          <input
            type="text"
            name="instagram"
            value={localPersonalInfo.socialMedia?.instagram}
            onChange={handleSocialMediaChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PersonalInfoDialog;