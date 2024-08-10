export interface UserDataInterface {
  id: string;
  userId: string;
  email: string;
  theme: "Default";
  profileImage: string;
  name: string;
  bio: string;
  subtitle: string;
  content: ContentTypeInterface[] | [];
}

export interface ContentTypeInterface {
  timestamp: number;
  id: string;
  type: string;
  heading: {
    title: string;
    fontSize: number;
  };
  socials: SocialType[];
  gridType?: number;
  // socialsSize
  work?: WorkType[];
  order: number;
}

export interface SocialType {
  site: string;
  link: string;
  title: string;
  id: string;
  order: number;
  timestamp: number;
  otherData: {
    thumbnail: string;
    channel?: boolean;
  };
}

export interface WorkType {
  company: string;
  present: boolean;
  start: string;
  end: string;
  role: string;
  desc: string;
}
