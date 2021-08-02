import React, { useState } from 'react';

type AppCtx = {
  defaultVideos: string[],
  API_KEYS: {
    [prop: string]: string,
  }
  API_ENDPOINTS: {
    [prop: string]: string,
  },
}

const AppContext = React.createContext<AppCtx>({
  defaultVideos: [],
  API_KEYS: {
    YOUTUBE: '',
  },
  API_ENDPOINTS: {
    YOUTUBE: ``,
  }
});


export const AppContextProvider: React.FC = (props) => {

  const fetchData = async () => {
    const response = await fetch(contextValue.API_ENDPOINTS.YOUTUBE);
  }

  const getVideoID = (link: string) => {
    const url = new URL(link);

  }

  const handleLoadDefaultVideos = () => {
    contextValue.defaultVideos.forEach((link) => {

    })
  }

  const contextValue: AppCtx = {
    defaultVideos: ['https://www.youtube.com/watch?v=qA6oyQQTJ3I', 'https://www.youtube.com/watch?v=ZYb_ZU8LNxs', 'https://www.youtube.com/watch?v=iWEgpdVSZyg', 'https://www.youtube.com/watch?v=IJ6EgdiI_wU'],
    API_KEYS: {
      YOUTUBE: '&key=blabla',
    },
    API_ENDPOINTS: {
      YOUTUBE: `https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics`,
    },
  }

  return <AppContext.Provider value={contextValue}>
    {props.children}
  </AppContext.Provider>
}

export default AppContext;