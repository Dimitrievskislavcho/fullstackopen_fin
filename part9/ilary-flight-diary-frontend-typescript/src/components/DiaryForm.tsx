import { useState } from 'react';
import { DiaryFormProps, NewDiaryEntry, Visibility, Weather } from '../types';
import { saveDiary } from '../services/diaryService';
import { AxiosError } from 'axios';

const emptyFormData = {
  comment: '',
  date: '',
  visibility: '' as Visibility,
  weather: '' as Weather,
};

const DiaryForm = ({ onSuccessfullDiarySave }: DiaryFormProps) => {
  const [formData, setFormData] = useState<NewDiaryEntry>(emptyFormData);
  const [error, setError] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const visibilityValues = Object.values(Visibility);
  const weatherValues = Object.values(Weather);

  const addNewDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const savedDiary = await saveDiary(formData as NewDiaryEntry);
      onSuccessfullDiarySave(savedDiary);
      setFormData(emptyFormData);
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.response?.data);
      } else {
        setError((e as Error).message);
      }
    }
  };

  return (
    <>
      <h2>Add new entry</h2>
      {error && (
        <div style={{ marginBottom: '10px', color: 'red' }}>{error}</div>
      )}
      <form onSubmit={addNewDiary}>
        <label htmlFor='date'>
          date
          <input
            type='date'
            name='date'
            required={true}
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          ></input>
        </label>
        <br />
        <label>
          visibility{' '}
          {visibilityValues.map((visibility) => (
            <label htmlFor={`visibility-id-${visibility}`}>
              {visibility}
              <input
                id={`visibility-id-${visibility}`}
                type='radio'
                name='visibility'
                required={true}
                value={visibility}
                checked={visibility === formData.visibility}
                onChange={() =>
                  setFormData({
                    ...formData,
                    visibility,
                  })
                }
              />
            </label>
          ))}
        </label>
        <br />
        <label>
          weather{' '}
          {weatherValues.map((weather) => (
            <label htmlFor={`weather-id-${weather}`}>
              {weather}
              <input
                id={`weather-id-${weather}`}
                type='radio'
                name='weather'
                required={true}
                value={weather}
                checked={weather === formData.weather}
                onChange={() =>
                  setFormData({
                    ...formData,
                    weather,
                  })
                }
              />
            </label>
          ))}
        </label>
        <br />
        <label htmlFor='comment'>
          comment
          <input
            type='comment'
            required={true}
            value={formData.comment}
            onChange={(e) =>
              setFormData({ ...formData, comment: e.target.value })
            }
          ></input>
        </label>
        <br />
        <button type='submit'>add</button>
      </form>
    </>
  );
};

export default DiaryForm;
