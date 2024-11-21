import React, { useState } from 'react';
import { usePersonalStore } from '@/store/personalStore';
import { Dialog, DialogContent, DialogDescription, DialogOverlay, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface DialogPropType {
    isOpen: boolean;
    onOpenChange: (x: boolean) => void;
}

const PersonalInfoDialog: React.FC<DialogPropType> = ({isOpen, onOpenChange}) => {

  const { personalInfo, setSocialMedia } = usePersonalStore();
  const [linkedin, setLinkedin] = useState(personalInfo.socialMedia.linkedin.link);
  const [github, setGithub] = useState(personalInfo.socialMedia.github.link);
  const [youtube, setYoutube] = useState(personalInfo.socialMedia.youtube.link);
  const [facebook, setFacebook] = useState(personalInfo.socialMedia.facebook.link);
  const [instagram, setInstagram] = useState(personalInfo.socialMedia.instagram.link);

  const handleSave = () => {
    setSocialMedia({
      linkedin: { link: linkedin, icon: personalInfo.socialMedia.linkedin.icon },
      github: { link: github, icon: personalInfo.socialMedia.github.icon },
      youtube: { link: youtube, icon: personalInfo.socialMedia.youtube.icon },
      facebook: { link: facebook, icon: personalInfo.socialMedia.facebook.icon },
      instagram: { link: instagram, icon: personalInfo.socialMedia.instagram.icon },
    });
    setIsOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={() => onOpenChange(false)}>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>Edit Social Media Links</DialogTitle>
          <DialogDescription>Update your social media links below.</DialogDescription>
          <div className="mt-4">
            <Label className="block mb-2">LinkedIn URL</Label>
            <Input
              type="text"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div className="mt-4">
            <Label className="block mb-2">GitHub URL</Label>
            <Input
              type="text"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div className="mt-4">
            <Label className="block mb-2">YouTube URL</Label>
            <Input
              type="text"
              value={youtube}
              onChange={(e) => setYoutube(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div className="mt-4">
            <Label className="block mb-2">Facebook URL</Label>
            <Input
              type="text"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div className="mt-4">
            <Label className="block mb-2">Instagram URL</Label>
            <Input
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
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
    </>
  );
};

export default PersonalInfoDialog;