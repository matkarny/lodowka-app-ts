import * as React from 'react';
import YoutubeAPI from './YoutubeAPI';
import './YoutubeWidget.scss'

export interface YoutubeWidgetProps { }

export interface YoutubeWidgetState {
    videoId: string,
    thumbnailSrc: string
}

class YoutubeWidget extends React.Component<YoutubeWidgetProps, YoutubeWidgetState> {
    state = {
        videoId: '',
        thumbnailSrc: ''
    }
    downloadVideo = () => {
        YoutubeAPI.getLatestVideo()

            .then(resp => {
                const data = {
                    thumbnailSrc: resp.data.items[0].snippet.thumbnails.high.url,
                    videoId: resp.data.items[0].id.videoId
                }
                return data;
            }
            )
            .then(data => this.setState(
                {
                    videoId: data.videoId,
                    thumbnailSrc: data.thumbnailSrc,
                })
            )
            .catch(e => console.log(e))
    }
    componentDidMount() {
        this.downloadVideo();
    }
    render() {
        return (
            <div className='youtube-widget__container'>
                <a href={`http://www.youtube.com/embed/${this.state.videoId}`}>
                    <img className='youtube-widget__thumbnail' src={this.state.thumbnailSrc} alt="Miniatura filmu YouTube" />
                </a>
                {/* <iframe className="youtube-widget__player"
                    title="youtube-tasty"
                    src={`http://www.youtube.com/embed/${this.state.videoId}`}
                    width='420'
                    height='190'
                    frameBorder="0"
                    allowFullScreen
                /> */}
            </div>
        )
    }
}

export default YoutubeWidget;
