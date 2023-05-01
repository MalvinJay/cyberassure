import React, { useState } from "react";
import { Input } from "antd";

const { Search } = Input;
const SearchUsers = () => {
  const [loading, setloading] = useState(false);

  const onSearch = (value) => {
    console.log(value);
    setloading(true);

    setTimeout(() => {
        setloading(false);
    }, 2000);
  }

  return (
    <Search
      placeholder="Search Users..."
      allowClear
      onSearch={onSearch}
      size="large"
      loading={loading}
      style={{
        width: 400,
      }}
    />
  );
};

export default SearchUsers;
