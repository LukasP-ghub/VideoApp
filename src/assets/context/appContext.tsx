import React, { useState } from 'react';
import { videoDataType } from '../types/types';

type AppCtx = {
  defaultVideos: string[],
  API: {
    [prop: string]: {
      API_KEY: string,
      API_ENDPOINT: string,
    },
  },
  videos: {}[],
  handleLoadDefaultVideos: () => void,
  handleAddVideo: (ref: HTMLInputElement) => void,
  handleRemoveVideo: (id: string) => void,
  handleInitVideoList: () => void,
}


const AppContext = React.createContext<AppCtx>({
  defaultVideos: [],
  API: {
    YOUTUBE: {
      API_KEY: '',
      API_ENDPOINT: '',
    },
  },
  videos: [],
  handleLoadDefaultVideos: () => { },
  handleAddVideo: () => { },
  handleRemoveVideo: () => { },
  handleInitVideoList: () => { },
});


export const AppContextProvider: React.FC = (props) => {
  const [videos, setVideos] = useState<videoDataType[]>([]);

  const fetchData = async (id: string) => {
    let response: any;
    let parsedRes: any;
    for await (const [key, value] of Object.entries(contextValue.API)) {
      switch (key) {
        case 'YOUTUBE':
          response = await fetch(`${value.API_ENDPOINT}&id=${id}&key=${value.API_KEY}`);
          parsedRes = await response.json();
          if (parsedRes.items.length !== 0) return { API: key, VIDEO: normalizeVideoData({ API: key, DATA: parsedRes }) }
          break;
      }
    }
  }

  const normalizeVideoData = ({ API, DATA }: { API: string, DATA: any }) => {
    switch (API) {
      case 'YOUTUBE':
        const { id, snippet, statistics } = DATA.items[0];
        return {
          id: id,
          title: snippet.localized.title,
          description: snippet.localized.description,
          publishDate: snippet.publishedAt,
          thumbnail: snippet.thumbnails.default.url,
          likeCount: statistics.likeCount,
          viewCount: statistics.viewCount,
        };
        break;
    }
  }

  const addDataToLocalStorage = (data: any) => {
    localStorage.setItem('videos', JSON.stringify(data));
  }

  const getDataFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('videos'));
  }

  const getVideoID = (input: string) => {
    let url;
    try {
      url = new URL(input);
      return url.searchParams.get("v") || url.pathname.slice(1);
    } catch (err) {
      return input;
    }
  }

  const handleLoadDefaultVideos = async () => {
    const res = await Promise.all(contextValue.defaultVideos.map(async (link) => {
      return await fetchData(getVideoID(link))
    }));
    const parsedRes = await Promise.all(res.map((item) => item));
    addDataToLocalStorage([...videos, ...parsedRes]);
    setVideos(prev => [...prev, ...parsedRes]);
  }

  const handleAddVideo = async (ref: any) => {
    const id = getVideoID(ref.current.value);
    if (!id) return;
    const res = await fetchData(id);
    addDataToLocalStorage([...videos, res]);
    setVideos(prev => [...prev, res]);
  }

  const handleRemoveVideo = (id: string) => {
    const newArr = videos.filter(item => item.VIDEO.id !== id);
    addDataToLocalStorage([...newArr]);
    setVideos([...newArr]);
  }

  const handleInitVideoList = () => {
    const data = getDataFromLocalStorage();
    setVideos([...data]);
  }

  const contextValue: AppCtx = {
    defaultVideos: ['https://www.youtube.com/watch?v=qA6oyQQTJ3I', 'https://www.youtube.com/watch?v=ZYb_ZU8LNxs', 'https://www.youtube.com/watch?v=iWEgpdVSZyg', 'https://www.youtube.com/watch?v=IJ6EgdiI_wU'],
    API: {
      YOUTUBE: {
        API_KEY: `${process.env.GOGGLE_API_KEY}`,
        API_ENDPOINT: `https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics`,
      },
    },
    videos: videos,
    handleLoadDefaultVideos: handleLoadDefaultVideos,
    handleAddVideo: handleAddVideo,
    handleRemoveVideo: handleRemoveVideo,
    handleInitVideoList: handleInitVideoList,
  }

  return <AppContext.Provider value={contextValue}>
    {props.children}
  </AppContext.Provider>
}

export default AppContext;