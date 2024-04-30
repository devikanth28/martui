import React from "react";
import { Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import Validate from "../../../../../helpers/Validate";

const MetaConfigurationScreen = ({ screen, suggestions, title, keywords, description, setDescription, setKeywords, setTitle, metaKey, setMetaKey, metaInput, setMetaInput,suggestionsLoading,prepareMetaKey }) => {
    const validate = Validate();

    const handleSuggestionsChange = (e) => {
        setMetaKey(e[0]);
    }

    const handleInputChange = (e) => {
        setMetaInput(e.target.value);
    }


    return (
        <React.Fragment>
            <p>{screen.title}</p>
            {<div className="d-flex justify-content-start align-items-center">
                {!screen.search &&
                    <React.Fragment>
                        <div className="col-sm-5 px-0">
                            <Form.Group>
                                <Typeahead
                                    id="basic-typeahead-single"
                                    labelKey={option => `${option} ${prepareMetaKey(option) !=option ? `( ${prepareMetaKey(option)} )`: ''}`}
                                    onChange={(e) => { handleSuggestionsChange(e); }}
                                    options={suggestions && suggestions[screen.metaType] ? suggestions[screen.metaType] : [] }
                                    placeholder={screen.placeholder}
                                    selected={ metaKey ? [metaKey] : []}
                                    isLoading={suggestionsLoading}
                                    onKeyDown={event => { 
                                        if (event.key === 'Enter') {
                                            handleSuggestionsChange(event);
                                        }
                                    }}
                                    clearButton
                                />
                            </Form.Group>
                        </div>
                    </React.Fragment>
                }

                {screen.search && screen.search == 'manual' &&
                    <React.Fragment>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" onChange={(e) => handleInputChange(e)} value={metaInput} placeholder={screen.placeholder} aria-label="search" aria-describedby="search" />
                            <div class="input-group-append">
                                <span class="input-group-text pointer"  onClick={() => setMetaKey(metaInput)} id="basic-addon2">search</span>
                            </div>
                        </div>
                    </React.Fragment>
                }
            </div>}

            <React.Fragment>
                <div className="my-3 each-group has-float-label">
                    <input id="title" className="form-control" disabled={validate.isEmpty(metaKey)} value={title} onChange={(e) => setTitle(e.target.value)} name="title" placeholder=" " type="input" maxLength={70} />
                    <label for="title">
                        Title
                    </label>
                    <small>Max characters allowed 70</small>
                </div>
                <div className="each-group has-float-label mb-3">
                    <input id="keywords" className="form-control" disabled={validate.isEmpty(metaKey)} value={keywords} onChange={(e) => setKeywords(e.target.value)} name="keywords" placeholder=" " type="input" maxLength={180} />
                    <label for="keywords">
                        Keywords
                    </label>
                    <small>Max characters allowed 180</small>
                </div>
                <div className="each-group has-float-label mb-3">
                    <textarea rows={1} id="description" className="form-control" disabled={validate.isEmpty(metaKey)} value={description} onChange={(e) => setDescription(e.target.value)} name="description" placeholder=" " type="input" maxLength={160} />
                    <label for="description">
                        Description
                    </label>
                    <small>Max characters allowed 160</small>
                </div>
            </React.Fragment>
        </React.Fragment>
    );
}
export default MetaConfigurationScreen;