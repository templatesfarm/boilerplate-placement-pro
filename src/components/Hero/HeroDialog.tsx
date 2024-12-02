import React, { useState, useEffect } from 'react';
import { useHeroStore } from '@/store/heroStore';
import { Dialog, DialogContent, DialogDescription, DialogOverlay, DialogTitle } from '../ui/dialog';
import { HeroType } from '@/app/types/portfolio.types';
import FileUpload from '../FileUpload/FileUpload';

interface HeroDialogProps {
  isOpen?: boolean;
  onOpenChange?: (x: boolean) => void;
}

const HeroDialog: React.FC<HeroDialogProps> = ({ isOpen, onOpenChange }) => {
  const { heroInfo, saveHeroInfo } = useHeroStore();
  const [localHeroInfo, setLocalHeroInfo] = useState<HeroType>(heroInfo);

  useEffect(() => {
    setLocalHeroInfo(heroInfo);
  }, [heroInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLocalHeroInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    await saveHeroInfo(localHeroInfo);
    onOpenChange?.(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onOpenChange?.(false)}>
      <DialogOverlay />
      <DialogContent className='overflow-auto max-h-svh space-y-2'>
        <DialogTitle>Edit Hero Information</DialogTitle>
        <DialogDescription>Update your hero information below.</DialogDescription>
        <div className="">
          <label className="block mb-1">Message</label>
          <input
            type="text"
            name="message"
            value={localHeroInfo.message}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="">
          <label className="block mb-1">Introduction</label>
          <textarea
            name="introduction"
            value={localHeroInfo.introduction}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="">
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={localHeroInfo.description}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
        <FileUpload />
      </DialogContent>
    </Dialog>
  );
};

export default HeroDialog;