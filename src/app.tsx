import React from 'react';
import RightContent from './components/RightContent';
import SearchForm from '@/components/RightContent/SearchForm';

export const layout = () => {
  return {
    rightRender: () => <RightContent />,
    menuRender: false,
  };
};
