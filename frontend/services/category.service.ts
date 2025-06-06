import axios from "axios";
import { Category } from "@/types/category";

// Gọi API lấy danh sách danh mục
export const fetchCategories = async (token?: string): Promise<Category[]> => {
  try {
    const response = await axios.get("http://localhost:5000/api/categories", {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });

    if (!response.data) {
      throw new Error("No category data found");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
