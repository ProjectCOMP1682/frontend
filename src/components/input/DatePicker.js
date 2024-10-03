import React, { Component } from "react";
import Flatpickr from "react-flatpickr"; // Make sure to install this package
import moment from "moment"; // Make sure to install this package
import "flatpickr/dist/flatpickr.css"; // Import Flatpickr CSS

class DatePicker extends Component {
    flatpickrNode = null;

    nodeRef = (element) => {
        this.flatpickr = element && element.flatpickr;
        this.flatpickrNode = element && element.node;

        if (this.flatpickrNode) {
            this.flatpickrNode.addEventListener("blur", this.handleBlur);
            this.flatpickrNode.addEventListener("keydown", this.handleKeyDown);
        }
    };

    componentWillUnmount() {
        if (this.flatpickrNode) {
            this.flatpickrNode.removeEventListener("blur", this.handleBlur);
            this.flatpickrNode.removeEventListener("keydown", this.handleKeyDown);
        }
    }

    handleKeyDown = (event) => {
        const keyCode = event.which || event.keyCode;
        if (keyCode === 13) { // ENTER key
            event.preventDefault();
            const { onChange } = this.props;
            const value = event.target.value;
            const valueMoment = moment(value, "DD/MM/YYYY");
            onChange([valueMoment.toDate(), valueMoment.toDate()]);
        }
    };

    handleBlur = (event) => {
        const { onChange } = this.props;
        const value = event.target.value;
        const valueMoment = moment(value, "DD/MM/YYYY");
        onChange([valueMoment.toDate(), valueMoment.toDate()]);
    };

    onOpen = () => {
        if (this.flatpickrNode) {
            this.flatpickrNode.blur();
        }
    };

    checkDateValue = (str, max) => {
        if (str.charAt(0) !== "0" || str === "00") {
            let num = parseInt(str);
            if (isNaN(num) || num <= 0 || num > max) num = 1;
            str = num > parseInt(max.toString().charAt(0)) && num.toString().length === 1 ? "0" + num : num.toString();
        }
        return str;
    };

    autoFormatOnChange = (value, separator) => {
        let input = value;

        // Remove unnecessary separators
        if (/\D\/$/.test(input)) input = input.substr(0, input.length - 3);

        let values = input.split(separator).map((v) => v.replace(/\D/g, ""));
        if (values[0]) values[0] = this.checkDateValue(values[0], 31);
        if (values[1]) values[1] = this.checkDateValue(values[1], 12);

        const output = values.map((v, i) => (v.length === 2 && i < 2 ? v + " " + separator + " " : v));
        return output.join("").substr(0, 14);
    };

    onInputChange = (e) => {
        const converted = this.autoFormatOnChange(e.target.value, this.SEPARATOR);
        e.target.value = converted;
    };

    // Constants
    SEPARATOR = "/";
    DISPLAY_FORMAT = "d/m/Y"; // Format for display

    render() {
        const { value, onChange, minDate, onClose, ...otherProps } = this.props;
        const options = {
            dateFormat: this.DISPLAY_FORMAT,
            allowInput: true,
            disableMobile: true,
            onClose: onClose,
            onOpen: this.onOpen,
            minDate: minDate,
        };

        return (
            <Flatpickr
                ref={this.nodeRef}
                value={value}
                onChange={onChange}
                options={options}
                {...otherProps}
            />
        );
    }
}

export default DatePicker;
