export const createPost = async () => {
  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      {
        title: "New Title",
        body: "React Native API Example",
        userId: 1,
      }
    );

    console.log("POST Response:", response.data);
  } catch (error) {
    console.log("Error:", error);
  }
};

export const updatePost = async () => {
  try {
    const response = await axios.put(
      "https://jsonplaceholder.typicode.com/posts/1",
      {
        title: "Updated Title",
        body: "Updated body",
      }
    );

    console.log("Updated:", response.data);
  } catch (error) {
    console.log(error);
  }
};


export const deletePost = async () => {
  try {
    await axios.delete("https://jsonplaceholder.typicode.com/posts/1");
    console.log("Deleted successfully");
  } catch (error) {
    console.log(error);
  }
};

