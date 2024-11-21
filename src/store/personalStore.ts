import {create} from 'zustand';
import { SiLinkedin, SiGithub, SiYoutube, SiFacebook, SiInstagram } from 'react-icons/si';
import { PersonalInfo, SocialMedia } from '@/app/types/portfolio.types';


interface PersonalStore {
  personalInfo: PersonalInfo;
  setPersonalInfo: (info: PersonalInfo) => void;
  setSocialMedia: (socialMedia: SocialMedia) => void;
}

export const usePersonalStore = create<PersonalStore>((set) => ({
  personalInfo: {
    name: 'Deepak Pahawa',
    contactNumber: '',
    email: '',
    socialMedia: {
      linkedin: {
        link: 'https://www.linkedin.com/in/deepakpahawa/',
        icon: SiLinkedin,
      },
      github: {
        link: '',
        icon: SiGithub,
      },
      youtube: {
        link: '',
        icon: SiYoutube,
      },
      facebook: {
        link: '',
        icon: SiFacebook,
      },
      instagram: {
        link: '',
        icon: SiInstagram,
      },
    },
  },
  setPersonalInfo: async (info: PersonalInfo) => {
    try {
      const response = await fetch('/api/personal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
      });
      const data = await response.json();
      console.log("🚀 ~ usePersonalStore ~ data:", data)
      if (!response.ok) {
        throw new Error('Failed to save personal information');
      }
    } catch (error) {
      console.error('Error saving personal information:', error);
    }
  },
  setSocialMedia: (socialMedia: SocialMedia) =>
    set((state) => ({
      personalInfo: { ...state.personalInfo, socialMedia },
    }))
     
    
}));