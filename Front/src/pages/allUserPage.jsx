/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { getUsers, reset } from '../features/allUsers';
import { UsersCardGrid } from '../components/singleUserCard/styled';
import SingleUserCard from '../components/singleUserCard/singleUserCard';

function AllUserPage() {
  const disp = useDispatch();
  const { users, isSuccess } = useSelector((state) => state.data);
  const [isloaded, setisLoaded] = useState(false);

  useEffect(() => {
    disp(getUsers());
    return () => disp(reset());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setisLoaded(true);
    }
    return () => disp(reset());
  }, [isSuccess]);

  return (
    <UsersCardGrid>
      {isloaded
        ? users.users.map((user) => <SingleUserCard key={user._id} {...user} />) : ''}
    </UsersCardGrid>

  );
}

export default AllUserPage;
