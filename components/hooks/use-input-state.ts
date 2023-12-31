import { useDebounce } from '@/utils';
import { useState } from 'react';

const useInputState = () => {
  const [fromAt, setFromAt] = useState<any>(null);
  const [toAt, setToAt] = useState<any>(null);
  const [search, setSearch] = useState<string>('');
  const [extension, setExtension] = useState<'xlsx' | 'csv'>('xlsx');
  const initTime = fromAt?.$d?.toISOString();
  const endTime = toAt?.$d?.toISOString();

  const handleClearDate = () => {
    setFromAt(null);
    setToAt(null);
  };

  const handleChangeExtension = (event: any) => {
    setExtension(event.target.value);
  };

  const handleSetSearch = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSearch(event.target.value);
  };

  const newSearch = useDebounce(search, 500);
  return {
    fromAt,
    setFromAt,
    toAt,
    setToAt,
    search: newSearch,
    setSearch,
    extension,
    setExtension,
    initTime,
    endTime,
    handleClearDate,
    handleChangeExtension,
    handleSetSearch,
  };
};

export { useInputState };
