"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var react_1 = require("react");
var antd_1 = require("antd");
var styled_components_1 = require("styled-components");
var classnames_1 = require("classnames");
var store_1 = require("store");
var getItemValue = function (item) { return item.key || item.value || item.dataIndex; };
var STORAGE_KEY = 'columnFilter';
var StyledFilterBtn = styled_components_1["default"](antd_1.Button)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  /* padding: 0 !important;\n  width: 40px !important;\n  height: 40px !important;\n  display: flex !important;\n  justify-content: center;\n  align-items: center;\n  border: none !important;\n  background: #014F89;\n  &.hasFilter {\n    background: #014F89 !important;\n  } */\n"], ["\n  /* padding: 0 !important;\n  width: 40px !important;\n  height: 40px !important;\n  display: flex !important;\n  justify-content: center;\n  align-items: center;\n  border: none !important;\n  background: #014F89;\n  &.hasFilter {\n    background: #014F89 !important;\n  } */\n"])));
var CustomColumn = (function (_super) {
    __extends(CustomColumn, _super);
    function CustomColumn(props) {
        var _this = _super.call(this, props) || this;
        _this.componentDidMount = function () {
            _this.initColumns();
        };
        _this.initColumns = function () {
            var _a = _this.props, _b = _a.data, data = _b === void 0 ? [] : _b, _c = _a.onChange, onChange = _c === void 0 ? function () { } : _c;
            var columnFilter = store_1["default"].get(STORAGE_KEY) || {};
            var values = columnFilter[_this.props.columnKey || _this.KEY];
            var result = [];
            if (values instanceof Array) {
                result = data.filter(function (item) { return !values.includes(getItemValue(item)); });
            }
            else {
                result = data.filter(function (item) { return !item.hide; });
            }
            var defaultValue = [];
            result.forEach(function (col) {
                if (!col.unfilter) {
                    defaultValue.push(getItemValue(col));
                }
            });
            _this.setState({
                value: defaultValue,
                hideValue: values instanceof Array ? values : []
            });
            onChange(result, defaultValue);
        };
        _this.setStorage = function (values) {
            var columnFilter = store_1["default"].get(STORAGE_KEY) || {};
            columnFilter[_this.props.columnKey || _this.KEY] = values;
            store_1["default"].set(STORAGE_KEY, columnFilter);
        };
        _this.handleChange = function (value) {
            var _a = _this.props.data, data = _a === void 0 ? [] : _a;
            var showedCol = [];
            var hideValue = [];
            data.forEach(function (item) {
                if (item.unfilter || value.includes(getItemValue(item))) {
                    showedCol.push(item);
                }
                else {
                    hideValue.push(getItemValue(item));
                }
            });
            _this.setState({
                value: value,
                hideValue: hideValue
            });
            _this.props.onChange(showedCol, value);
            _this.setStorage(hideValue);
        };
        _this.dropDownContent = function () {
            var _a = _this.props.data, data = _a === void 0 ? [] : _a;
            var _b = _this.state.value, value = _b === void 0 ? [] : _b;
            var showedList = data.filter(function (item) { return !item.unfilter; });
            return (react_1["default"].createElement(antd_1.Checkbox.Group, { onChange: _this.handleChange, value: value }, showedList.map(function (item, index) {
                var value = getItemValue(item);
                var label = item.label || item.title;
                var disabled = !!item.disabled;
                return (react_1["default"].createElement("div", { key: value },
                    react_1["default"].createElement(antd_1.Checkbox, { style: { whiteSpace: 'nowrap' }, value: value, disabled: disabled }, label)));
            })));
        };
        _this.checkHasFilter = function () {
            var showedList = _this.props.data.filter(function (item) { return !item.unfilter; });
            var value = _this.state.value;
            return value.length < showedList.length;
        };
        _this.KEY = window.location.pathname;
        _this.state = {
            KEY: _this.KEY,
            value: [],
            hideValue: [],
            columnKey: ''
        };
        return _this;
    }
    CustomColumn.getDerivedStateFromProps = function (nextProps, prevState) {
        var data = nextProps.data, onChange = nextProps.onChange, columnKey = nextProps.columnKey;
        var columnKeyInState = prevState.columnKey, KEY = prevState.KEY;
        if (columnKey !== columnKeyInState) {
            var columnFilter = store_1["default"].get(STORAGE_KEY) || {};
            var hideValue_1 = columnFilter[columnKey || KEY] || [];
            var showedCol_1 = [];
            data.forEach(function (item) {
                if (item.unfilter || (!hideValue_1.includes(getItemValue(item)) && !item.hide)) {
                    showedCol_1.push(item);
                }
            });
            var showedColValue = showedCol_1.map(function (item) { return getItemValue(item); });
            onChange(showedCol_1, showedColValue);
            return {
                value: showedColValue,
                hideValue: hideValue_1,
                columnKey: columnKey
            };
        }
        return null;
    };
    CustomColumn.prototype.render = function () {
        var children = this.props.children;
        return (react_1["default"].createElement(antd_1.Popover, { trigger: 'click', content: this.dropDownContent(), overlayClassName: 'column-filter' }, children || (react_1["default"].createElement(StyledFilterBtn, { className: classnames_1["default"]({
                hasFilter: this.checkHasFilter()
            }) }, "Toggle"))));
    };
    return CustomColumn;
}(react_1.Component));
exports["default"] = CustomColumn;
var templateObject_1;
