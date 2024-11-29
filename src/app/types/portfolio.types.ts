export interface SocialMedia {
  [key: string]: string;
}

export interface PersonalInfo {
  name: string;
  contactNumber: string;
  email: string;
  socialMedia: SocialMedia;
}

export interface HeroType {
  message: string;
  introduction: string;
  description: string;
}