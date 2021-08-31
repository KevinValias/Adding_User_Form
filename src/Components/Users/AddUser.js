import React, { useState } from "react";
import classes from "./AddUser.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  const [enteredUserName, setEnteredUserName] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [enteredUserEmail, setUserEmail] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    // Line 13 if username and age are empty then "return" or end DONT LOG SUBMISSION
    if (
      enteredUserName.trim().length === 0 ||
      enteredAge.trim().length === 0 ||
      enteredUserEmail.trim().length === 0
    ) {
      // line 17 - 19 ensures when the modal expands //
      setError({
        title: "Invalid Input",
        message: "Please Enter A Valid Name, Age, & Email (Non-Empty Values). ",
      });
      return;
    }
    //line 17 if age is less then one "return" or end
    if (+enteredAge < 1) {
      // line 26 -28 will hold the error for age
      setError({
        title: "Invalid Age",
        message: "Please Enter A Valid Age (> 0). ",
      });
      return;
    }
    // console.log(enteredUserName, enteredAge);
    // Lifting the Users to the App.js line 22//
    props.onAddUser(enteredUserName, enteredAge, enteredUserEmail);
    // Line 14 and 15 will reset the inputs
    setEnteredUserName("");
    setEnteredAge("");
    setUserEmail("");
  };

  const userNameChangeHandler = (event) => {
    setEnteredUserName(event.target.value);
  };
  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setUserEmail(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">UserName</label>
          <input
            id="username"
            type="text"
            value={enteredUserName}
            // The "Value" is the state passed back into the input for the reset//
            onChange={userNameChangeHandler}
            //   inputs need an ONCHANGE Handler function built on line 15 and STATE set line 7 //
          ></input>
          <label htmlFor="age">Age (Years)</label>
          {/* inputs need an Onchange Handler function built on line 18 and STATE set line 8 */}
          <input
            id="age"
            type="number"
            value={enteredAge}
            // The "Value" is the state passed back into the input for the reset
            onChange={ageChangeHandler}
          ></input>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            value={enteredUserEmail}
            onChange={emailChangeHandler}
          ></input>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
