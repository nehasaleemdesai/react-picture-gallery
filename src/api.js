import axios from "axios";

const searchImages = async (term, page) => {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    headers: {
      Authorization: "Client-ID 8O50V7bNzfKdVixwS9W9nZVdr0VnrCv9gmeimfdvp6Y",
    },
    params: {
      query: term,
      page: page,
    },
  });

  return response.data.results;
};

export default searchImages;
