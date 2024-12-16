import { create } from 'zustand';

const useUserStore = create((set) => ({
  username: '',
  profile_pic_url: '',  // Updated to match your field name
  setUsername: (newUsername) => set({ username: newUsername }),
  setProfilePicUrl: (newProfilePicUrl) => set({ profile_pic_url: newProfilePicUrl }),  // Updated to set profile_pic_url
}));

export { useUserStore };
