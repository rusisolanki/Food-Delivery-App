import React from 'react'
import styles from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={styles.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
})
// spread operator is used to get the input key value pairs for example input might have type="text" attribute and others so for all the attributes it can be used this way

export default Input