import axios from 'axios';
const baseURL: string = 'https://www.googleapis.com/youtube/v3/search';
const channelId: string = "UCJFp8uSYCjXOMnkUyb3CQ3Q";
const KEY: string = 'AIzaSyCjBzVjwrmOT5Nbx53stl9EBJihjQuyiWo';

class YouTubeAPI {
    getLatestVideo() {
        return axios.get(baseURL, {
            params: {
                part: 'snippet',
                channelId,
                maxResults: 1,
                order: 'date',
                key: KEY
            }
        });
    }
}

const youtubeAPI = new YouTubeAPI();

export default youtubeAPI;