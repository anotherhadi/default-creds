export interface NavItem {
  label: string;
  href?: string;
  icon?: any;
  children?: NavItem[];
}

export interface Result {
  manufacturer: string;
  name: string;
  icon: string;
  tags: string[];
  version: string;
  comment: string;
  user: string;
  pass: string;
}
