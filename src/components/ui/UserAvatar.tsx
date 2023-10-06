import Avatar from '@mui/material/Avatar';
import { User } from '@prisma/client';
import { SessionProviderProps } from 'next-auth/react';

interface UserAvatarProps extends SessionProviderProps {
    user: Pick<User, 'image' | 'name'>;
}

const UserAvatar = ({ user, ...props }: UserAvatarProps) => {
    return <>{user.image ? <Avatar {...props} src={user.image} /> : <Avatar {...props}>{user.name}</Avatar>}</>;
};

export default UserAvatar;
