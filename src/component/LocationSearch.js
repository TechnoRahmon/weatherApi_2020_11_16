import React from 'react';

  import LocationSearch from 'react-google-places-autocomplete'
  import { geocodeByPlaceId } from 'react-google-places-autocomplete';
  import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';

  class LocationSearchInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = { address: '' };
    }
   x = 0;
   
    handleChange = address => {
        this.x=0
      this.setState({ address });
    };
   
    handleSelect = address => {
      geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => this.props.CallWeather(latLng))
        .catch(error => new Error(error));
    };


   
    render() {
        
      return (
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div className="search-box">
              <input
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    
                    {suggestions.map(suggestion => {
                                this.x++

                        const className = suggestion.active
                            ? 'suggestion-item--active item'
                            : 'suggestion-item item';

                        // inline style for demonstration purpose
                        const style = suggestion.active
                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                        return (
                            <div key={this.x}
                            {...getSuggestionItemProps(suggestion, {
                                className,
                                
                                
                            })}
                            >
                            <span>{suggestion.description}</span>
                            </div>
                        );
                    })}
              </div>
            </div>
          )}

        </PlacesAutocomplete>
      );
    }
  }
export default LocationSearchInput;