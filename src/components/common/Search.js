import React from 'react';
import { withRouter } from "react-router-dom";
import {API_URL, API_KEY} from "../../config";
import './Search.css';

class Search extends React.Component {
    constructor() {
        super();

        this.state = {
            searchResults: [],
            searchQuery: '',
            loading: false
        };

        this.handleRedirect = this.handleRedirect.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        const { searchQuery, loading } = this.state;
        return (
            <div className='Search'>
                <div>
                    <input
                        onChange={this.handleChange}
                        type="text"
                        className="Search-input"
                        value={searchQuery}
                    />
                </div>
                {this.renderSearchResults()}
            </div>
        );
    }

    handleRedirect(volume_id) {
        this.setState({
            searchQuery: '',
            searchResults: [],
        });

        this.props.history.push(`/volume/4050-${volume_id}`);
    }

    renderSearchResults() {
        const { searchResults, searchQuery, loading } = this.state;

        if (!searchQuery) {
            return '';
        }

        if (searchResults.length > 0) {
            console.log(searchResults);
            return (
                <div className="Search-result-container">
                    {searchResults.map(result =>
                        <div
                            key={result.id}
                            className="Search-result"
                            onClick={() => this.handleRedirect(result.id)}
                        >
                            {result.name} ({result.count_of_issues} issues) ({result.publisher.name})
                        </div>
                    )}
                </div>
            )
        }

        // Send no result, only if loading is set to false
        // To avoid showing no result, when actually there are ones
        if (!loading) {
            return (
                <div className="Search-result-container">
                    <div className="Search-no-result">
                        No results found.
                    </div>
                </div>
            )
        }
    }

    handleChange(e) {
        const searchQuery = e.target.value;
        this.setState({ searchQuery });
        if (!searchQuery) {
            return false;
        }
        this.setState({ loading: true });
        fetch(`${API_URL}/search/?api_key=${API_KEY}&format=json&resources=volume&query=${searchQuery}`)
            .then(response => {
                return response.json().then(json => {
                    return response.ok ? json : Promise.reject(json);
                });
            })
            .then((result) => {
                console.log(result.results);
                this.setState({
                    searchResults: result.results,
                    loading: false,
                });
            });
    }


}

export default withRouter(Search);
