import React from 'react';
import ReactDOM from 'react-dom';

const FileInput = props => {
  let _reactFileReaderInput = null;

  const handleChange = e => {
    const files = [];
    for (let i = 0; i < e.target.files.length; i++) {
      // Convert to Array.
      files.push(e.target.files[i]);
    }

    // Build Promise List, each promise resolved by FileReader.onload.
    Promise.all(files.map(file => new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = result => {
        // Resolve both the FileReader result and its original file.
        resolve([result, file]);
      };

      // Read the file with format based on props.as.
      switch ((props.as || 'url').toLowerCase()) {
        case 'binary': {
          reader.readAsBinaryString(file);
          break;
        }
        case 'buffer': {
          reader.readAsArrayBuffer(file);
          break;
        }
        case 'text': {
          reader.readAsText(file);
          break;
        }
        case 'url': {
          reader.readAsDataURL(file);
          break;
        }
      }
    })))
    .then(zippedResults => {
      // Run the callback after all files have been read.
      props.onChange(e, zippedResults);
    });
  }

  const triggerInput = e => {
    ReactDOM.findDOMNode(_reactFileReaderInput).click();
  }

  const hiddenInputStyle = props.children ? {
    // If user passes in children, display children and hide input.
    position: 'absolute',
    top: '-9999px'
  } : {};

  const {as, style, children, ...restProps} = props;

  return (
    <div className="_react-file-reader-input" onClick={triggerInput} style={style}>
      <input {...restProps} type="file"
             onChange={handleChange} ref={c => _reactFileReaderInput = c}
             onClick={() => {_reactFileReaderInput.value = null;}}
             style={hiddenInputStyle}/>
      {children}
    </div>
  );
}
export default FileInput;
