export type IProfileUpdate = {
  name?: string;
  address?: string;
  contactNumber?: string;
  profileImg?: string;
};

export type IUserFilterRequest = {
  search?: string;
  email?: string;
  name?: string;
  contactNumber?: string;
  role?: string;
};
