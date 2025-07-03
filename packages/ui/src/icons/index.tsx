import AppleIcon from './AppleIcon';
import ClockIcon from './Clock';
import GoogleIcon from './GoogleIcon';
import MetaIcon from './MetaIcon';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export { GoogleIcon, AppleIcon, MetaIcon, ClockIcon };
