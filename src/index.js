import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import  VideoList from './components/video_list';
import { ytkey } from './hiddenFile';
import VideoDetail from './components/video_detail';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            videos: [],
            selectedVideo: null
        };
       this.videoSearch('surfboards');
    }

    videoSearch(term) {
        YTSearch({ key: ytkey, term: term }, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList 
                onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                videos={this.state.videos} />
            </div>
        );
    }
}


// App is the class and <App/> is the instance. the second
// argument tells where to render that component.  (.container)
ReactDOM.render(<App/>, document.querySelector('.container'));