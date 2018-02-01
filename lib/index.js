'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var FileInput = function FileInput(props) {
  var as = props.as,
      style = props.style,
      onChange = props.onChange,
      children = props.children,
      restProps = _objectWithoutProperties(props, ['as', 'style', 'onChange', 'children']);

  var _reactFileReaderInput = null;

  var handleChange = function handleChange(e) {
    var files = [];
    for (var i = 0; i < e.target.files.length; i++) {
      // Convert to Array.
      files.push(e.target.files[i]);
    }

    // Build Promise List, each promise resolved by FileReader.onload.
    Promise.all(files.map(function (file) {
      return new Promise(function (resolve, reject) {
        var reader = new FileReader();

        reader.onload = function (result) {
          // Resolve both the FileReader result and its original file.
          resolve([result, file]);
        };

        // Read the file with format based on props.as.
        switch ((as || 'url').toLowerCase()) {
          case 'binary':
            {
              reader.readAsBinaryString(file);
              break;
            }
          case 'buffer':
            {
              reader.readAsArrayBuffer(file);
              break;
            }
          case 'text':
            {
              reader.readAsText(file);
              break;
            }
          case 'url':
            {
              reader.readAsDataURL(file);
              break;
            }
        }
      });
    })).then(function (zippedResults) {
      // Run the callback after all files have been read.
      onChange(e, zippedResults);
    });
  };

  var triggerInput = function triggerInput(e) {
    _reactDom2.default.findDOMNode(_reactFileReaderInput).click();
  };

  var hiddenInputStyle = children ? {
    // If user passes in children, display children and hide input.
    position: 'absolute',
    top: '-9999px'
  } : {};

  return _react2.default.createElement(
    'div',
    { className: '_react-file-reader-input', onClick: triggerInput, style: style },
    _react2.default.createElement('input', _extends({}, restProps, { type: 'file',
      onChange: handleChange, ref: function ref(c) {
        return _reactFileReaderInput = c;
      },
      onClick: function onClick() {
        _reactFileReaderInput.value = null;
      },
      style: hiddenInputStyle })),
    children
  );
};
exports.default = FileInput;