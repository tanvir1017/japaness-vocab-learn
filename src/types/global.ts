export type TLesson = {
  _id: string;
  user: string;
  title: string;
  lessonNo: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TVocabulary = {
  _id: string;
  user: string;
  lesson: TLesson;
  word: string;
  pronunciation: string;
  meaning: string;
  whenToSay: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TMetaApiResponse = {
  data: {
    success: boolean;
    message: string;
    meta: { totalPage: number; countDocs: number; page: number; limit: number };
    result: TVocabulary[];
  };
};
