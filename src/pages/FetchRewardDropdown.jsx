import React from "react";
import Select from "react-select";

export default function FetchRewardDropdown(props) {
    const options = props.data && props.data.map(data => {
        return {value: data, label: data}
    });

    return (
        <div className="dropdown-container">
            <Select 
                options={options} 
                isSearchable={true} 
                {...props}
            />
        </div>
    );
}