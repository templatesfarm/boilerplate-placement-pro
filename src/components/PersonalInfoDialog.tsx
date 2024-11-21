import React, { useEffect, useState } from 'react';
import { usePersonalStore } from '@/store/personalStore';
import { Dialog, DialogContent, DialogDescription, DialogOverlay, DialogTitle } from './ui/dialog';

interface PersonalInfoDialogProps {
  isOpen?: boolean;
  onOpenChange?: (x: boolean) => void;
}

const PersonalInfoDialog: React.FC<PersonalInfoDialogProps> = ({ isOpen, onOpenChange = (x: boolean) => {console.log(x)} }) => {
  const { personalInfo, setPersonalInfo } = usePersonalStore();
  const [name, setName] = useState(personalInfo.name);
  const [phoneNumber, setPhoneNumber] = useState(personalInfo.contactNumber);
  const [email, setEmail] = useState(personalInfo.email);
  const [linkedin, setLinkedin] = useState(personalInfo.socialMedia.linkedin.link);
  const [github, setGithub] = useState(personalInfo.socialMedia.github.link);
  const [youtube, setYoutube] = useState(personalInfo.socialMedia.youtube.link);
  const [facebook, setFacebook] = useState(personalInfo.socialMedia.facebook.link);
  const [instagram, setInstagram] = useState(personalInfo.socialMedia.instagram.link);

  const handleSave = () => {
    setPersonalInfo({
      name,
      contactNumber: phoneNumber,
      email,
      socialMedia: {
        linkedin: { link: linkedin, icon: personalInfo.socialMedia.linkedin.icon },
        github: { link: github, icon: personalInfo.socialMedia.github.icon },
        youtube: { link: youtube, icon: personalInfo.socialMedia.youtube.icon },
        facebook: { link: facebook, icon: personalInfo.socialMedia.facebook.icon },
        instagram: { link: instagram, icon: personalInfo.socialMedia.instagram.icon },
      },
    });
    onOpenChange(false);
  };

  
  useEffect(() => {
    setName(personalInfo.name);
  },[personalInfo.name]);

  return (
    <Dialog open={isOpen} onOpenChange={() => onOpenChange(false)}>
      <DialogOverlay />
      <DialogContent className='overflow-auto min-h-[90%]'>
        <DialogTitle>Edit Personal Information</DialogTitle>
        <DialogDescription>Update your personal information below.</DialogDescription>
        <div className="">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="">
          <label className="block mb-1">Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="">
          <label className="block mb-1">LinkedIn URL</label>
          <input
            type="text"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="">
          <label className="block mb-1">GitHub URL</label>
          <input
            type="text"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="">
          <label className="block mb-1">YouTube URL</label>
          <input
            type="text"
            value={youtube}
            onChange={(e) => setYoutube(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="">
          <label className="block mb-1">Facebook URL</label>
          <input
            type="text"
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="">
          <label className="block mb-1">Instagram URL</label>
          <input
            type="text"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className=" flex justify-end">
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PersonalInfoDialog;