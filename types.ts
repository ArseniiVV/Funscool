export type reviewModalData = {
  title: string;
  place: string;
  text: string;
  img: string;
  logo: string;
  color: string;
};

export type infoModalData = {
  id: number;
  title: string;
  description: string;
  images: string[];
  color: string;
  date?: string;
  text?: string;
  activities?: {
    name: string;
    detail: string;
  }[];
  price?: string;
  city?: string;
  img?: string;
  image?: string;
  buttonText?: string;
  yaMetrikGoal?: string;
};

export type branchData = {
  yaMark?: string;
  id: number;
  photos: string[];
  title: string;
  address: string;
  yaMetrikGoal: string;
  video: string;
  metro?: string[];
  phone?: string;
};
export type teamMember = {
  id: number;
  name: string;
  position: string;
  description: string;
  credo: string;
  img: string;
};
