import React from 'react';
import SearchBar from './SearchBar';
import youtube from './../apis/youtube';
import VideoList from './VideoList';
import VideoDeatil from './VideoDetail';

class App extends React.Component {
    state = { videos: [], selectedVideo: null };
    componentDidMount(){
        this.onTermSubmit('explore chitkara university');
    }



    onTermSubmit = async (term) => {
        const response = await youtube.get('/search', {
            params: {
                part: 'snippet',
                maxResults: '20',
                key: 'AIzaSyCkZsrPkCGyEpfMesfSKDP68YibWwpsrO4',
                q: term,
            }
        });
        this.setState({ 
            videos: response.data.items,
            selectedVideo: response.data.items[0]
         });

    };


    onVideoSelect = (video) => {
        this.setState({ selectedVideo: video });
    };
    render() {
        return (
            <div className="ui container">
                <SearchBar thisIsOnFormSubmit={this.onTermSubmit} />
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDeatil video={this.state.selectedVideo} />
                        </div>
                        <div className="five wide column">
                            <VideoList
                                onVideoSelect={this.onVideoSelect}
                                videos={this.state.videos}
                            />
                        </div>
                    </div>
                </div>





            </div>
        );
    }
}

export default App;