/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../features/allUsers';
import SingleUserCard from '../components/singleUserCard/singleUserCard';

function AllUserPage() {
  const disp = useDispatch();
  const { data } = useSelector((state) => state.data);

  useEffect(() => {
    disp(getUsers());
  }, []);

  return (
    <div>{JSON.stringify(data)}</div>

  );
}

export default AllUserPage;
