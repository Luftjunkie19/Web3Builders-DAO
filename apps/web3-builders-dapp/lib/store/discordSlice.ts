// store/discordSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const discordSlice = createSlice({
  name: 'discord',
  initialState: {
    user: null,
    guilds: [],
  },
  reducers: {
    setDiscordUser: (state, action) => {
      state.user = action.payload.user;
      state.guilds = action.payload.guilds;
    },
    logoutDiscord: (state) => {
      state.user = null;
      state.guilds = [];
    },
  },
});

export const { setDiscordUser, logoutDiscord } = discordSlice.actions;
export default discordSlice.reducer;