import { IconType } from "react-icons";

export interface SocialMedia {
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
  
  export interface PersonalInfo {
    name: string;
    contactNumber: string;
    email: string;
    socialMedia: SocialMedia;
  }