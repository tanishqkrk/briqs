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
  bannerImage?: string;
  bannerColor?: string;
  bannerBrightness?: number;
  bannnerBlur?: boolean;
  bannerType?: "image" | "color";
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
  // !YOUTUBE
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
  followers?: number;
  following?: number;
  pfp?: string;
  posts?: number;
  // !GITHUB
  login?: string;
  id?: number;
  node_id?: string;
  avatar_url?: string;
  gravatar_id?: string;
  url?: string;
  html_url?: string;
  followers_url?: string;
  following_url?: string;
  gists_url?: string;
  starred_url?: string;
  subscriptions_url?: string;
  organizations_url?: string;
  repos_url?: string;
  events_url?: string;
  received_events_url?: string;
  type?: string;
  site_admin?: boolean;
  name?: string;
  company?: string;
  blog?: string;
  location?: string;
  email?: any;
  hireable?: any;
  bio?: string;
  twitter_username?: any;
  public_repos?: number;
  public_gists?: number;
  followers?: number;
  following?: number;
  created_at?: string;
  updated_at?: string;
  // !GITHUB REPO
  id?: number;
  node_id?: string;
  name?: string;
  full_name?: string;
  private?: boolean;
  owner?: Owner;
  html_url?: string;
  description?: any;
  fork?: boolean;
  url?: string;
  forks_url?: string;
  keys_url?: string;
  collaborators_url?: string;
  teams_url?: string;
  hooks_url?: string;
  issue_events_url?: string;
  events_url?: string;
  assignees_url?: string;
  branches_url?: string;
  tags_url?: string;
  blobs_url?: string;
  git_tags_url?: string;
  git_refs_url?: string;
  trees_url?: string;
  statuses_url?: string;
  languages_url?: string;
  stargazers_url?: string;
  contributors_url?: string;
  subscribers_url?: string;
  subscription_url?: string;
  commits_url?: string;
  git_commits_url?: string;
  comments_url?: string;
  issue_comment_url?: string;
  contents_url?: string;
  compare_url?: string;
  merges_url?: string;
  archive_url?: string;
  downloads_url?: string;
  issues_url?: string;
  pulls_url?: string;
  milestones_url?: string;
  notifications_url?: string;
  labels_url?: string;
  releases_url?: string;
  deployments_url?: string;
  created_at?: string;
  updated_at?: string;
  pushed_at?: string;
  git_url?: string;
  ssh_url?: string;
  clone_url?: string;
  svn_url?: string;
  homepage?: string;
  size?: number;
  stargazers_count?: number;
  watchers_count?: number;
  language?: string;
  has_issues?: boolean;
  has_projects?: boolean;
  has_downloads?: boolean;
  has_wiki?: boolean;
  has_pages?: boolean;
  has_discussions?: boolean;
  forks_count?: number;
  mirror_url?: any;
  archived?: boolean;
  disabled?: boolean;
  open_issues_count?: number;
  license?: any;
  allow_forking?: boolean;
  is_template?: boolean;
  web_commit_signoff_required?: boolean;
  topics?: any[];
  visibility?: string;
  forks?: number;
  open_issues?: number;
  watchers?: number;
  default_branch?: string;
  //!TWITER
  status?: string;
  profile?: string;
  rest_id?: string;
  blue_verified?: boolean;
  affiliates?: any[];
  business_account?: any[];
  avatar?: string;
  header_image?: string;
  desc?: string;
  name?: string;
  website?: string;
  protected?: any;
  location?: string;
  friends?: number;
  sub_count?: number;
  statuses_count?: number;
  media_count?: number;
  pinned_tweet_ids_str?: any[];
  created_at?: string;
  id?: string;
  // !SPOTIFY USER
  display_name?: string;
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  images?: Image[];
  type?: string;
  uri?: string;
  followers?: Followers;
  // !SPOTIFY ALBUM
  artists?: Artist2[];
  available_markets?: string[];
  disc_number?: number;
  duration_ms?: number;
  explicit?: boolean;
  external_urls?: ExternalUrls4;
  href?: string;
  id?: string;
  name?: string;
  preview_url?: string;
  track_number?: number;
  type?: string;
  uri?: string;
  is_local?: boolean;
  // !SPOTIFY TRACK
  album?: Album;
  artists?: Artist2[];
  available_markets?: string[];
  disc_number?: number;
  duration_ms?: number;
  explicit?: boolean;
  external_ids?: ExternalIds;
  external_urls?: ExternalUrls4;
  href?: string;
  id?: string;
  is_local?: boolean;
  name?: string;
  popularity?: number;
  preview_url?: string;
  track_number?: number;
  type?: string;
  uri?: string;
  // !INSTAGRAM
  about?: any;
  account_badges?: any[];
  account_type?: number;
  active_standalone_fundraisers?: ActiveStandaloneFundraisers;
  adjusted_banners_order?: any[];
  ads_incentive_expiration_date?: any;
  ads_page_id?: any;
  ads_page_name?: any;
  bio_links?: any[];
  biography?: string;
  biography_email?: any;
  biography_with_entities?: BiographyWithEntities;
  can_add_fb_group_link_on_profile?: boolean;
  can_hide_category?: boolean;
  category?: any;
  chaining_suggestions?: ChainingSuggestion[];
  current_catalog_id?: any;
  eligible_for_text_app_activation_badge?: boolean;
  external_url?: string;
  fbid_v2?: number;
  follower_count?: number;
  following_count?: number;
  full_name?: string;
  has_anonymous_profile_picture?: boolean;
  has_chaining?: boolean;
  has_guides?: boolean;
  hd_profile_pic_url_info?: HdProfilePicUrlInfo;
  hd_profile_pic_versions?: HdProfilePicVersion[];
  id?: string;
  is_business?: boolean;
  is_call_to_action_enabled?: any;
  is_category_tappable?: boolean;
  is_eligible_for_request_message?: boolean;
  is_favorite?: boolean;
  is_favorite_for_clips?: boolean;
  is_favorite_for_igtv?: boolean;
  is_favorite_for_stories?: boolean;
  is_open_to_collab?: boolean;
  is_parenting_account?: boolean;
  is_private?: boolean;
  is_verified?: boolean;
  live_subscription_status?: string;
  location_data?: LocationData;
  media_count?: number;
  page_id?: any;
  page_name?: any;
  pinned_channels_info?: PinnedChannelsInfo;
  primary_profile_link_type?: number;
  professional_conversion_suggested_account_type?: number;
  profile_context?: string;
  profile_context_facepile_users?: any[];
  profile_context_links_with_user_ids?: any[];
  profile_pic_id?: string;
  profile_pic_url?: string;
  profile_pic_url_hd?: string;
  third_party_downloads_enabled?: number;
  total_igtv_videos?: number;
  upcoming_events?: any[];
  username?: string;
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

export interface Owner {
  login?: string;
  id?: number;
  node_id?: string;
  avatar_url?: string;
  gravatar_id?: string;
  url?: string;
  html_url?: string;
  followers_url?: string;
  following_url?: string;
  gists_url?: string;
  starred_url?: string;
  subscriptions_url?: string;
  organizations_url?: string;
  repos_url?: string;
  events_url?: string;
  received_events_url?: string;
  type?: string;
  site_admin?: boolean;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  url: string;
  height: number;
  width: number;
}

export interface Followers {
  href: any;
  total: number;
}
export interface Root {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  type: string;
  uri: string;
  artists: Artist[];
  tracks: Tracks;
  copyrights: Copyright[];
  external_ids: ExternalIds;
  genres: any[];
  label: string;
  popularity: number;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  url: string;
  height: number;
  width: number;
}

export interface Artist {
  external_urls: ExternalUrls2;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface ExternalUrls2 {
  spotify: string;
}

export interface Tracks {
  href: string;
  limit: number;
  next: any;
  offset: number;
  previous: any;
  total: number;
  items: Item[];
}

export interface Artist2 {
  external_urls: ExternalUrls3;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface ExternalUrls3 {
  spotify: string;
}

export interface ExternalUrls4 {
  spotify: string;
}

export interface Copyright {
  text: string;
  type: string;
}

export interface ExternalIds {
  upc: string;
}

export interface Album {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls2;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface ExternalUrls2 {
  spotify: string;
}

export interface Image {
  url: string;
  width: number;
  height: number;
}

export interface Artist2 {
  external_urls: ExternalUrls3;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface ExternalUrls3 {
  spotify: string;
}

export interface ExternalIds {
  isrc: string;
}

export interface ExternalUrls4 {
  spotify: string;
}

export interface ActiveStandaloneFundraisers {
  fundraisers: any[];
  total_count: number;
}

export interface BiographyWithEntities {
  entities: any[];
  raw_text: string;
}

export interface ChainingSuggestion {
  chaining_info: ChainingInfo;
  full_name: string;
  id: string;
  is_private: boolean;
  is_verified: boolean;
  profile_chaining_secondary_label: string;
  profile_pic_id: string;
  profile_pic_url: string;
  social_context: string;
  username: string;
}

export interface ChainingInfo {
  algorithm: any;
  sources: string;
}

export interface HdProfilePicUrlInfo {
  height: number;
  url: string;
  width: number;
}

export interface HdProfilePicVersion {
  height: number;
  url: string;
  width: number;
}

export interface LocationData {
  address_street: any;
  city_id: any;
  city_name: any;
  instagram_location_id: any;
  latitude: any;
  longitude: any;
  zip: any;
}

export interface PinnedChannelsInfo {
  has_public_channels: boolean;
  pinned_channels_list: any[];
}
