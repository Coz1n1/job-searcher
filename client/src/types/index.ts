export type OfferType = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  salary: string;
  experience: string;
  location: string;
  company_name: string;
  operating_mode: string;
  type_of_work: string;
};

export type SelectType = {
  value: string;
  lavel: string;
};

export type ApplicationType = {
  id: number;
  user_name: string;
  user_email: string;
  additional_info: string;
  file: string;
};
