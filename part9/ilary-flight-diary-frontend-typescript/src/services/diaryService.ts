import axios from 'axios';
import { BASE_API_URL } from '../constants';
import { DiaryEntry, NewDiaryEntry } from '../types';

const getDiaries = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get<DiaryEntry[]>(`${BASE_API_URL}/diaries`);
  return response.data;
};

const saveDiary = async (newDiary: NewDiaryEntry): Promise<DiaryEntry> => {
  const diary = await axios.post<DiaryEntry>(
    `${BASE_API_URL}/diaries`,
    newDiary
  );
  return diary.data;
};

export { getDiaries, saveDiary };
