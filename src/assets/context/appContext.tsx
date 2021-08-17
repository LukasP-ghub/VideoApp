import React, { useState } from 'react';
import { videoDataType, localStorageTagType, listDisplayType, paginationType, paginationHandlerType, showModalType } from '../types/types';

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
  pagination: paginationType,
  isFavorite: boolean,
  showModal: showModalType,
  handleLoadDefaultVideos: () => void,
  handleAddVideo: (ref: HTMLInputElement) => void,
  handleAddToFavorites: (id: string) => void,
  handleRemoveVideo: (id: string) => void,
  handleInitVideoList: () => void,
  handleClearList: () => void,
  handleSortList: (action: string) => void,
  handleListDisplay: () => void,
  handleShowModal: (src: string) => void,
  handlePagination: (pageTag: paginationHandlerType) => void,
}


const AppContext = React.createContext<AppCtx>({
  defaultVideos: [],
  API: {
    YOUTUBE: {
      API_KEY: '',
      API_ENDPOINT: '',
    },
    VIMEO: {
      API_KEY: '',
      API_ENDPOINT: '',
    }
  },
  videos: [],
  listDisplay: 'list',
  pagination: { page: 1, itemsPerPage: 6, totalPages: 1 },
  isFavorite: false,
  showModal: { isShow: false, link: '' },
  handleLoadDefaultVideos: () => { },
  handleAddVideo: () => { },
  handleAddToFavorites: () => { },
  handleRemoveVideo: () => { },
  handleInitVideoList: () => { },
  handleClearList: () => { },
  handleSortList: () => { },
  handleListDisplay: () => { },
  handleShowModal: () => { },
  handlePagination: () => { },
});


export const AppContextProvider: React.FC = (props) => {
  const [videos, setVideos] = useState<videoDataType[]>([]);
  const [favoriteVideos, setFavoriteVideos] = useState<videoDataType[]>([]);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<showModalType>({ isShow: false, link: '' });
  const [listDisplay, setListDisplay] = useState<listDisplayType>('tiles');
  const [pagination, setPagination] = useState<paginationType>({ page: 1, itemsPerPage: 6, totalPages: 1 });

  const fetchData = async (id: string) => {
    let response: any;
    let parsedRes: any;
    for await (const [key, value] of Object.entries(contextValue.API)) {
      switch (key) {
        case 'YOUTUBE':
          try {
            response = await fetch(`${value.API_ENDPOINT}&id=${id}&key=${value.API_KEY}`);
            parsedRes = await response.json();
            if (parsedRes.items.length !== 0) return { API: key, VIDEO: normalizeVideoData({ API: key, ID: id, DATA: parsedRes }) }
          } catch (err) {
            alert(err);
          }
          break;
        case 'VIMEO':
          try {
            response = await fetch(`${value.API_ENDPOINT}${id}`, {
              headers: {
                'Authorization': `bearer ${process.env.VIMEO_TOKEN}`
              }
            });
            parsedRes = await response.json();
          } catch (err) {
            alert(err);
          };
          if (parsedRes.error) {
            alert(parsedRes.error);
          } else {
            return { API: key, VIDEO: normalizeVideoData({ API: key, ID: id, DATA: parsedRes }) };
          };
          break;
      }
    }
  }

  const normalizeVideoData = ({ API, ID, DATA }: { API: string, ID: string, DATA: any }) => {
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
          link: `https://www.youtube.com/embed/${id}`
        };
      case 'VIMEO':
        const { release_time, description, name, metadata, pictures } = DATA;
        return {
          id: ID,
          title: name,
          description: description,
          publishDate: new Date(release_time).toLocaleDateString(),
          thumbnail: pictures.sizes[3].link,
          likeCount: metadata.connections.likes.total,
          viewCount: 0,
          link: `https://player.vimeo.com/video/${ID}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=222602&amp;h=95b3d22837`
        };
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

  const removeVideoDuplicates = (actualList: videoDataType[], videosToAdd: videoDataType[]) => {
    const idArr = actualList.map((video) => video.VIDEO.id);
    return videosToAdd.filter((item) => !idArr.includes(item.VIDEO.id));
  }

  const handleLoadDefaultVideos = async () => {
    const res = await Promise.all(contextValue.defaultVideos.map(async (link) => {
      return await fetchData(getVideoID(link))
    }));
    const parsedRes = await Promise.all(res.map((item) => item));
    const actualList = getDataFromLocalStorage('videos');
    const missingVideos = removeVideoDuplicates(actualList, parsedRes);
    addDataToLocalStorage([...actualList, ...missingVideos], 'videos');
    handlePagination(1);
  }

  const handleAddVideo = async (ref: any) => {
    const id = getVideoID(ref.current.value);
    if (!id) return;
    const res = await fetchData(id);
    if (!res) return;
    const actualList = getDataFromLocalStorage('videos');
    const newVideos = removeVideoDuplicates(actualList, [res]);
    addDataToLocalStorage([...actualList, ...newVideos], 'videos');
    handlePagination(1);
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
    const actualList = getDataFromLocalStorage('videos');
    const newArr = actualList.filter((item: videoDataType) => item.VIDEO.id !== id);
    addDataToLocalStorage([...newArr], 'videos');
    handlePagination(1);
  }

  const handleInitVideoList = () => {
    const dataFavorites = getDataFromLocalStorage('favorite');
    setFavoriteVideos([...dataFavorites]);
    handlePagination(1);
  }

  const handleClearList = () => {
    localStorage.removeItem('videos');
    localStorage.removeItem('favorite');
    setFavoriteVideos([]);
    handlePagination(1);
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
  const handleShowModal = (src: string) => {
    setShowModal(prev => ({ isShow: !prev.isShow, link: src }));
  }

  const handlePagination = (pageTag: paginationHandlerType) => {
    const data: videoDataType[] = isFavorite ? getDataFromLocalStorage('favorite') : getDataFromLocalStorage('videos');
    let actualPage = pagination.page;
    let totalPages = Math.ceil(data.length / pagination.itemsPerPage)
    switch (pageTag) {
      case 'next':
        actualPage++;
        break;
      case 'prev':
        actualPage--;
        break;
      case 'first':
        actualPage = 1;
        break;
      case 'last':
        actualPage = totalPages;
        break;
      default:
        actualPage = pageTag;
        break;
    }
    const partialData = data.slice(pagination.itemsPerPage * actualPage - pagination.itemsPerPage, pagination.itemsPerPage * actualPage)
    setPagination(prev => ({ ...prev, page: actualPage, totalPages: totalPages }));
    setVideos([...partialData]);
  }

  const contextValue: AppCtx = {
    defaultVideos: ['https://www.youtube.com/watch?v=qA6oyQQTJ3I', 'https://www.youtube.com/watch?v=ZYb_ZU8LNxs', 'https://www.youtube.com/watch?v=iWEgpdVSZyg', 'https://www.youtube.com/watch?v=IJ6EgdiI_wU', 'https://www.youtube.com/watch?v=rzD-cPhq02E', 'https://www.youtube.com/watch?v=ddVm53j80vc&t=341s', 'https://www.youtube.com/watch?v=EJtmfkKulNA', 'https://www.youtube.com/watch?v=7bpQUVK9Gn4', 'https://www.youtube.com/watch?v=1r-F3FIONl8', 'https://www.youtube.com/watch?v=vP2MNhC_Igw', 'https://www.youtube.com/watch?v=KOZUdLIop48', 'https://www.youtube.com/watch?v=qQR0mfFGRmo', 'https://www.youtube.com/watch?v=zVfVLBjQuSA'],
    API: {
      YOUTUBE: {
        API_KEY: process.env.GOGGLE_API_KEY,
        API_ENDPOINT: `https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics`,
      },
      VIMEO: {
        API_KEY: '',
        API_ENDPOINT: `https://api.vimeo.com/videos/`
      }
    },
    videos: videos,
    listDisplay: listDisplay,
    pagination: pagination,
    isFavorite: isFavorite,
    showModal: showModal,
    handleLoadDefaultVideos: handleLoadDefaultVideos,
    handleAddVideo: handleAddVideo,
    handleAddToFavorites: handleAddToFavorites,
    handleRemoveVideo: handleRemoveVideo,
    handleInitVideoList: handleInitVideoList,
    handleClearList: handleClearList,
    handleSortList: handleSortList,
    handleListDisplay: handleListDisplay,
    handleShowModal: handleShowModal,
    handlePagination: handlePagination,
  }

  return <AppContext.Provider value={contextValue}>
    {props.children}
  </AppContext.Provider>
}

export default AppContext;