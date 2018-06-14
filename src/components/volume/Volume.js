import React from 'react';
import {API_URL, API_KEY} from '../../config';
import Loading from '../common/Loading';

class Volume extends React.Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            volume: {}
        }
    }

    componentWillMount() {
        const {volume_id} = this.props.match.params;
        this.fetchVolume(volume_id);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (this.props.location.pathname !== nextProps.location.pathname) {
            // Get volume_id from new url params
            const volumeId = nextProps.match.params.volume_id;
            // Fetch volume
            this.fetchVolume(volumeId);
        }
    }

    render() {
        if (this.state.loading) {
            return <div className="loading-container"><Loading/></div>
        }

        return (
            <div className="loading-results">{this.state.volume.name}</div>
        )
    }

    fetchVolume(volume_id) {
        this.setState({loading: true});

        fetch(`${API_URL}/volume/${volume_id}/?api_key=${API_KEY}&format=json&field_list=issues,description,name`)
            .then(response => {
                return response.json().then(json => {
                    return response.ok ? json : Promise.reject(json);
                });
            })
            .then((data) => {
                this.setState({
                    loading: false,
                    volume: data.results
                });
            })
            .catch((error) => {
                this.setState({
                   loading: false
                });
            });
    }
}

export default Volume;
