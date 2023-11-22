'use client';

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation';

import Profile from '@components/Profile';


const UserProfile = () => {
  const [posts, setPosts] = useState([]);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const name = posts[0]?.creator.username;



    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(`api/users/${id}/posts`);
          const data = await res.json();
          setPosts(data);
        };
        if (id) fetchPosts();
      }, []);

    return (
      <Profile
        name={name}
        desc={`Welcome to ${name} profile page`}
        data={posts}
        handleEdit={() => {}}
        handleDelete={() => {}}
      />
    );
}

export default UserProfile;