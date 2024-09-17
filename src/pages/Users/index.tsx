import React, { useEffect, useState } from "react"
import CustomSelect from "../../components/CustomSelect/index.tsx"
import styles from './style.module.scss'
import UsersAPI from "../../api/UsersAPI.ts"

interface IUser {
    id: number,
    name: string,
}

const Users = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [selectedUser, setSelectedUser] = useState<number | null>(null);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    const getUsers = (page: number, limit: number) => {
        setLoading(true);
        UsersAPI.getUsers(page, limit)
            .then(response => {
                if (response.status <= 204) {
                    setUsers(prev => [
                        ...prev, 
                        ...response.data.data.map(user => ({
                            id: user.id,
                            name: user.first_name + ' ' + user.last_name + (user.job ? (', ' + user.job) : ''),
                        }))
                    ]);
                    setPage(page);
                }
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            })
    }

    return (
        <div className={styles['select-container']}>
            <CustomSelect 
                options={users} 
                selectedId={selectedUser} 
                onSelect={setSelectedUser}
                getMethod={getUsers}
                placeholder="User"
                page={page}
                limit={50}
                loading={loading}
            />
        </div>
    )
}

export default Users