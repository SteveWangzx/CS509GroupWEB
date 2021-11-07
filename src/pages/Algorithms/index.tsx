import React from 'react';
interface params {
  aName: string;
}

export default function (params: params) {
  const { aName } = params;

  return <div>{aName}</div>;
}
