export type normalizeVideoDataType = {
  id: string,
  title: string,
  description: string,
  publishDate: string,
  thumbnail: string,
  likeCount: string,
  viewCount: string,
  link: string,
}

export type videoDataType = {
  API: string,
  VIDEO: normalizeVideoDataType,
}

export type showModalType = {
  isShow: boolean,
  link: string,
}

export type localStorageTagType = 'videos' | 'favorite';
export type listDisplayType = 'list' | 'tiles';
export type paginationType = { page: number, itemsPerPage: number, totalPages: number };
export type paginationHandlerType = number | 'next' | 'prev' | 'first' | 'last';