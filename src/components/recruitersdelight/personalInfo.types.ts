export interface SocialMediaType {
  linkedIn?: string;
  github?: string;
  xdotcom?: string;
  youtube?: string;
}

export interface PersonalInfoType {
  displayName?: string;
  name: string;
  contactNumber: string;
  email: string;
  socialMedia: SocialMediaType;
  resumeName?: string;
}
