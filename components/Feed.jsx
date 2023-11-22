'use client';

import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({data, handleTagClick}) => {
  return (<div className='mt-16 prompt_layout'>
    {data?.map((post) => (
      <PromptCard
        key={post._id}
        post={post}
        handleTagClick={handleTagClick} />
    ))}
  </div>)
}

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState();

  const handleSearchChange = (e) => {
    const normalizedFilter = e.target.value.toLowerCase();
    setSearchText(normalizedFilter);

    const filterFunction = (post) => {
      const promptMatch = post.prompt.toLowerCase().includes(normalizedFilter);
      const tagMatch = post.tag.toLowerCase().includes(normalizedFilter);
      return promptMatch || tagMatch;
    };

    const filteredData = posts?.filter(filterFunction);
    setFilteredPosts(filteredData);
  }

  const handleTagClick = (tag) => {
    setSearchText(tag)
  }

  useEffect(() => {
    const fetchPosts = async ()=>{
      const res = await fetch("api/prompt");
      const data = await res.json();
      setPosts(data);
    }
    fetchPosts();
  },[])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={filteredPosts ?? posts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
}

export default Feed