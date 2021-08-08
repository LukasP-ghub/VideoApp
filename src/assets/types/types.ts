export type normalizeVideoDataType = {
  id: string,
  title: string,
  description: string,
  publishDate: string,
  thumbnail: string,
  likeCount: string,
  viewCount: string,
}

export type videoDataType = {
  API: string,
  VIDEO: normalizeVideoDataType,
}

export type localStorageTagType = 'videos' | 'favorite';