/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { getUsers } from '../features/allUsers';
import SingleUserCard from '../components/singleUserCard/singleUserCard';

function AllUserPage() {
  const disp = useDispatch();
  const { data, isSuccess } = useSelector((state) => state.data);

  const [isloaded, setisLoaded] = useState(false);

  useEffect(() => {
    disp(getUsers());
    if (isSuccess) {
      setisLoaded(true);
    }
  }, [isSuccess]);

  return (
    <>
      {isloaded
        ? data.users.map((user) => <Button key={user._id}>{user.username}</Button>) : ''}
    </>

  );
}

export default AllUserPage;
