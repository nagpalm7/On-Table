"use client";

import { fetchUserById, updateUser } from '@/actions/user';
import Card from '@/app/components/Card'
import Spinner from '@/app/components/Spinner';
import UserForm from '@/app/components/UserForm'
import { useParams } from 'next/navigation';
import React, { useActionState, useEffect, useState } from 'react'

const EditUser = () => {
  const [state, action, isPending] = useActionState(updateUser, undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [initialState, setInitialState] = useState({});
  const params = useParams();

  const id = params.id;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const user = await fetchUserById(id);
      setInitialState({
        name: user?.name,
        email: user?.email,
        mobile: user?.mobile,
        userType: user?.userType        
      })
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading || isPending) {
    return <Spinner />
  }

  return (
    <div>
      <Card
        title={"Edit User"}
        body={
          <UserForm
            state={state ? state : initialState}
            action={action}
            isPending={isPending}
            buttonText="Edit User"
            allowPasswordUpdate={false}
            id={id}
          />
        }
      />
    </div>
  )
}

export default EditUser