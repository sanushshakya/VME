import axios from "axios";

const getUsers = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/categories/read");
    console.log(response.data) 
  } catch (error) {
    console.error(error);
  }
}
getUsers();