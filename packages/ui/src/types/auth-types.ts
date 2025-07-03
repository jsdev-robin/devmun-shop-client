export interface ILocation {
  region: string;
  language: string;
  currency: string;
}

export interface ICommunication {
  postalMail: boolean;
  phoneCalls: boolean;
}

export interface INotifications {
  send_message?: boolean;
  receive_reply?: boolean;
  new_follower?: boolean;
  listing_expiration?: boolean;
}

export interface ISubscriptions {
  new_notable?: boolean;
  feedback?: boolean;
  coupons_promotions?: boolean;
  forums?: boolean;
  advocacy?: boolean;
  seller_activity?: boolean;
  news_features?: boolean;
  shop_tips?: boolean;
  pattern_news?: boolean;
  premium_news?: boolean;
}

export interface IInclude {
  includeShop?: boolean;
  favoriteItems?: boolean;
  favoriteShops?: boolean;
}

export interface IAddress {
  country: string;
  fullName: string;
  street: string;
  flat?: string;
  city: string;
  postCode?: string;
  isDefault?: boolean;
}

export interface IFeedback {
  reason: string;
  subreason?: string;
  description?: string;
  contractEmail?: boolean;
}

export interface ISessionToken {
  token: string;
  createAt: Date;
  browser: string;
  device: string;
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
  timezone: string;
  status: boolean;
}

export interface ISocialConnectionMeta {
  googleId?: string;
  facebookId?: string;
  githubUsername?: string;
  twitterHandle?: string;
  discordId?: string;
  linkedinId?: string;
  instagramHandle?: string;
}

export interface ISocialConnections {
  google?: string;
  facebook?: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
  instagram?: string;
  discord?: string;
  twitch?: string;
  youtube?: string;
  tiktok?: string;
  spotify?: string;
  _meta?: ISocialConnectionMeta;
}

export interface IActivityLog {
  type: 'page_view' | 'click' | 'form_submit' | 'search' | 'login' | 'logout' | 'error' | 'custom_event';
  path: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  description?: string;
  referrer?: string;
  userAgent?: string;
  ip?: string;
  device?: string;
  browser?: string;
  geo?: {
    lat: number;
    lng: number;
    accuracy?: number;
  };
  timestamp?: Date;
  metadata?: Record<string, unknown>;
}

export interface IUser {
  _id: string;
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  password?: string;
  avatar?: {
    public_id: string;
    url: string;
  };
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  city: string;
  geo: {
    lat: number;
    lng: number;
    accuracy?: number;
    timestamp?: Date;
  };
  birthday: Date;
  about?: string;
  favoriteMaterials: string[];
  lastActive: Date;
  include?: IInclude;
  role: 'admin' | 'user' | 'moderator';
  status: {
    isVerified?: boolean;
    isDeactivated?: boolean;
    isBanned?: boolean;
    isBlock?: boolean;
    fullname: string;
  };
  sessionToken: ISessionToken[];
  settings: {
    location: ILocation;
    communication: ICommunication;
    notifications: INotifications;
    subscriptions: ISubscriptions;
  };
  addresses: IAddress[];
  feedbacks: IFeedback[];
  socialConnections: ISocialConnections[];
  activityLogs: IActivityLog;

  createdAt: number;
  updatedAt: number;
}

/* =================================================
  Api Types
 ================================================= */

export type Role = 'admin' | 'user' | 'moderator';

interface Img {
  src: string;
  alt: string;
}

export interface AuthState {
  verificationToken: string | null;
  user: IUser | null;
  isAuth: boolean;
}

export interface SuccessResponse {
  status: 'success';
  message: string;
}

export interface SingupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface VerifyEmailRequest {
  token: string;
  otp: number;
}

export interface SinginRequest {
  email: string;
  password: string;
  remember?: boolean;
}
