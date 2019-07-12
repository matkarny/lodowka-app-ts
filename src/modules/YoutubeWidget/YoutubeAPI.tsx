import axios from 'axios';
import { YOUTUBE_API_KEY } from '../../common/constants/API_Keys';
import { BASE_URL, CHANNEL_ID } from '../../common/constants/YoutubeConstants';

class YouTubeAPI {
    getLatestVideo() {
        return axios.get(BASE_URL, {
            params: {
                part: 'snippet',
                channelId: CHANNEL_ID,
                maxResults: 1,
                order: 'date',
                key: YOUTUBE_API_KEY
            }
        });
    }
}

const youtubeAPI = new YouTubeAPI();

export default youtubeAPI;