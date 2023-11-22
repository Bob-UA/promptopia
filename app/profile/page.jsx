'use client';

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';


const MyProfile = () => {
  const router = useRouter();
    const { data: session } = useSession();

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(`api/users/${session?.user.id}/posts`);
          const data = await res.json();
          setPosts(data);
        };
        if (session?.user.id) fetchPosts();
      }, []);

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
      const hasConfirmet = confirm("Are you sure you want to delete this prompt?");

      if (hasConfirmet) {
        try {
          await fetch(`/api/prompt/${post._id}`, {
            method: 'DELETE'
          });
        
          const filteredPosts = posts.filter((p) => p._id !== post._id);

          setPosts(filteredPosts);
        } catch (error) {
          console.log(error);
        }
      }
    }

    return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

export default MyProfile;