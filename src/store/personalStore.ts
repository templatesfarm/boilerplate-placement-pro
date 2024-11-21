import {create} from 'zustand';
import { IconType } from 'react-icons';
import { SiLinkedin, SiGithub, SiYoutube, SiFacebook, SiInstagram } from 'react-icons/si';

interface SocialMedia {
  linkedin: {
    link: string;
    icon: IconType;
  };
  github: {
    link: string;
    icon: IconType;
  };
  youtube: {
    link: string;
    icon: IconType;
  };
  facebook: {
    link: string;
    icon: IconType;
  };
  instagram: {
    link: string;
    icon: IconType;
  };
}

interface PersonalInfo {
  name: string;
  contactNumber: string;
  email: string;
  socialMedia: SocialMedia;
}

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
  setPersonalInfo: (info: PersonalInfo) => set({ personalInfo: info }),
  setSocialMedia: (socialMedia: SocialMedia) =>
    set((state) => ({
      personalInfo: { ...state.personalInfo, socialMedia },
    })),
}));