import AxiosClient from ".";

export const getArticles = async (params = {}) => {
    const query = Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
    try {
        const response = await AxiosClient.get(`api/posts/article?${query}`);
        return response.data;
    } catch (e) {
        throw new Error("서버가 무언가 이상합니다");
    }
};
