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
  otherData: OtherData;
}

export interface OtherData {
  publishedAt?: string;
  channelId?: string;
  title?: string;
  description?: string;
  thumbnails?: Thumbnails;
  channelTitle?: string;
  liveBroadcastContent?: string;
  publishTime?: string;
  viewCount?: string;
  subscriberCount?: string;
  hiddenSubscriberCount?: boolean;
  videoCount?: string;
  type?: string;
  channel?: boolean;
  thumbnail?: string;
}

export interface Thumbnails {
  default?: Default;
  medium?: Medium;
  high?: High;
}

export interface Default {
  url?: string;
}

export interface Medium {
  url?: string;
}

export interface High {
  url?: string;
}

export interface WorkType {
  company: string;
  present: boolean;
  start: string;
  end: string;
  role: string;
  desc: string;
}
