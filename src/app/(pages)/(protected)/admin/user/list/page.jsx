import { deleteUser, fetchUsers } from '@/actions/user';
import Card from '@/app/components/Card'
import Table from '@/app/components/Table';
import React from 'react'

const UserListPage = async () => {
  const users = await fetchUsers();
  return (
    <div>
        <Card 
            title={"Users"} 
            body={
                <Table 
                  deleteAction={deleteUser}
                  header = {["Name", "Email", "Mobile", "User Type", "ID"]}
                  rows = {users.map(user => ({
                      "Name": user.name, 
                      "Email": user.email, 
                      "Mobile": user.mobile,
                      "User Type": user.userType,
                      "ID": user._id,
                    })
                  )}
                  editAction={""}

              />
            }
        />
    </div>
  )
}

export default UserListPage;