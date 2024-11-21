import { SocialMedia } from '@/app/types/portfolio.types';
import Link from 'next/link';
import React from 'react';
import { SiLinkedin, SiGithub, SiYoutube, SiFacebook, SiInstagram } from 'react-icons/si';

interface SocialMediaIconsProps {
  socialMedia: SocialMedia;
}

const iconMap: { [key: string]: React.ElementType } = {
  linkedin: SiLinkedin,
  github: SiGithub,
  youtube: SiYoutube,
  facebook: SiFacebook,
  instagram: SiInstagram,
};

const SocialMediaIcons: React.FC<SocialMediaIconsProps> = ({ socialMedia = {} }) => {
  return (
    <div className="flex justify-end items-center gap-5">
      {Object.entries(socialMedia).map(([key, url]) => {
        const IconComponent = iconMap[key.toLowerCase()];
        return (
          IconComponent && url && (
            <Link href={url} key={key} target="_blank" rel="noopener noreferrer">
              <IconComponent className="w-5 h-5 hover:scale-125 transition-all"/>
            </Link>
          )
        );
      })}
    </div>
  );
};

export default SocialMediaIcons;