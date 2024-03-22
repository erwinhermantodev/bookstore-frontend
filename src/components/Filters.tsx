import React, { useState } from "react";

interface Props {
  onFilterChange: (tags: string[]) => void;
}

const Filters: React.FC<Props> = ({ onFilterChange }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedTags([...selectedTags, value]);
    } else {
      setSelectedTags(selectedTags.filter((tag) => tag !== value));
    }
    onFilterChange(selectedTags);
  };

  return (
    <div>
      <label>
        <input type="checkbox" value="fiction" onChange={handleTagChange} />{" "}
        Fiction
      </label>
      <label>
        <input type="checkbox" value="non-fiction" onChange={handleTagChange} />{" "}
        Non-fiction
      </label>
      {/* Add more checkboxes for other tags */}
    </div>
  );
};

export default Filters;
