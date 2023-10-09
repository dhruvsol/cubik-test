export interface Asset {
  id: string;
  ownership?: {
      owner: string;
  };
  compression?: {
      compressed: boolean;
  };
};
