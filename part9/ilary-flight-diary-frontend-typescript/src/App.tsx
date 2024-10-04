import { useEffect, useState } from 'react';
import { DiaryEntry } from './types';
import { getDiaries } from './services/diaryService';
import DiaryCard from './components/DiaryCard';
import DiaryForm from './components/DiaryForm';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  useEffect(() => {
    getDiaries().then((diaries) => setDiaries(diaries));
  }, []);
  return (
    <>
      <h1>Flight diary </h1>
      <DiaryForm
        onSuccessfullDiarySave={(newDiary) =>
          setDiaries([...diaries, newDiary])
        }
      ></DiaryForm>
      <h2>Diary entries</h2>
      {diaries.map((diary) => (
        <DiaryCard key={diary.id} diary={diary}></DiaryCard>
      ))}
    </>
  );
}

export default App;
