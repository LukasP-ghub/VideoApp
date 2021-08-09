import React, { useState } from 'react';
import { videoDataType, localStorageTagType, listDisplayType } from '../types/types';

type AppCtx = {
  defaultVideos: string[],
  API: {
    [prop: string]: {
      API_KEY: string,
      API_ENDPOINT: string,
    },
  },
  videos: {}[],
  listDisplay: listDisplayType,
  handleLoadDefaultVideos: () => void,
  handleAddVideo: (ref: HTMLInputElement) => void,
  handleAddToFavorites: (id: string) => void,
  handleRemoveVideo: (id: string) => void,
  handleInitVideoList: () => void,
  handleClearList: () => void,
  handleSortList: (action: string) => void,
  handleListDisplay: () => void,
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
  listDisplay: 'list',
  handleLoadDefaultVideos: () => { },
  handleAddVideo: () => { },
  handleAddToFavorites: () => { },
  handleRemoveVideo: () => { },
  handleInitVideoList: () => { },
  handleClearList: () => { },
  handleSortList: () => { },
  handleListDisplay: () => { },
});


export const AppContextProvider: React.FC = (props) => {
  const [videos, setVideos] = useState<videoDataType[]>([]);
  const [favoriteVideos, setFavoriteVideos] = useState<videoDataType[]>([]);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [listDisplay, setListDisplay] = useState<listDisplayType>('tiles');

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
          publishDate: new Date(snippet.publishedAt).toLocaleDateString(),
          thumbnail: snippet.thumbnails.default.url,
          likeCount: statistics.likeCount,
          viewCount: statistics.viewCount,
        };
        break;
    }
  }

  const inverseDate = (date: string) => {
    const dateArr = date.split('.').reverse().map(item => +item);
    return new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);
  }

  const addDataToLocalStorage = (data: any, tag: localStorageTagType) => {
    localStorage.setItem(tag, JSON.stringify(data));
  }

  const getDataFromLocalStorage = (tag: localStorageTagType) => {
    return JSON.parse(localStorage.getItem(tag)) || [];
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
    addDataToLocalStorage([...videos, ...parsedRes], 'videos');
    setVideos(prev => [...prev, ...parsedRes]);
  }

  const handleAddVideo = async (ref: any) => {
    const id = getVideoID(ref.current.value);
    if (!id) return;
    const res = await fetchData(id);
    addDataToLocalStorage([...videos, res], 'videos');
    setVideos(prev => [...prev, res]);
  }

  const handleAddToFavorites = (id: string) => {
    const video = videos.filter(item => item.VIDEO.id === id);
    if (!favoriteVideos.filter(item => item.VIDEO.id === id).length) {
      addDataToLocalStorage([...favoriteVideos, ...video], 'favorite');
      setFavoriteVideos(prev => [...prev, ...video]);
    } else {
      alert('Video already is in favorites.');
    }

  }

  const handleRemoveVideo = (id: string) => {
    const newArr = videos.filter(item => item.VIDEO.id !== id);
    addDataToLocalStorage([...newArr], 'videos');
    setVideos([...newArr]);
  }

  const handleInitVideoList = () => {
    const dataVideos = getDataFromLocalStorage('videos');
    const dataFavorites = getDataFromLocalStorage('favorite');
    setVideos([...dataVideos]);
    setFavoriteVideos([...dataFavorites]);
  }

  const handleClearList = () => {
    localStorage.removeItem('videos');
    localStorage.removeItem('favorite');
    setVideos([]);
    setFavoriteVideos([]);
  }

  const handleSortList = (action: 'last-added' | 'oldest' | 'favorite') => {
    let state = [...videos];
    switch (action) {
      case 'last-added':
        state = state.sort((a, b) => {
          return inverseDate(a.VIDEO.publishDate).getTime() - inverseDate(b.VIDEO.publishDate).getTime();
        });
        break;
      case 'oldest':
        state = state.sort((a, b) => {
          return inverseDate(b.VIDEO.publishDate).getTime() - inverseDate(a.VIDEO.publishDate).getTime();
        });
        break;
      case 'favorite':
        if (isFavorite) {
          state = getDataFromLocalStorage('videos');
          setIsFavorite(prev => !prev);
        } else {
          state = [...favoriteVideos];
          setIsFavorite(prev => !prev);
        }
        break;
    }
    setVideos([...state]);
  }

  const handleListDisplay = () => {
    if (listDisplay === 'tiles' && window.innerWidth > 570) {
      setListDisplay('list');
    } else {
      setListDisplay('tiles');
    }
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
    listDisplay: listDisplay,
    handleLoadDefaultVideos: handleLoadDefaultVideos,
    handleAddVideo: handleAddVideo,
    handleAddToFavorites: handleAddToFavorites,
    handleRemoveVideo: handleRemoveVideo,
    handleInitVideoList: handleInitVideoList,
    handleClearList: handleClearList,
    handleSortList: handleSortList,
    handleListDisplay: handleListDisplay,
  }

  return <AppContext.Provider value={contextValue}>
    {props.children}
  </AppContext.Provider>
}

export default AppContext;